# Known Gaps — BanquetPro API

**Purpose:** answer "what is left to finish before this backend can confidently go to production?" This document traces the system by user journey (customer, service provider, admin) rather than by file, and calls out where a journey is complete, partially complete, broken, or missing. It cross-references `TECHNICAL_DEBT.md` for the underlying evidence rather than repeating file:line citations in full.

**Status legend:** Complete · Partial · Broken (implemented but doesn't work as intended) · Missing (no working implementation reachable from the gateway) · Unknown (needs verification).

---

## User Journey Map

| Journey | Status | Summary |
|---|---|---|
| Registration + email verification | **Partial** | Registration works; the guard that enforces "must be verified" on downstream actions can crash instead of denying (see GAP-002). |
| Login / refresh / logout | **Broken** | `refreshlogin` endpoint likely receives the wrong shape of body (GAP-003). |
| Forgot / reset password | **Broken** | Reset tokens never expire and the "hash" adds no real protection (GAP-004). |
| Browse & search event centers / catering | **Partial** | Core listing works; one filter (`?country=`) is a shipped 500, and query params bypass validation (GAP-005). |
| Create / manage a listing (service provider) | **Broken** | Anyone verified can edit or delete anyone else's listing — no ownership check (GAP-006). Event-center `create` bypasses validation entirely (GAP-007). |
| Refund policy management | **Missing** | Gateway route exists; microservice handler is commented out (GAP-008). |
| Request a quote | **Partial** | Works, but the catering-vs-event-center branch is always treated as event-center due to a bug (GAP-009). |
| Create a booking | **Partial** | Booking is created, but nothing prevents two bookings from claiming the same timeslot (GAP-010). |
| Confirm / cancel / reschedule a booking | **Missing** | The only code that frees a timeslot lives in unreachable service methods — no `@MessagePattern` wires them up (GAP-011). |
| Pay for a booking (Stripe/Paystack) | **Broken** | Webhook accepts unsigned payloads — payments/wallet credits are forgeable (GAP-012). |
| Refund a payment | **Missing** | Fully dead on the microservice side; gateway calls hang (GAP-013). |
| Service-provider withdrawal/payout | **Missing** | Same as refunds — dead on the microservice side (GAP-013). |
| Email notifications | **Partial** | Some notification types (payment failed, subscription expired) are silently dropped; no notification history is persisted (GAP-014). |
| Reviews | **Missing** | Full `ReviewService` implementation exists but is unreachable from any endpoint — both ends of the RMQ pattern are commented out (GAP-015). |
| Admin management (countries/states/app settings) | **Broken** | The guard meant to restrict these to admins currently authorizes any authenticated user (GAP-001). |
| Account self-service (view/update own profile) | **Broken** | `GET/PATCH /users/:id` have no guard and no ownership check — this is also the most severe security gap in the repo (GAP-016). |

---

## GAP-001 — `AdminRoleGuard` does not actually restrict to admins

Status: Broken
Priority: **P0 — Production blocker**

Evidence:
- `apps/apigateway/src/jwt/admin.guard.ts:10-19` — `handleRequest` checks `user.admin !== null` with no check that `user` is a real, resolved user object first.
- Root cause traced to `apps/apigateway/src/jwt/jwt.strategy.ts:26`, where `await this.userClient.send(...)` never actually awaits the RMQ response (see `TECHNICAL_DEBT.md` §0.1 for the full mechanism) — `user` at guard-evaluation time is always an unresolved Observable (or `false`), never the real `UserDto`, so `user.admin` is always `undefined`, and `undefined !== null` is always `true`.
- Verified directly by reading all three files in the chain; this is not a suspicion, it is a confirmed defect.

Impact: Every endpoint gated by `AdminRoleGuard` — the entire `management` domain (countries, states, app settings) at minimum — is currently accessible to any authenticated non-admin user. This is a full authorization bypass, not a partial weakness.

Suggested Resolution: Fix `JwtStrategy.validate()` to actually resolve the RMQ `Observable` (e.g. `await firstValueFrom(this.userClient.send(...))` or convert to `lastValueFrom`) so `request.user` becomes the real `UserDto`. Then fix `AdminRoleGuard.handleRequest` to check `err`/`!user` before touching `user.admin`. This single fix in `jwt.strategy.ts` likely also resolves GAP-002 (below) and removes the need for the `firstValueFrom(req.user)` workaround scattered across ~30 controller call sites — but every one of those call sites must be updated in the same change, since they currently depend on `request.user` being an Observable.

---

## GAP-002 — Verification/active-status guards crash instead of denying

Status: Broken
Priority: P0 — Production blocker (compounds with GAP-001; fixing one without the other will break things further)

Evidence:
- `apps/apigateway/src/jwt/verification.guard.ts:8-19` and `account.status..guard.ts:8-19` read `request.user` before awaiting `super.canActivate()`, so `request.user` is `undefined` at read time in the overwhelming majority of real requests. `firstValueFrom(undefined)` throws.
- Full mechanism in `TECHNICAL_DEBT.md` §0.2.

Impact: Any endpoint requiring "verified" or "active" status (event-center/catering/booking creation, payment initiation) either 500s for legitimate verified users, or — if the timing accidentally lines up — silently skips the check. Neither behavior is the intended one.

Suggested Resolution: Await `super.canActivate(context)` fully before reading `request.user`, or better, resolve the user once in `JwtAuthGuard`/the strategy and read the already-resolved value from a request property both guards can trust. Must be fixed together with GAP-001 since both depend on the same upstream `request.user` shape.

---

## GAP-003 — Token refresh endpoint likely receives the wrong request shape

Status: Broken
Priority: P1 — Critical

Evidence:
- `apps/apigateway/src/users/users.controller.ts:51-55` — `refreshlogin(@Body() token: string)` binds the entire request body to `token` without destructuring, unlike sibling endpoints in the same controller. A JSON body like `{"token": "..."}` makes `token` the whole object, not the string value.

Impact: Refresh-token exchange (part of the 59-minute-access / 7-day-refresh token scheme documented for this project) is likely non-functional as written — users would be forced to re-login every ~59 minutes instead of transparently refreshing.

Suggested Resolution: Change the parameter to `@Body('token') token: string` (or introduce a `RefreshTokenDto`) to match the calling convention used elsewhere in the controller. `Needs verification against an actual client call` to confirm the exact failure mode before fixing.

---

## GAP-004 — Password reset tokens never expire

Status: Broken
Priority: P1 — Critical

Evidence:
- `forgotPassword` (`apps/users/src/users.service.ts` ~line 683-704) sets an `expiry` field on the reset token record.
- `verifyPasswordToken` (`apps/users/src/users.service.ts:734-756`) never reads or checks that `expiry` field.
- Additionally, the bcrypt hash of the reset code is itself embedded in the emailed link and compared with `===` rather than `bcrypt.compare` — the "hash" step adds no protection since the hash *is* the bearer secret.

Impact: A password-reset link, once issued, remains valid forever (or until the next reset request overwrites it) rather than expiring on a defined window. Combined with `TECHNICAL_DEBT.md` S4 (unauthenticated `GET /users/:id` exposing this token), this forms a persistent account-takeover path.

Suggested Resolution: Enforce `expiry` in `verifyPasswordToken`; consider generating a longer, unguessable random token independent of its stored hash rather than reusing the hash as the bearer value.

---

## GAP-005 — Catering location filter is a shipped 500; several query filters bypass validation

Status: Broken
Priority: P1 — Critical (the `country` filter is a guaranteed crash on a documented, public query param)

Evidence:
- `apps/catering/src/catering.service.ts:111-124` filters on `whereClause.country`, but `apps/catering/prisma/schema.prisma`'s `Catering` model has no `country` field — only `location: String[]`. The gateway (`catering.controller.ts:124`) exposes `?country=` publicly.
- `eventcenters.controller.ts:93-121` casts `eventTypes`/`amenities` query params with `as EventType[]`/`as Amenities[]` with no enum validation; an invalid value throws a raw Prisma error instead of a clean 400.
- `ids` query params (`eventcenters.controller.ts:123-128`, `catering.controller.ts:105-110`) are typed `string[]` with no check that the value is actually an array — a single-id request is silently mishandled.

Impact: Any client that calls `?country=` against the catering search endpoint gets a 500. Malformed `eventTypes`/`amenities`/`ids` values also 500 instead of returning a clean validation error.

Suggested Resolution: Either add the missing `country` field to the Prisma schema (with a migration) if country-level filtering is a real product requirement, or remove the dead filter parameter from the DTO/controller. Add proper enum/array validation via DTOs bound with `@Query()` + a validation pipe instead of raw casts.

---

## GAP-006 — No ownership checks on listing mutation/deletion

Status: Broken
Priority: P0 — Production blocker

Evidence:
- `eventcenters.controller.ts:136-139` (`PATCH :id`) and `catering.controller.ts:132-135` are guarded only by `JwtAuthGuard, VerificationGuard` — never compared to `serviceProviderId`.
- Same gap on `DELETE :id` for both domains — `updaterId` is recorded but never checked against the resource owner.

Impact: Any verified, active user (not just the listing's own provider) can edit or soft-delete any other service provider's event center or catering listing. This is a direct marketplace-integrity/trust issue, not just a theoretical one.

Suggested Resolution: Add an ownership check (caller's user id / service-provider id must match the resource's `serviceProviderId`, or the caller must be an admin once GAP-001 is fixed) before allowing update/delete, in both the gateway controller and the microservice service layer (defense in depth — don't rely on the gateway alone since the microservice is reachable directly on its own queue).

---

## GAP-007 — Event-center creation bypasses all DTO validation

Status: Broken
Priority: P1 — Critical

Evidence:
- `apps/apigateway/src/eventcenters/eventcenters.controller.ts:36` — `create(@Body() createEventcenterDto: any)`. NestJS's `ValidationPipe` skips validation entirely for `any`-typed parameters, so the `class-validator` decorators on `CreateEventCenterDto` never run for this endpoint.
- Sibling `catering.controller.ts:41` does this correctly with a typed DTO.

Impact: Arbitrary, unvalidated JSON can be persisted as a new event center — missing required fields, wrong types, or extra fields that would otherwise be stripped by `whitelist: true` all pass through.

Suggested Resolution: Type the parameter as `CreateEventCenterDto` to match the catering implementation.

---

## GAP-008 — Refund-policy endpoints are dead on arrival

Status: Missing
Priority: P2 — Important

Evidence:
- Gateway services (`eventcenters.service.ts:74-84`, `catering.service.ts:63-73`) actively send `EVENTCENTERREFUNDPOLICYPATTERN.UPSERT`/`FINDBYSERVICEID`.
- The corresponding microservice `@MessagePattern` handlers are commented out on both domains.

Impact: `POST/GET :id/refund-policy` on both event centers and catering hang until RMQ request timeout, then fail. If refund policies are part of the current product scope, this journey is entirely non-functional; if the feature was deprioritized, the dead endpoints should be removed rather than left half-wired.

Suggested Resolution: `Needs product verification` — confirm whether refund policies are still in scope. If yes, un-comment and finish the microservice handlers. If no, remove the gateway endpoints and client calls to avoid a misleading, always-broken API surface.

---

## GAP-009 — Quote-request notification always describes "Event Center," never "Catering"

Status: Broken
Priority: P2 — Important

Evidence:
- `apps/booking/src/booking.service.ts:586-590` — `if ($Enums.ServiceType.EVENTCENTER) {...} else if ($Enums.ServiceType.CATERING) {...}` tests the enum value itself (always truthy), not `createRequestQuoteDto.serviceType === $Enums.ServiceType.EVENTCENTER`. The first branch always executes.

Impact: Every "you have a new quote request" notification says "Event Center" regardless of whether the request was actually for a catering service — a real, live bug affecting every catering quote request, not an edge case.

Suggested Resolution: Fix the condition to compare against `createRequestQuoteDto.serviceType`.

---

## GAP-010 — Double-booking is not prevented

Status: Broken
Priority: **P0 — Production blocker** (this is a core marketplace guarantee)

Evidence:
- `BookingService.create()` (`apps/booking/src/booking.service.ts:60-62`) only `connect`s to `requestedTimeSlots`. It never checks `TimeSlot.isAvailable` and never sets `isAvailable: false`/`bookingId` at creation time.
- The Prisma schema has no unique constraint preventing two bookings from connecting to the same timeslot, and there is no row-level locking or transactional availability check anywhere in the create path.

Impact: Two customers can book the exact same event center/catering timeslot simultaneously with nothing in the system preventing it — a direct double-booking, which for an event-center marketplace is close to the worst possible functional failure (a customer shows up to find their venue already occupied).

Suggested Resolution: Enforce availability at the database layer (e.g. a unique constraint on the timeslot-to-booking relation, or a `SELECT ... FOR UPDATE`-style check inside a transaction) rather than relying on application-level sequencing, which cannot safely prevent races under concurrent requests.

---

## GAP-011 — Booking cancel/reschedule/confirm are unreachable; cancelled bookings never release their timeslot

Status: Missing
Priority: **P0 — Production blocker**

Evidence:
- `BookingService.cancel()` (`booking.service.ts:400`), `.reschedule()` (`:441`), `.confirm()` (`:499`) exist and contain the only code that sets `isAvailable: true, bookingId: null` on a timeslot.
- `BOOKINGPATTERN` (`booking.pattern.ts:1-8`) has no `CANCEL`/`RESCHEDULE`/`CONFIRM` entries, and no `@MessagePattern`/`@EventPattern` in the controller routes to these methods. The only reachable mutation is a generic `UPDATE`, which does a raw Prisma field update with no timeslot side effects.

Impact: There is currently no way to cancel a booking through the real API and have its timeslot become available again — every cancelled booking's timeslot(s) are permanently stuck as booked. Combined with GAP-010, timeslot availability is unreliable in both directions (can't prevent overlap on create, can't release on cancel).

Suggested Resolution: Add `CANCEL`/`RESCHEDULE`/`CONFIRM` patterns and wire the gateway to call them; ensure the generic `UPDATE` path either forbids direct `status` changes to `CANCELED` or triggers the same timeslot-release side effect (see GAP-012 re: unconstrained status transitions).

---

## GAP-012 — Booking status can be set to anything, with no transition rules or side effects

Status: Broken
Priority: P1 — Critical

Evidence:
- `UpdateBookingDto.status` is a free `@IsEnum(BookingStatus)` field applied via a raw Prisma update (`booking.service.ts:202-229`) with no transition validation (e.g. `CANCELED → CONFIRMED` is currently just as valid as `PENDING → CONFIRMED`), no check against `paymentStatus`, and no side effects.
- A commented-out block (`apps/apigateway/src/booking/booking.controller.ts:490-518`) shows a status-triggered notification flow was planned but never wired up.

Impact: Booking state can drift into inconsistent combinations (e.g. `CANCELED` with `paymentStatus: PAID` and no refund triggered) with nothing enforcing valid transitions.

Suggested Resolution: Introduce an explicit state machine (allowed transitions per current status) enforced server-side, independent of the free-form `UPDATE` pattern GAP-011 already flags as needing constraints.

---

## GAP-013 — Payment webhook accepts unsigned payloads (payment/wallet forgery)

Status: Broken
Priority: **P0 — Production blocker**

Evidence:
- `apps/apigateway/src/payment/payment.controller.ts:145-248` — verified directly. `@Body() payload: any`, no guard, no `stripe.webhooks.constructEvent`, no Paystack HMAC signature check. No `STRIPE_WEBHOOK_SECRET`/`PAYSTACK_WEBHOOK_SECRET` env var exists anywhere in the codebase.
- `processAutomaticRefund` (`payment.controller.ts:418-420`) is a stub (`return "processing refund"`) invoked from two real failure paths where money has already been captured.

Impact: Anyone who can reach this public endpoint can forge a `charge.success`/`payment_intent.succeeded` event with arbitrary `userId`/`amount`/`invoiceId` and have the system credit a wallet or mark an invoice paid for free — full payment/wallet forgery, not a theoretical replay risk. Separately, real refund-owed situations currently issue no refund and raise no alert.

Suggested Resolution: Add Stripe (`stripe.webhooks.constructEvent` with the raw body preserved) and Paystack (HMAC-SHA512 of the raw body against `x-paystack-signature`) verification before processing any webhook event; reject anything that fails verification. Implement `processAutomaticRefund` against the real Stripe/Paystack refund API or route it to a manual-review queue with an alert, rather than a silent stub.

---

## GAP-014 — Refunds and withdrawals are entirely non-functional

Status: Missing
Priority: **P0 — Production blocker** (if these are in current scope — see below)

Evidence:
- `RefundController` (`apps/payments/src/payments.controller.ts:583-658`) — every handler commented out; gateway's `RefundGatewayService`/`RefundController` (`payment.service.ts:381-409`, `payment.controller.ts:774-816`) still expose live endpoints that call these dead patterns.
- `WithdrawalController` (`apps/payments/src/payments.controller.ts:806-853`) — same pattern; gateway's `WithdrawalGatewayService`/`WithdrawalController` still expose live endpoints.

Impact: A service provider cannot withdraw earned funds, and neither customers nor providers can have a refund approved/declined through the system — every one of these gateway endpoints hangs until RMQ timeout. If either feature is expected to exist for launch, this is a hard blocker.

Suggested Resolution: `Needs product verification` on current scope/priority. If in scope: un-comment and finish the microservice-side handlers (the business logic already appears substantially written, just disconnected). If out of scope for this launch: remove or clearly flag the gateway endpoints as unavailable rather than leaving them silently hanging.

---

## GAP-015 — Reviews feature is fully implemented but completely unreachable

Status: Missing
Priority: P2 — Important

Evidence:
- `apps/notifications/src/notifications.service.ts:323-486` contains a complete `ReviewService` (booking-ownership validation, approval logic, etc.).
- Both the gateway's `ReviewController` and the microservice's `ReviewController` message-pattern handlers (`apps/notifications/src/notifications.controller.ts:57-97` / `:62-86`) are commented out on both ends.

Impact: None today (fully unreachable = no user-facing breakage), but this represents a finished feature sitting dark — worth a deliberate decision to resurrect or delete rather than leaving as ambiguous dead code that a future contributor might assume is either broken or safe to delete without checking.

Suggested Resolution: `Needs product verification` — if reviews are wanted for launch, wire up both ends (the hard part, the service logic, already exists); if not, delete the dead controller code to reduce confusion.

---

## GAP-016 — User profile endpoints have no guard and no ownership/field restrictions

Status: Broken
Priority: **P0 — Production blocker**

Evidence:
- `GET /users/:id` and `PATCH /users/:id` (`apps/apigateway/src/users/users.controller.ts:86-94`) have **no guards at all**.
- `findOne` (`apps/users/src/users.service.ts:375-411`) returns `personalAccessToken` (active verification/reset tokens) unfiltered.
- `update` (`apps/users/src/users.service.ts:416-439`) accepts `UpdateUserDto` (which includes `userType`/`status`) and writes it straight to the DB with no field whitelist.

Impact: This is the most severe single gap in the audit — it combines unauthenticated PII/token disclosure with unauthenticated privilege escalation (any caller can `PATCH` any user to `userType: "ADMIN"`). This must be closed before any production traffic reaches this API.

Suggested Resolution: Add `JwtAuthGuard` (+ ownership check: caller must be the target user or an admin) to both endpoints. Restrict `PATCH` to an explicit whitelist of self-editable fields (name, contact info, password via the dedicated change-password flow) — `userType`/`status` must never be settable by a non-admin, self-service call.

---

## GAP-017 — Notification delivery has silent failure modes and no history

Status: Partial
Priority: P1 — Critical

Evidence:
- Payment-failed and subscription-expired alerts use a payload shape (`{userId, internalId, message, type: NotificationType.ERROR/WARNING}`) that `notifications.service.ts`'s `send()` doesn't recognize (it only acts on `type === 'EMAIL'` with a `data` field) — these two notification types are silently dropped with no log, no error, no fallback.
- `resolveTemplate` has no default case — any notification `templateName` outside three hardcoded values throws instead of degrading gracefully.
- The microservice's own `Notification` persistence CRUD is entirely commented out — there is no notification history/audit trail anywhere in the system today.

Impact: Users currently never learn their payment failed or their subscription lapsed. There's also no way to look up "was this email actually sent" after the fact for support/debugging purposes.

Suggested Resolution: Align the payment/subscription-expiry emit payloads to the `{type: 'EMAIL', data: {...}}` shape `send()` expects (see the correct usage already present in `booking.service.ts`/`users.service.ts`). Add a default/fallback template path. Reinstate the `Notification` persistence CRUD so sent (and failed) notifications are queryable later.

---

# Recommended Implementation Order

Every phase lists: **ID** · description · affected files · priority · dependencies · complexity (S/M/L) · cross-service (whether the fix must touch both a gateway app and a microservice app, vs. a single file).

## Phase 0 — Blockers (must fix before any production traffic)

| ID | Description | Affected files | Priority | Depends on | Complexity | Cross-service |
|---|---|---|---|---|---|---|
| P0-1 | Fix `JwtStrategy.validate()` to actually resolve the RMQ Observable | `apps/apigateway/src/jwt/jwt.strategy.ts` | P0 | — | S | No (gateway only) |
| P0-2 | Fix `AdminRoleGuard` to check `err`/`!user` before `user.admin` (GAP-001) | `apps/apigateway/src/jwt/admin.guard.ts` | P0 | P0-1 | S | No |
| P0-3 | Fix `VerificationGuard`/`AccountStatusGuard` race condition (GAP-002) | `apps/apigateway/src/jwt/verification.guard.ts`, `account.status..guard.ts` | P0 | P0-1 | S | No |
| P0-4 | Update every `firstValueFrom(req.user)` call site to match the now-resolved `request.user` shape | ~30 call sites across `users`/`booking`/`catering`/`eventcenters`/`payment` gateway controllers | P0 | P0-1 | M | No |
| P0-5 | Guard `GET/PATCH /users/:id`, add ownership check + field whitelist (GAP-016) | `apps/apigateway/src/users/users.controller.ts`, `apps/users/src/users.service.ts` | P0 | P0-1..4 | M | Yes |
| P0-6 | Add ownership checks to event-center/catering update/delete (GAP-006) | `eventcenters.controller.ts`, `catering.controller.ts` (gateway + microservice) | P0 | P0-1..4 | M | Yes |
| P0-7 | Add Stripe/Paystack webhook signature verification (GAP-013) | `apps/apigateway/src/payment/payment.controller.ts` | P0 | — | M | No |
| P0-8 | Prevent double-booking at creation (GAP-010) | `apps/booking/src/booking.service.ts`, `apps/booking/prisma/schema.prisma` | P0 | — | L (schema migration) | No (microservice only) |
| P0-9 | Wire up cancel/reschedule/confirm and timeslot release (GAP-011) | `apps/booking/src/booking.controller.ts`, `booking.pattern.ts`, gateway `booking.service.ts` | P0 | P0-8 | M | Yes |

## Phase 1 — Critical User Flows

| ID | Description | Affected files | Priority | Depends on | Complexity | Cross-service |
|---|---|---|---|---|---|---|
| P1-1 | Fix `refreshlogin` body binding (GAP-003) | `apps/apigateway/src/users/users.controller.ts` | P1 | — | S | No |
| P1-2 | Enforce password-reset token expiry (GAP-004) | `apps/users/src/users.service.ts` | P1 | — | S | No |
| P1-3 | Fix catering `country` filter / add missing enum-array validation (GAP-005) | `apps/catering/src/catering.service.ts`, `libs/contracts/src/catering/*`, `apps/apigateway/.../eventcenters.controller.ts` | P1 | — | M | Yes (if adding a schema field) |
| P1-4 | Type event-center `create` body as `CreateEventCenterDto` (GAP-007) | `apps/apigateway/src/eventcenters/eventcenters.controller.ts` | P1 | — | S | No |
| P1-5 | Constrain booking status transitions (GAP-012) | `apps/booking/src/booking.service.ts` | P1 | P0-8, P0-9 | M | No |
| P1-6 | Fix notification payload shape mismatch for payment/subscription alerts (GAP-017) | `payment.controller.ts`, `subscription-expiry.service.ts`, `notifications.service.ts` | P1 | — | S | Yes |
| P1-7 | Guard `GET` on booking/quote/payment single-resource endpoints (S8) | `booking.controller.ts`, `payment.controller.ts` | P1 | P0-1..4 | S | No |
| P1-8 | Implement or explicitly remove refunds/withdrawals (GAP-014) | `apps/payments/src/payments.controller.ts` + gateway equivalents | P1 | Product decision | L | Yes |

## Phase 2 — Integration Fixes

| ID | Description | Priority | Complexity |
|---|---|---|---|
| P2-1 | Reconcile `docker-compose.prod.yml` to include all 8 services, or document why only 3 are deployed this way | P1 | S |
| P2-2 | Fix per-service `.env` path inconsistencies (`eventcenters` loading the gateway's `.env`, `../env` typos) | P1 | S |
| P2-3 | Add env validation schema so a missing var fails fast at startup instead of surfacing later | P2 | M |
| P2-4 | Reconcile RMQ `durable`/`noAck` settings across services (decide the intended reliability guarantee and apply consistently) | P1 | M |
| P2-5 | Add `timeout()`/retry policy to `ClientProxy.send()` calls gateway-wide | P2 | M |
| P2-6 | Resolve or remove dead-on-arrival refund-policy, notification-CRUD, and review endpoints (GAP-008, GAP-015) | P2 | M-L |
| P2-7 | Add `yarn test`/`yarn lint` as a required stage in the Jenkins pipeline (currently build+deploy only — see `TECHNICAL_DEBT.md` D1, corrected finding) | P1 | S |
| P2-8 | Confirm which of `Jenkinsfile` / `Jenkinsfile copy` / `jenkinsContainerized` is the pipeline actually configured in Jenkins, and delete the other two (or clearly document them as historical references) | P2 | S |

## Phase 3 — Reliability

- Fix `err.response` unguarded access in every `catchError` block (repo-wide `@MessagePattern` handlers).
- Fix `createPaymentAndCreditWallet` returning `null` on duplicate and crashing `mapToPaymentDto`.
- Add a default/fallback path in `resolveTemplate` instead of throwing on unknown template names.
- Reinstate `Notification` persistence so delivery has an audit trail.
- Fix the `booking.service.ts` correctness bugs (always-true `serviceType` check, `TimeslotDto` spread bug, `await await`, stray `break`).

## Phase 4 — Security (beyond Phase 0)

- Enforce field whitelisting on all update DTOs, not just users (audit every `PartialType(CreateXDto)` usage for fields that shouldn't be self-editable).
- Add rate limiting (`@nestjs/throttler` is already installed but unused) to `login`, `forgot-password`, `resend-verification`, `verify`.
- Add Helmet + request body size limits at the gateway.
- Move CORS origins to environment configuration instead of a hardcoded array.
- Filter soft-deleted users out of the JWT strategy's user lookup (currently a deleted account's existing token keeps working).
- Fix the password-reset "hash used as its own bearer secret" pattern (GAP-004).

## Phase 5 — Performance

- Move the gateway cache off the default in-memory store onto Redis (or another shared store) before horizontally scaling the gateway beyond one instance.
- Re-evaluate the `max: 100` cache-entry cap for the whole gateway.
- Add pagination bounds (`limit`/`offset` upper bounds) on listing endpoints.

## Phase 6 — Reliability / Polish (Observability)

- Propagate the existing gateway correlation ID onto outgoing RMQ messages so logs are traceable across service boundaries.
- Replace `console.log`/`console.error` with the already-imported `Logger` throughout, especially where PII/tokens are currently logged (`jwt.strategy.ts:24`, `users.service.ts:558`).
- Add `@nestjs/terminus` health-check endpoints to all 8 apps.
- Update Swagger config: real title/description, `.addBearerAuth()`, consistent `@ApiTags`/`@ApiOperation` coverage.

## Phase 7 — Technical Debt (non-blocking)

- Consider enabling `strictNullChecks`/`noImplicitAny` in `tsconfig.json` — this is the single highest-leverage change available and would have caught the two most severe bugs in this report (GAP-001, GAP-002) at compile time. Large migration, not a quick win, but worth scheduling deliberately.
- Remove the two duplicated booking-creation endpoints (`createV1` vs `create`) once confirmed which is authoritative.
- Remove dead code (`eventcenters.service.ts` `deleteall()` with no `where` clause; ~100 lines of commented-out DTOs in `update-user.dto.ts`).
- Plan the NestJS 10 → 11 and ESLint 8 → 9 migrations as deliberate, scheduled upgrades (not automatic).
- Add real assertions to replace the 38+8 scaffold-only spec files, starting with the highest-risk areas identified in Phase 0/1 (auth guards, booking creation, payment webhook).
