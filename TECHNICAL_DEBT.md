# Technical Debt Report — BanquetPro API

**Scope note:** This is a backend-only NestJS microservices monorepo (no frontend lives in this repo). Frontend-specific audit categories from the standard takeover template — Tailwind, GraphQL, component hierarchy, responsive/accessibility/SEO — are not applicable and are omitted rather than filled with invented content. Everything else in the template is mapped to its backend equivalent.

**Methodology:** Every finding below was verified by reading the actual source (not inferred from naming or structure). File:line references point at the on-disk state as of 2026-09-06, including uncommitted working-tree changes to `eventcenters`. Severity: **Critical** (data loss / money loss / full auth bypass) → **High** (broken feature or serious security gap) → **Medium** (real bug, contained blast radius) → **Low** (cleanup/consistency).

---

## 0. Critical Cross-Cutting Defects

These aren't domain-specific — they affect nearly every guarded endpoint in the system and were verified directly (guard source read end-to-end), not just inferred.

### 0.1 — Auth guard chain: `AdminRoleGuard` grants admin access to any authenticated user — Critical

**Root cause**, three files deep:
1. `apps/apigateway/src/jwt/jwt.strategy.ts:26` — `const user = await this.userClient.send(...)`. `ClientProxy.send()` returns an RxJS `Observable`, not a `Promise`. `Observable` has no `.then`, so it isn't a thenable — `await` on it resolves **immediately** to the Observable object itself, without waiting for the RMQ round-trip. `validate()` returns this raw, unsubscribed Observable as "the user."
2. Passport/`@nestjs/passport`'s `AuthGuard` machinery treats whatever `validate()` resolves to as the authenticated user and hands it to `handleRequest(err, user, info, ...)`.
3. `apps/apigateway/src/jwt/admin.guard.ts:10-19` — `handleRequest` does `if (user.admin !== null) return user;` with **no check that `user` is truthy or is the expected shape first**. Since `user` is always the unresolved Observable (or `false` on outright JWT failure — and `false.admin` is `undefined` via auto-boxing, not a throw), `user.admin` is always `undefined`, and `undefined !== null` is always `true`.

**Net effect: every `AdminRoleGuard`-protected endpoint in the entire system currently authorizes any request bearing a valid (or even invalid — see the `false` case) JWT as an admin.** This is the single highest-severity finding in the audit — it affects `management` (countries/states admin CRUD) and any other route gated by this guard.

### 0.2 — `VerificationGuard` / `AccountStatusGuard` race condition — High

`apps/apigateway/src/jwt/verification.guard.ts:8-19` and `account.status..guard.ts:8-19` both do:
```ts
const activate = super.canActivate(context) as Promise<boolean>; // NOT awaited yet
const request = await context.switchToHttp().getRequest();       // resolves after 1 microtask
const user = await firstValueFrom(request.user);                 // reads user before activate resolves
return await activate;
```
`request.user` is only populated once the full passport flow inside `super.canActivate()` completes (JWT verify + the RMQ round-trip in §0.1). Since `activate` is not awaited before `request.user` is read, `request.user` is `undefined` at read time in the overwhelming majority of real invocations (an RMQ call never resolves within a single microtask). `firstValueFrom(undefined)` calls `.subscribe` on `undefined` and throws `TypeError: Cannot read properties of undefined (reading 'subscribe')`.

**Net effect: any endpoint stacking `VerificationGuard` or `AccountStatusGuard` (used on `create` endpoints across users/eventcenters/catering/booking/payments) will intermittently-to-usually 500 instead of enforcing verification/active-status**, rather than cleanly denying unverified/inactive users.

### 0.3 — `firstValueFrom(req.user)` pattern used ~30+ times across controllers — Medium (symptom, not root cause)

Because `request.user` ends up being an Observable (§0.1), every controller that needs the authenticated user does `await firstValueFrom(req.user)` to unwrap it (e.g. `apps/apigateway/src/users/users.controller.ts:40,74,99`, and equivalents in booking/catering/eventcenters/payment controllers — confirmed present in all of these). This "works" only by accident of bug #0.1, re-triggers no additional RMQ calls itself, but is fragile: fixing `jwt.strategy.ts` to properly `await` (or use `firstValueFrom` on the RMQ call) would make `request.user` a plain object and silently break every one of these ~30 call sites, since `firstValueFrom` would then be called on a non-Observable. **Any fix to §0.1 must be paired with removing this pattern everywhere it appears.**

### 0.4 — Stripe/Paystack webhook has no signature verification — Critical

`apps/apigateway/src/payment/payment.controller.ts:145-248` (`@Post('webhook')`) — verified directly: `@Body() payload: any`, no guard, no `stripe.webhooks.constructEvent`, no Paystack `x-paystack-signature` HMAC check anywhere in the codebase (confirmed via repo-wide search — no `PAYSTACK_WEBHOOK_SECRET`/`STRIPE_WEBHOOK_SECRET` env var is even referenced). Anyone who can reach this public endpoint can forge a `charge.success` payload with an arbitrary `userId`/`amount`/`invoiceId` in `metadata` and have the system credit a wallet or mark an invoice paid for free. The catch-all always returns `{received: true}` (line 246) even on internal failure, so Stripe/Paystack never retry a payment that failed to process on our side — it's silently lost.

---

## 1. Architecture

| # | Finding | Evidence | Severity |
|---|---|---|---|
| A1 | Two live, diverging endpoints for the same operation (`createV1` and `create` in `apps/apigateway/src/booking/booking.controller.ts:37-465`) re-derive ~230 lines of pricing/service-charge logic each; `create` fixed a real bug present in `createV1` but silently dropped the customer/provider notification email `createV1` sends. | `booking.controller.ts:37-465` | High |
| A2 | RMQ queue reliability config is inconsistent per service with no apparent reasoning: `durable` is `false` for Users/EventCenter/Booking/Payment/Management and `true` for Catering/Notifications; `noAck: true` is set on Catering/Notifications clients with a code comment ("Ensure messages are properly acknowledged") that describes the opposite of what `noAck: true` does. | `apps/apigateway/src/client-config/client-config.service.ts:27,39,53,65,80,95,107` | High |
| A3 | Several gateway endpoints call RMQ patterns for which the microservice's handler is commented out — refunds (`apps/payments/src/payments.controller.ts:583-658`), withdrawals (`:806-853`), notification CRUD (`apps/notifications/src/notifications.controller.ts:13-52`, only `SEND` remains active), reviews (both ends commented out despite a complete `ReviewService` implementation existing at `apps/notifications/src/notifications.service.ts:323-486`), event-center/catering refund policy (`upsertRefundPolicy`/`getRefundPolicy`). Every one of these gateway routes will hang until RMQ timeout. This is scaffolded/abandoned work, not consistently removed or finished. | see individual files | High |
| A4 | `TimeSlotService.findOneById` — `TIMESLOTPATTERN.FINDONEBYID` is defined in the pattern enum and called by the gateway, but the microservice handler is commented out (`apps/booking/src/booking.controller.ts:241-255`). | `apps/booking/src/booking.controller.ts:241-255` | Medium |
| A5 | No circuit breaker/retry policy and no `timeout()` on any `ClientProxy.send()` call gateway-wide — a single hung/down microservice hangs the HTTP request indefinitely with no gateway-level timeout configured in any `main.ts`. | repo-wide pattern, verified in `eventcenters.service.ts` and `client-config.service.ts` | High |
| A6 | In-memory cache (`CacheModule.register({isGlobal:true, ttl:300, max:100})`, default store) is used gateway-wide for query caching. This is per-process — horizontally scaling the gateway to >1 instance means a cache write/eviction on one instance is invisible to others, and stale data can be served indefinitely. `max: 100` total entries shared across every cached endpoint in the whole gateway is also very small for a multi-tenant marketplace. | `apps/apigateway/src/app.module.ts:24` | High (blocks horizontal scaling) |
| A7 | Correlation/request ID (`apps/apigateway/src/common/context/correlation.context.ts`) exists only at the gateway HTTP edge; it is never propagated onto outgoing RMQ messages, so logs cannot be correlated across a request's full lifecycle once it crosses into a microservice. | gateway middleware vs. RMQ client payloads | Medium |

## 2. Code Quality

| # | Finding | Evidence | Severity |
|---|---|---|---|
| C1 | `apps/apigateway/src/eventcenters/eventcenters.controller.ts:36` — `create()` types the body as `any`. NestJS's global `ValidationPipe` (configured with `whitelist`/`forbidNonWhitelisted`/`transform` in `main.ts:17-22`) skips validation entirely for parameters typed `any`, so the extensive `class-validator` decorators on `CreateEventCenterDto` are dead code for this one endpoint — unvalidated JSON reaches the DB layer. The sibling `catering.controller.ts:41` does this correctly (`CreateCateringDto`). | `eventcenters.controller.ts:36` vs `catering.controller.ts:41` | High |
| C2 | `libs/contracts/src/users/update-user.dto.ts:149-250` — ~100 lines of commented-out `UpdateAdminDto`/`UpdateServiceProviderDto`/old `UpdateUserDto`. `apps/apigateway/src/users/users.controller.ts:6,10` — commented-out `AdminRoleGuard`/`CacheStore` imports. `apps/users/src/users.service.ts:416-455` — dead comments show a multi-entity (admin/service-provider) update was ripped out; `UpdateUserDto` fields destined for those sub-tables are silently dropped today. | as cited | Medium |
| C3 | `console.log`/`console.error` used in business logic instead of the already-imported `Logger`, several logging full entities (PII/tokens): `apps/apigateway/src/jwt/jwt.strategy.ts:24` (logs JWT subject every request), `apps/users/src/users.service.ts:558` (logs full user record including hashed password/refreshToken on every delete), `apps/eventcenters/src/eventcenters.service.ts:47,67`, `apps/catering/src/catering.controller.ts:58,66,92,127`, `apps/catering/src/catering.service.ts:75,125`, `apps/management/src/management.controller.ts:221`. | as cited | Medium (Low individually, Medium in aggregate for log hygiene) |
| C4 | Real bugs from copy/paste or careless edits: `apps/booking/src/booking.service.ts:586-590` tests `if ($Enums.ServiceType.EVENTCENTER)` (the enum value itself, always truthy) instead of `createRequestQuoteDto.serviceType === ...` — the catering-quote notification branch never fires. `apps/booking/src/booking.service.ts:932-935` spreads the **DTO class** `TimeslotDto` instead of the `updateTimeslotDto` parameter — `TimeSlotService.update()` silently discards every field from the caller's payload except `previousBookings`. `apps/catering/src/catering.service.ts:111-124` filters on a `country` field that doesn't exist in the Prisma schema (`location: String[]` is the only such field) — `?country=` throws a 500. | as cited | High (each is a live, shipped bug) |
| C5 | Duplicated per-handler RPC error-wrapping boilerplate: every `@MessagePattern` in `apps/users/src/users.controller.ts` (13 occurrences) repeats an identical `catchError` → `RpcException` block; the same pattern is duplicated across every other microservice controller (`management`, `eventcenters`, etc.), and none of them guard against `err.response` being undefined (see E2 below) — a shared interceptor/decorator would remove this duplication and fix the crash at the same time. | repo-wide | Medium |
| C6 | Dead/unused code left live and reachable-by-copy-paste risk: `apps/eventcenters/src/eventcenters.service.ts:193-197` `deleteall()` calls `eventCenter.deleteMany()` with **no `where` clause** (would truncate the whole table); currently unreferenced by any controller, but sitting in the service class as a landmine. | `eventcenters.service.ts:193-197` | High (unused today, catastrophic if ever wired up) |
| C7 | Minor but numerous: stray `await await` (`apps/booking/src/booking.service.ts:113,592`), stray `break; break;` (`:826-827`), stray trailing semicolon after a method body (`apps/users/src/users.service.ts:544`), redundant validators (`@IsUUID()` + `@Length(2,50)` on the same field in `create-user.dto.ts`), copy-pasted Swagger `enum:` metadata on non-enum fields (`create-user.dto.ts:15-26`), an unused `SearchServiceProviderDto` that duplicates `EventCenterFilterDto` with no controller reference. | as cited | Low |

## 3. NestJS-Specific

| # | Finding | Evidence | Severity |
|---|---|---|---|
| N1 | Global `ValidationPipe` is correctly configured once (`apps/apigateway/src/main.ts:17-22`), but is defeated per-endpoint whenever a body is typed `any` (C1) or a value arrives via un-decorated `@Query()` params (`eventTypes`/`amenities` cast with `as EventType[]` with zero enum validation, `eventcenters.controller.ts:93-121`; `ids` typed `string[]` from `@Query('ids')` with no array validation, `eventcenters.controller.ts:123-128` and `catering.controller.ts:105-110`). | as cited | Medium |
| N2 | No `@nestjs/terminus` health-check module anywhere — none of the 7 microservices or the gateway expose a liveness/readiness endpoint, which matters once this runs under any orchestrator (k8s, ECS, Docker Swarm) or even just a process manager doing health checks. | repo-wide (absent) | Medium |
| N3 | `@nestjs/throttler` (`^6.3.0`) is a listed dependency in `package.json` but is **never imported or used anywhere** in the codebase (verified: zero matches for `Throttler` under `apps/`). This explains why there is no rate limiting anywhere in the gateway despite the package being installed — someone added it and never wired it up. | `package.json:49`; zero usages found | Medium |
| N4 | Env loading is duplicated and inconsistent per microservice: every `main.ts` calls `dotenv.config({path: ...})` directly *and* the Nest module separately calls `ConfigModule.forRoot({envFilePath: ...})`, sometimes with a **different path**. `apps/eventcenters/src/eventcenters.module.ts:17` sets `envFilePath: './apps/apigateway/.env'` — the eventcenters microservice loads the **gateway's** `.env`, not its own. `apps/notifications/src/notifications.module.ts:18` and `apps/payments/src/payments.module.ts:33` use `envFilePath: '../env'` (missing the leading dot — not `.env`). `process.env.X` (populated by the direct `dotenv.config` call) and `ConfigService.get('X')` (populated by the module) can therefore disagree within the same running process. | as cited | High |
| N5 | No `ConfigModule` validation schema (`Joi`/`class-validator`) anywhere — a missing env var resolves silently to `undefined` and only surfaces later as an opaque connection failure (e.g. an RMQ client dialing `amqp://undefined`), rather than a fail-fast startup error. | 16 `ConfigModule.forRoot()` call sites checked, none pass `validationSchema` | High |
| N6 | Swagger is set up on the gateway (`main.ts:25-34`) but never customized: title/description are still the NestJS CLI scaffold placeholder ("My Microservice API" / "API documentation for my NestJS microservice"), and there is no `.addBearerAuth()`, so none of the JWT-guarded routes are documented as requiring auth in the generated docs. Coverage is also inconsistent — `eventcenters.controller.ts` has zero `@ApiTags`/`@ApiOperation` decorators; `catering.controller.ts` has them on one endpoint out of seven. | `main.ts:25-30`; controller files | Low |
| N7 | `apps/apigateway/src/management/management.controller.ts:116,195` — soft-delete `remove()` endpoints use `@Post(':id')` instead of `@Delete(':id')` while `permanentDelete` on the same controller correctly uses `@Delete` — inconsistent REST semantics within one file. | as cited | Low |

## 4. Security

| # | Finding | Evidence | Severity |
|---|---|---|---|
| S1 | See §0.1 — `AdminRoleGuard` grants admin access to any authenticated user. | `admin.guard.ts:10-19` | **Critical** |
| S2 | See §0.4 — payment webhook has zero signature verification (forgeable payments/wallet credits). | `payment.controller.ts:145-248` | **Critical** |
| S3 | `PATCH /users/:id` has **no guards at all** (`apps/apigateway/src/users/users.controller.ts:91-94`), and `UpdateUserDto extends PartialType(CreateUserDto)` includes `userType`/`status` with no field whitelist or ownership check in `apps/users/src/users.service.ts:416-439` — any unauthenticated caller can `PATCH /users/<any-id>` with `{"userType":"ADMIN"}` to self-promote. | `users.controller.ts:91-94`; `users.service.ts:416-439` | **Critical** |
| S4 | `GET /users/:id` has no guard (`users.controller.ts:86-89`) and `findOne` (`apps/users/src/users.service.ts:375-411`) includes `personalAccessToken: true` unfiltered in the response — exposes any user's active email-verification code and password-reset token to anyone, unauthenticated, by ID. Combined with S5 below, this is a full account-takeover chain. | as cited | **Critical** |
| S5 | Password-reset tokens are never checked for expiry: `verifyPasswordToken` (`apps/users/src/users.service.ts:734-756`) never reads the `expiry` field that `forgotPassword` sets on creation — reset links never actually expire. | `users.service.ts:734-756` | High |
| S6 | `GET /users` is guarded only by `JwtAuthGuard`+`VerificationGuard` — `AdminRoleGuard` import is commented out (`users.controller.ts:6`) — any verified customer can page through the entire user directory. | `users.controller.ts:6,79-84` | High |
| S7 | No ownership checks on mutation of other domains' resources: `PATCH`/`DELETE` on event centers and catering listings (`eventcenters.controller.ts:136-139`, `catering.controller.ts:132-135`) check only `JwtAuthGuard, VerificationGuard` — never compare the caller to `serviceProviderId`. Any verified user can edit or soft-delete any other provider's listing. | as cited | High |
| S8 | `GET /booking/:id` and `GET /requestQuote/:id` (`apps/apigateway/src/booking/booking.controller.ts:467-470,622-625`) have no auth guard at all, unlike every sibling endpoint — full booking/customer/billing detail is readable by anyone who can guess/enumerate a UUID. `GET /payment/:id` (`payment.controller.ts:250-253`) has the same gap. | as cited | High |
| S9 | Password-reset "hashing" adds no real protection: the bcrypt hash of the reset code is itself embedded in the emailed reset link and compared with plain `===` (not `bcrypt.compare`) — the DB and the URL hold the same bearer secret. | `apps/users/src/users.service.ts:683-704,744` | Medium-High |
| S10 | No rate limiting anywhere (see N3) — `login` has a DB-tracked lockout, but `forgot-password`/`resend-verification`/`verify` (a 6-hex-char, ~24-bit token) have none, making the verification code brute-forceable. | as cited | Medium-High |
| S11 | Weak-password inconsistency: `CreateUserDto.password` requires only `@Length(10,20)` (no `@IsStrongPassword()`), while `UpdateUserPasswordDto` requires `@IsStrongPassword()` — new accounts can be created with e.g. `"aaaaaaaaaa"`. | `create-user.dto.ts:76-79` vs `update-user.dto.ts:29-39` | Medium |
| S12 | Soft-deleted accounts keep working: `remove()` sets `deletedAt`/clears `refreshToken`, but `findOne` (used by the JWT strategy to resolve the user on every request) doesn't filter on `deletedAt` — an existing access token keeps authenticating against a "deleted" account for up to its remaining ~59 minutes of validity. | `apps/users/src/users.service.ts:375-411,546-562` | Medium |
| S13 | `processAutomaticRefund` (`apps/apigateway/src/payment/payment.controller.ts:418-420`) is a stub returning the literal string `"processing refund"` — it never calls any refund/gateway API, but is invoked from two real failure paths where money has already been captured. Customers can be charged with no refund actually issued and no operator alert raised. | as cited | High |
| S14 | CORS origin list is hardcoded to two URLs (`apps/apigateway/src/main.ts:10`) behind a comment that says "Allow all origins" — the comment is wrong for what the code does, and adding a new frontend environment requires a code change + redeploy. No Helmet, no request body size limits configured anywhere at the one public entry point. | `main.ts:9-15` | Medium |
| S15 | Two of the eight `docker-compose.prod.yml` services are the only ones actually wired for production deploy (see §8 Dependencies/DevOps) — not a security issue per se, but means production secrets/env handling has only been exercised for 3 of 8 services. | `docker-compose.prod.yml` | informational |

## 5. Error Handling

| # | Finding | Evidence | Severity |
|---|---|---|---|
| E1 | `apps/users/src/users.service.ts:732,756` — `throw new Error(error)` in `changePassword`/`forgotPassword` catch blocks re-wraps a caught exception (which may already be a typed `NotFoundException` etc.) as a bare `Error`, discarding the original HTTP status — a 404 becomes a generic 500. | as cited | Medium |
| E2 | Every `@MessagePattern` handler's `catchError` block across every microservice controller (verified in `management.controller.ts`, `eventcenters.controller.ts`, and the identical pattern repeats in `users`/`booking`/`catering`) does `err.response.statusCode`/`err.response.error` with no check that `.response` exists. A raw Prisma error or any non-`HttpException` thrown inside a service crashes the error handler itself with a `TypeError`, masking the real error behind an opaque 500. | repo-wide pattern | High |
| E3 | `apps/apigateway/src/jwt/admin.guard.ts:11` — reads `user.admin` with no `err`/`!user` check first (see §0.1 — in practice this doesn't throw because of the upstream bug, but the guard is still written unsafely on its own terms). | `admin.guard.ts:11` | High (subsumed by S1) |
| E4 | Payment webhook (`payment.controller.ts:241-247`) swallows all internal failures and always returns `{received: true}` — Stripe/Paystack will never retry a payment that failed to process on our side. | `payment.controller.ts:241-247` | High |
| E5 | `createPaymentAndCreditWallet` (`apps/payments/src/services/payments.service.ts:480-564`) returns `null` on a detected duplicate; callers pass this straight into `mapToPaymentDto`, which does `payment.amount` on `null` and throws — meaning a legitimate webhook retry (which Stripe/Paystack do routinely) errors out instead of returning a clean "already processed" response. Currently masked by E4's swallow-all catch. | `payments.service.ts:468-499` | Medium |
| E6 | `resolveTemplate` (`apps/notifications/src/notifications.service.ts:253-288`) has no `default:` case — any `templateName` other than `VERIFICATION`/`NEW_BOOKING`/`FORGOT_PASSWORD` leaves `html` as `undefined`, and the next line calls `.replaceAll()` on it, throwing. Given other domains already send other notification types, most of those notifications will crash this handler. | `notifications.service.ts:253-288` | Medium |
| E7 | Payment-failed and subscription-expired alerts are silently dropped: `payment.controller.ts:285-290` and `apps/payments/src/services/subscription-expiry.service.ts:60-65` emit `{userId, internalId, message, type: NotificationType.ERROR/WARNING}`, but `notifications.service.ts:220-239`'s `send()` only acts `if (type === 'EMAIL')` and expects a `data` field neither payload has. **Users are never notified their payment failed or subscription lapsed — no error, no log, no fallback.** Compare the correct usage in `booking.service.ts:294-336` / `users.service.ts:126-132`, which use the right shape. | as cited | High |
| E8 | `retryOperation` (`notifications.service.ts:291-307`) retries email send up to 5 times with no backoff, and on final failure just throws from inside an `@EventPattern` handler with no dead-letter queue or persistence — the `Notification` table's own CRUD is entirely commented out, so there is currently no notification history/audit trail at all. | `notifications.service.ts:291-307`, `:26-217` | Medium |

## 6. Testing

**Headline finding: the test suite is not just thin — it is non-functional.** File count is not a proxy for coverage here; several existing spec files would fail to even compile/run against current source.

| # | Finding | Evidence | Severity |
|---|---|---|---|
| T1 | `apps/management/src/management.controller.spec.ts` references `ManagementController`/`ManagementService`/`getHello()` — **none of these exist** in current `management.controller.ts` (which exports `AppSettingController`/`CountryController`/`StateController`). This file cannot compile against current source. | `management.controller.spec.ts` | High |
| T2 | `apps/eventcenters/src/eventcenters.controller.spec.ts` instantiates `EventcentersService` with no mock for the `EVENT_CENTER_CLIENT` `ClientProxy` it requires via `@Inject` — the `TestingModule` would fail to compile at test-run time. Its one real assertion is commented out. | as cited | High |
| T3 | All 8 `apps/*/test/app.e2e-spec.ts` files are the identical, unmodified Nest CLI scaffold (`GET /` → expect `"Hello World!"`). Every microservice here is RMQ-transport-only with no HTTP `/` route — every one of these would fail if run. | `apps/*/test/app.e2e-spec.ts` | High |
| T4 | `apps/users/src/users.controller.spec.ts:19` calls `usersController.findOne('test_id')` expecting `'Hello World!'`, which matches neither the real method signature nor behavior — a stale test that would fail if run. | as cited | Medium |
| T5 | Repo-wide: 38 `.spec.ts` + 8 `.e2e-spec.ts` files exist, but every one inspected across all five domain audits is boilerplate-only (module-compiles assertion, real test commented out) or actively broken (T1-T4). **There is no working automated coverage anywhere in the repo**, despite the file count suggesting otherwise — this is actively misleading if anyone runs `npm test`/reads a coverage badge. | cross-referenced across all 5 domain audits | High |
| T6 | Zero test coverage specifically for the highest-risk code identified in this report: the payment webhook handler (§0.4), the auth guards (§0.1/0.2), the booking double-booking path (see `KNOWN_GAPS.md` GAP list), and every mutation-without-ownership-check endpoint (S3, S7, S8). | n/a | High |

## 7. Dependencies

Root `package.json` is the single manifest for the whole Nest CLI monorepo (no per-app `package.json` files — confirmed, none exist under `apps/*/`).

| Package | Current | Note |
|---|---|---|
| `@nestjs/*` core (`common`, `core`, `microservices`, `platform-express`) | `^10.0.0` / `^10.4.15` | NestJS 11 has been out for some time; staying on v10 is a deliberate-or-stale choice worth a conscious decision, not an automatic upgrade (major-version migration work). |
| `typescript` | `^5.1.3` | Old within the 5.x line; combined with the compiler flags below, type safety is significantly weakened. |
| `eslint` | `^8.42.0` | ESLint 8 is EOL upstream in favor of ESLint 9's flat config; migration is nontrivial (config format change) but worth planning. |
| `@nestjs/throttler` | `^6.3.0` | **Installed, zero usages anywhere** (N3) — either finish wiring it up (it's the obvious fix for S10) or remove it; currently dead weight that misleads anyone auditing "do we have rate limiting." |
| `stripe` | `^18.5.0` | Current-ish; irrelevant given §0.4 — the SDK isn't the problem, the missing `webhooks.constructEvent()` call is. |
| — | — | No `package.json` `engines` field pins a Node version, though every `Dockerfile` targets `node:20` — a contributor without nvm/Docker has no authoritative signal of the required Node version. |

**tsconfig.json compiler flags actively reduce type safety** (`compilerOptions`, root `tsconfig.json:15-16`): `strictNullChecks: false` and `noImplicitAny: false`. This is directly load-bearing for several bugs in this report — e.g., TypeScript would have flagged `await this.userClient.send(...)` (§0.1) as assigning `Observable<UserDto>` to a variable used as `UserDto` under `strict` mode, and `user.admin` on a possibly-`undefined` `user` (§0.1/E3) under `strictNullChecks`. Turning these on is a larger, non-trivial migration (the codebase was written assuming their absence) but is the single highest-leverage code-quality investment available — it would have caught the two most severe auth bugs in this report at compile time.

**ESLint has `no-explicit-any` and `prettier/prettier` both turned `off`** (`.eslintrc.js:20-24`) — meaning the tool that could have caught C1 (an endpoint body typed `any` silently bypassing DTO validation) is explicitly configured not to flag it.

## 8. DevOps / CI

| # | Finding | Evidence | Severity |
|---|---|---|---|
| D1 | CI/CD does exist — via Jenkins, not GitHub Actions (there is no `.github/workflows`, but a root `Jenkinsfile` is present). **Correction to an earlier pass of this audit, which searched only `.github/workflows` and wrongly concluded no CI existed.** However: (a) neither the `Jenkinsfile` nor its two sibling files (`Jenkinsfile copy`, `jenkinsContainerized` — three divergent pipeline definitions live in the repo root with no indication which one the actual Jenkins job points at) run `yarn test` or `yarn lint` anywhere in any stage — the pipeline runs `yarn install` → `yarn build` → a manual-approval-gated deploy per microservice, with no automated quality gate at all; (b) the three files diverge meaningfully: `Jenkinsfile` deploys via SCP + PM2 to an EC2 host (Hostinger key), `Jenkinsfile copy` deploys via Docker build → ECR push → `aws ecs update-service` (a different target architecture entirely), and `jenkinsContainerized` builds the Docker image *on* the EC2 host itself and runs it directly with `docker run`. Three different deployment strategies for the same services, apparently from different points in the project's history, with the stale ones left in place rather than removed. | `Jenkinsfile`, `Jenkinsfile copy`, `jenkinsContainerized` (repo root) | High |
| D2 | Every microservice has its own multi-stage `Dockerfile` (confirmed: `apps/{apigateway,booking,catering,users,eventcenters,management,payments,notifications}/Dockerfile` all exist) that copies the whole monorepo, `rm -rf`s the other apps' folders, and builds only its own. This pattern is implemented and looks deliberate/reasonable. | `apps/*/Dockerfile` | — (not debt) |
| D3 | However, `docker-compose.prod.yml` only defines services for **3 of the 8** apps that have Dockerfiles: `apigateway`, `booking`, `eventcenters`. `catering`, `users`, `payments`, `notifications`, `management` have working Dockerfiles but are **not wired into the production compose file at all**. Running `docker-compose -f docker-compose.prod.yml up` would bring up a system where `booking`/`eventcenters` depend on RMQ queues (`users`, `payments`, `notifications`, `management`) that are never started — every cross-service call from those two would hang until RMQ timeout. | `docker-compose.prod.yml:1-78` | High |
| D4 | The base `docker-compose.yml` (local dev) only stands up Postgres + RabbitMQ infrastructure — none of the 8 Nest apps themselves. There is no single-command way to run the full stack locally; a new developer must manually start 8 separate `nest start <app> --watch` processes with per-app `.env` files (whose loading is itself inconsistent — see N4). | `docker-compose.yml:1-38` | Medium |
| D5 | `apps/apigateway/Dockerfile:17` removes `apps/eventcenters` and `apps/booking` from the build context — correct for the gateway's own image (it doesn't need their standalone entrypoints) but worth confirming this doesn't also strip anything the gateway's `EventcentersService`/`BookingService` client code depends on at build time (it reads from `libs/contracts`, not `apps/*`, so this is very likely fine — flagged only because it wasn't executed/tested as part of this audit). | `apps/apigateway/Dockerfile:17` | Low / REQUIRES VERIFICATION |

---

## Summary Counts

- **Critical:** 4 (§0.1 admin bypass, §0.4 webhook forgery, S3 mass-assignment privilege escalation, S4 unauthenticated token/PII disclosure)
- **High:** ~27
- **Medium:** ~20
- **Low:** ~8

See `KNOWN_GAPS.md` for the feature-completeness view of the same codebase and the prioritized takeover plan.
