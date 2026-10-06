# Implementation Tracker

**Purpose**: turn [`production-roadmap.md`](production-roadmap.md) + [`backend-gaps.md`](backend-gaps.md) + root `KNOWN_GAPS.md`/`TECHNICAL_DEBT.md` into one step-by-step, checkable execution list. This is the single working document for the build phase of the takeover — check items off here as they land instead of tracking progress anywhere else.

**How to use this doc**:
- Work top to bottom within a phase. Phases are ordered by real dependency (see roadmap) — don't start a later phase's items until the phases it depends on are checked off, unless the item is explicitly marked *parallel-safe*.
- Mark `[x]` and add a one-line date/note when an item is done (e.g. `[x] 2026-09-20 — fixed in jwt.strategy.ts, see commit`). Leave it in place rather than deleting, so this doc doubles as a changelog.
- 🔒 marks an item blocked on a product/architecture decision in [`open-decisions.md`](open-decisions.md) — do not start implementation, only design/scaffolding, until the linked decision is made.
- IDs cite `GAP-*` (root `KNOWN_GAPS.md`/`TECHNICAL_DEBT.md`) and `PM-GAP-*` ([`backend-gaps.md`](backend-gaps.md)) rather than restating their evidence — open the cited doc if you need the full trace.
- This doc is additive to the existing `docs/planning/` framework, not a replacement — it does not change any prior finding, only sequences the work.

**Status**: Not started — kickoff pending.

---

## Open decisions to resolve early

These don't block *all* work, but block specific phases below. Resolving them early avoids building against a guess. See [`open-decisions.md`](open-decisions.md) for full option analysis.

- [ ] Booking completion trigger (blocks Phase 1, cascades to Phase 3 & 5) — [decision](open-decisions.md#booking-completion-trigger)
- [ ] Held vs. available wallet balance split (blocks Phase 3) — [decision](open-decisions.md#held-vs-available-wallet-balance)
- [ ] Commission model: flat/%/tiered (blocks Phase 3) — [decision](open-decisions.md#commission-model)
- [ ] Escrow release trigger (blocks Phase 3) — [decision](open-decisions.md#escrow-release-trigger)
- [ ] Cancellation-policy model: presets vs. arbitrary (blocks Phase 4) — [decision](open-decisions.md#cancellation-policy-model)
- [ ] Commission reversal on refund (blocks Phase 4) — [decision](open-decisions.md#commission-reversal-on-refund)
- [ ] Service category extensibility approach (blocks Phase 2 scoping) — [decision](open-decisions.md#service-category-extensibility)
- [ ] External customer onboarding UX (blocks Phase 8 — low urgency) — [decision](open-decisions.md#external-customer-onboarding)

---

## Phase 0 — Identity & Trust Boundary Correctness

Everything downstream depends on the platform correctly identifying who is calling.

- [x] Fix `JwtStrategy.validate()` Observable-await bug (`GAP-001` root cause, `apps/apigateway/src/jwt/jwt.strategy.ts:26`) — done 2026-09-14, wrapped the `userClient.send()` call in `firstValueFrom` so `validate()` returns a resolved `UserDto` instead of the unsubscribed Observable
- [x] Update the `firstValueFrom(req.user)` call sites that depend on the previous broken (Observable) shape of `request.user` — landed in the same change. Actual count was **35 active sites across 8 files** (not ~30): `payment.controller.ts` (16), `management.controller.ts` (6, aliased via `authuser`), `booking.controller.ts` (6), `users.controller.ts` (3), `catering.controller.ts`, `eventcenters.controller.ts`, `jwt/verification.guard.ts`, `jwt/account.status..guard.ts` (1 each). Also tightened `AuthenticatedRequest.user` from `any` to `UserDto` in all 5 files that declare it, and added `apps/apigateway/src/jwt/jwt.strategy.spec.ts` (no prior test existed) to regression-guard the Observable-vs-resolved-value bug. `common/interceptors/http-logging.interceptor.ts` reads `req.user?.id` with no unwrap — it was silently always `'anon'` before this fix and now resolves correctly, no code change needed there.
- [ ] Fix `AdminRoleGuard` to check `err`/`!user` before `user.admin` (`GAP-001`, `admin.guard.ts:10-19`)
- [ ] Fix `VerificationGuard`/`AccountStatusGuard` race condition (`GAP-002`, `verification.guard.ts`, `account.status..guard.ts`)
- [ ] Guard + ownership-check `GET`/`PATCH /users/:id`, restrict `PATCH` to a self-editable field whitelist (`GAP-016`)
- [ ] **In the same change as above**: add a real `RESTRICTED → ACTIVE` admin-approval transition (`PM-GAP-001`) — do not ship the GAP-016 guard without this, or every new admin is permanently locked out
- [ ] Add ownership checks to event-center/catering update/delete (`GAP-006`)
- [ ] **In the same pass**: validate `serviceProviderId` exists/is active at listing creation (`PM-GAP-006`)
- [ ] Add Stripe/Paystack webhook signature verification (`GAP-013`)
- [ ] **In the same handler fix**: fix webhook idempotency so a replayed event doesn't double-apply wallet/invoice effects (`PM-GAP-030`)
- [ ] Add cross-service ID existence validation: `Booking.customerId`, `Booking.serviceProvider`/`serviceId`, `TimeSlot.serviceId` at minimum (`PM-GAP-043`)

## Phase 1 — Booking & Slot Lifecycle Correctness

Depends on Phase 0.

- [ ] 🔒 Decide booking-completion trigger (see open decisions) before building the transition table below
- [ ] Add `COMPLETED` value to `BookingStatus` (`PM-GAP-016`) — do this **before** wiring confirm/cancel/reschedule
- [ ] Prevent double-booking at the DB/transaction level (`GAP-010`)
- [ ] Wire up `confirm`/`cancel`/`reschedule` so they actually write `Booking.status` (`GAP-011`, `PM-GAP-015`)
- [ ] Constrain booking status transitions using the completed enum (`GAP-012`)
- [ ] Reconcile the two independently-defined `BookingStatus` enums (`booking` vs `eventcenters` schemas) into one (`PM-GAP-018`)
- [ ] *Parallel-safe*: fix always-"Event Center" quote-notification bug (`GAP-009`, `booking.service.ts:586-590`)

## Phase 2 — Quote & Catalog Data Model

No dependency on Phases 0–1; land before/alongside Phase 6 (Messaging). Can be staffed in parallel with Phase 1.

- [ ] Add structured dynamic quote-request fields to `RequestQuote` (guest count, menu/dietary/allergy, drinks, staffing, equipment, event context) (`PM-GAP-010`)
- [ ] Add "requires quote" vs. "directly bookable" indicator on `EventCenter` listings (`PM-GAP-009`)
- [ ] 🔒 Resolve service-category extensibility decision, then implement the scoped-down version (centralize `ServiceType` as one contract-level type, CI drift check) (`PM-GAP-008`)

## Phase 3 — Financial Core Hardening

Depends on Phase 0. Must complete before Phase 4.

- [ ] Block edits to `PAID`/`PARTIALLY_PAID` invoices (`PM-GAP-021`)
- [ ] Fix the `||` bug so the delete/replace guard checks both `PAID` and `PARTIALLY_PAID` (`PM-GAP-022`)
- [ ] 🔒 Decide commission model, then wire it as a real server-computed single source of truth (currently `AppSettings.serviceCharge` is unread) (`PM-GAP-023`, `PM-GAP-031`)
- [ ] 🔒 Decide held vs. available wallet balance split, then implement it on `Wallet` — **before** escrow release below (`PM-GAP-027`)
- [ ] 🔒 Decide escrow release trigger, then implement escrow release (currently 100% dead code, no scheduler exists) (`PM-GAP-025`)
- [ ] Reconnect withdrawals — only after the held/available balance work above (`GAP-014`, `PM-GAP-028`)
- [ ] Add defensive null-guard on invoice service-charge line-item lookup (opportunistic, do during this phase) (`PM-GAP-024`)

## Phase 4 — Cancellation, Refunds & Disputes

Depends on Phase 1 and Phase 3.

- [ ] 🔒 Decide cancellation-policy model (presets vs. arbitrary tiers) (`PM-GAP-011`)
- [ ] Build the cancellation/refund chain: policy evaluation, refund computation, wallet/escrow reversal, notification (`PM-GAP-017`)
- [ ] Reconnect refunds (`GAP-014`)
- [ ] 🔒 Decide whether a refund reverses platform commission, then implement (`PM-GAP-029`)
- [ ] Wire `Dispute.resolve()` to actually move money once refunds are live (`PM-GAP-033`)

## Phase 5 — Reviews

Depends on Phase 1 (`COMPLETED` status must exist).

- [ ] Reconnect the Review feature, gated on `COMPLETED` (not `CONFIRMED`) (`GAP-015`, `PM-GAP-035`)
- [ ] Fix exception-swallowing bug that turns a legitimate 403 into a 500 (`PM-GAP-036`)
- [ ] Add duplicate-review prevention (`[userId, bookingId]` uniqueness) (`PM-GAP-037`)
- [ ] Decide and build (or explicitly defer) the separate platform-review system (`PM-GAP-038`)
- [ ] Wire rating aggregation from `Review` back onto `EventCenter.rating`/`Catering.rating` (`PM-GAP-042`)

## Phase 6 — Messaging (greenfield)

Depends on Phase 2; benefits from Phase 1 stability. Needs its own feature-design pass before implementation starts (transport, data model, linkage to quotes/bookings/invoices/support).

- [ ] Feature-design pass: transport (REST polling vs. websocket), data model, linkage to quote requests/bookings/invoices/support cases
- [ ] Implement conversation/message model + endpoints (`PM-GAP-034` — zero existing footprint, from scratch)

## Phase 7 — Notifications, Support & Platform Config Cleanup

Low-coupling; pick up opportunistically alongside any phase above.

- [ ] Fix payment-failed/subscription-expired notification payload shape mismatch (silently dropped today) (`GAP-017`, `PM-GAP-039`)
- [ ] Reinstate `Notification` persistence/history (`PM-GAP-039`)
- [ ] Add in-app/SMS notification channels (`PM-GAP-040`) — *can wait, see "what can wait" below*
- [ ] Add informal support/customer-care concern channel, distinct from the formal dispute system (`PM-GAP-041`)
- [ ] Verify then remove dead `users`-schema `Subscription`/`SubscriptionPlan`/`Featured` models (`PM-GAP-005`) — see [decision](open-decisions.md#subscriptionfeatured-schema-duplication-cleanup) for the verification step needed first
- [ ] Decide fate of `Permission`/`AdminRole` fine-grained authorization: build or remove (`PM-GAP-002`)
- [ ] Decide fate of `KYCVerification` workflow: build or remove (`PM-GAP-003`)

## Phase 8 — External / Off-Platform Customer Support

🔒 Depends on Phase 3 and an undecided product decision. Do not schedule engineering time until the decision is made.

- [ ] 🔒 Decide external-customer onboarding UX (`PM-GAP-004`/`PM-GAP-019`)
- [ ] Implement the chosen flow

---

## Continuous — throughout every phase above

- [ ] Add real test coverage for each phase's highest-risk change as it lands (not retroactively) — the existing 46 spec files are scaffold-only (`TECHNICAL_DEBT.md` §6)
- [ ] Add `ConfigModule` validation schemas (env fails fast at startup) (`TECHNICAL_DEBT.md` N5)
- [ ] Add `@nestjs/terminus` health checks to all 8 apps (`TECHNICAL_DEBT.md` N2)
- [ ] Reconcile `docker-compose.prod.yml` to all 8 services, or document why only 3 are wired (`TECHNICAL_DEBT.md` D3)
- [ ] Fix per-service `.env` path inconsistencies — `eventcenters` loads the gateway's `.env`; `payments`/`notifications` use `../env` (missing leading dot) (`TECHNICAL_DEBT.md` N4)
- [ ] Reconcile RMQ `durable`/`noAck` settings across services to one intended reliability guarantee (`TECHNICAL_DEBT.md` A2)
- [ ] Add `timeout()`/retry policy to `ClientProxy.send()` calls gateway-wide (`TECHNICAL_DEBT.md` A5)
- [ ] Fix `err.response` unguarded access in every `catchError` block, repo-wide (`TECHNICAL_DEBT.md` E2)
- [ ] Add default/fallback path in `resolveTemplate` instead of throwing on unknown template names (`TECHNICAL_DEBT.md` E6)
- [ ] Confirm which of `Jenkinsfile` / `Jenkinsfile copy` / `jenkinsContainerized` is the real pipeline; delete the other two or mark historical (`TECHNICAL_DEBT.md` D1)
- [ ] Add `yarn test`/`yarn lint` as a required Jenkins stage (`TECHNICAL_DEBT.md` D1)

---

## What can safely wait until after initial production

- Full unified `Service` abstraction (`PM-GAP-008` Option 2) — decide the ADR now, defer the refactor if only 2 categories are needed at launch
- Fine-grained admin permissions (`PM-GAP-002`) — binary admin/not-admin is workable once `GAP-001` is fixed
- KYC workflow (`PM-GAP-003`) — unless a payment processor/regulator requires it before launch
- Platform review system (`PM-GAP-038`) — service/provider reviews ship first
- SMS/in-app notification channels (`PM-GAP-040`) — email is the one live channel
- General-purpose dispute system beyond refund-decline-appeal scope — explicitly Phase 2/MVP 2

## What must not wait (P0 production blockers)

Every item flagged P0 in [`backend-gaps.md`](backend-gaps.md)'s summary, plus `GAP-001/002/010/011/013/016` — these are auth bypasses, financial-correctness bugs, or foundational gaps every later phase depends on getting right the first time. All are represented as checklist items in Phases 0, 1, 3, 5, 6 above.
