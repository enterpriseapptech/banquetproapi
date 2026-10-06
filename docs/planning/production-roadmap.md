# Production Roadmap

This roadmap merges the existing `KNOWN_GAPS.md` Phase 0–7 plan (security/architecture-focused) with the business-model gaps found in this audit (`PM-GAP-*`, see [`backend-gaps.md`](backend-gaps.md)). Phases are ordered by **actual dependency**, not by category — a phase is listed after another only because it genuinely cannot be done correctly first. Where two work items don't depend on each other, that's called out explicitly so they can run in parallel with separate engineers.

Testing is **not** a separate final phase — add real test coverage for each phase's highest-risk change as that phase lands, starting with whatever phase you tackle first. Retrofitting tests at the end, after `TECHNICAL_DEBT.md` already documented that the existing 46 spec files are scaffold-only, would just repeat the same mistake at a larger scale.

---

## Phase 0 — Identity & Trust Boundary Correctness

**Must go first: every other phase's authorization/ownership checks are meaningless until the platform can correctly identify who is calling.**

- Fix `JwtStrategy.validate()`'s Observable-await bug (GAP-001 root cause) and the ~30 downstream call sites that depend on its current broken shape.
- Fix `AdminRoleGuard` (GAP-001) and `VerificationGuard`/`AccountStatusGuard` (GAP-002).
- Guard + add ownership checks to `GET`/`PATCH /users/:id` (GAP-016) — **and, in the same change**, add a real admin-approval transition (`RESTRICTED → ACTIVE`) so this fix doesn't permanently lock out every new admin account (`PM-GAP-001`). These two are one unit of work, not sequential ones — shipping the GAP-016 fix without the approval transition is strictly worse than shipping neither.
- Add ownership checks to listing update/delete (GAP-006), and in the same pass add existence validation of `serviceProviderId` at listing creation (`PM-GAP-006`) — same code paths, same review.
- Add Stripe/Paystack webhook signature verification (GAP-013) **and** fix the webhook idempotency bug where a replayed payment double-applies its invoice/wallet effects (`PM-GAP-030`) — both are defects in the same handler; fixing authenticity without also fixing idempotency leaves a legitimate-but-retried webhook still able to double-credit.
- Add cross-service ID existence validation more broadly (`PM-GAP-043`) — `Booking.customerId`, `Booking.serviceProvider`/`serviceId`, `TimeSlot.serviceId` at minimum.

## Phase 1 — Booking & Slot Lifecycle Correctness

**Depends on Phase 0** (ownership/authorization must work before lifecycle transitions are safe to expose). Nothing about quotes, invoices, cancellation, or reviews can be built correctly on top of a booking lifecycle that doesn't have a real state machine yet — this phase defines that state machine once, for everyone downstream to build on.

- Prevent double-booking at the database/transaction level (GAP-010).
- Add a `COMPLETED` (or equivalent) value to `BookingStatus` (`PM-GAP-016`) — **do this before** wiring up `confirm`/`cancel`/`reschedule`, not after, since the transition table you're about to build needs to include it.
- Wire up `confirm`/`cancel`/`reschedule` (GAP-011) so that they **actually write `Booking.status`** (`PM-GAP-015` — the existing dormant methods set timestamps but not status; reconnecting the RMQ patterns alone does not fix this).
- Constrain booking status transitions (GAP-012) using the now-complete enum.
- Reconcile the two independently-defined `BookingStatus` enums (`booking` vs. `eventcenters` schemas) into one source of truth (`PM-GAP-018`).

*Can run in parallel with Phase 1*: fixing the always-"Event Center" quote-notification bug (GAP-009) — small, isolated, no dependency either direction.

## Phase 2 — Quote & Catalog Data Model

**Depends on nothing above, but should land before or alongside Phase 4 (Messaging)** — a negotiation feature is far less useful without structured data to negotiate over. Can be staffed in parallel with Phase 1.

- Add structured fields to `RequestQuote` (and/or a related model) for the dynamic catering/event-center inputs the business model requires: guest count, menu/dietary/allergy detail, drinks, staffing, equipment, event context (`PM-GAP-010`). This is the single highest-value catalog/booking change for making the core catering product actually usable.
- Decide and implement a "requires quote" vs. "directly bookable" indicator on `EventCenter` listings (`PM-GAP-009`).
- Resolve the Service-category extensibility question (`PM-GAP-008`) — see [open decision](open-decisions.md#service-category-extensibility). This can be scoped down to "define the ADR and stop the bleeding" (e.g. centralize `ServiceType` as a single contract-level type all schemas mirror) without necessarily building a full unified `Service` table before launch — see the "what can wait" note at the bottom of this document.

## Phase 3 — Financial Core Hardening

**Depends on Phase 0** (invoice/payment endpoints must be correctly authorized first) but is otherwise independent of Phases 1–2, and can be staffed in parallel with them. **Must complete before Phase 5 (Cancellation & Refunds)** — refunds cannot be correctly reversed against a wallet/escrow/commission model that isn't itself correct yet.

- Fix invoice mutability: block edits to `PAID`/`PARTIALLY_PAID` invoices (`PM-GAP-021`), and fix the `||` bug that makes the existing delete/replace guard only check `PAID` (`PM-GAP-022`).
- Decide the commission model (flat fee vs. percentage, category-aware or not) and give it a real single source of truth — today `AppSettings.serviceCharge` exists but is never read (`PM-GAP-023`, `PM-GAP-031`). This is also the natural place to decide the escrow-toggle and cancellation-policy-preset config location, since all three are "central platform policy" gaps with the same missing mechanism.
- Add a held-vs-available balance concept to `Wallet` (`PM-GAP-027`) — **do this before** fixing escrow release, not after, since escrow release is the change most likely to expose the current single-`balance`-field design's latent double-count risk.
- Implement escrow release (`PM-GAP-025`) — currently 100% dead code with no scheduler of any kind in the payments app. This is the highest-severity finding in the entire audit if escrow mode is ever enabled.
- Reconnect withdrawals (GAP-014/`PM-GAP-028`) — safe to do only after the held/available balance work above.
- Add the defensive null-guard on the invoice service-charge line-item lookup (`PM-GAP-024`) — trivial, do it opportunistically during this phase.

## Phase 4 — Cancellation, Refunds & Disputes

**Depends on Phase 1** (needs a correct booking state machine to cancel *into*) **and Phase 3** (needs a correct wallet/escrow/commission model to reverse *against*).

- Decide the cancellation-policy model: platform-fixed presets (Flexible/Moderate/Strict, per the business model) vs. the current arbitrary provider-defined tiers (`PM-GAP-011`) — see [open decision](open-decisions.md#cancellation-policy-model).
- Build the cancellation/refund chain the booking domain currently lacks entirely: policy evaluation, refund computation, wallet/escrow reversal, notification (`PM-GAP-017`).
- Reconnect refunds (GAP-014) and decide whether a refund reverses the platform's commission or not (`PM-GAP-029`) — the dormant logic currently does not, silently.
- Once refunds are live, `Dispute.resolve()` can finally move money — today it's a real, reachable feature that updates records but can't actually resolve anything financially because it depends on the dead `RefundService` (`PM-GAP-033`).

## Phase 5 — Reviews

**Depends on Phase 1** (`COMPLETED` status must exist) and is otherwise independent.

- Reconnect the Review feature (GAP-015) — **but not against `booking.status === 'CONFIRMED'`** as the dormant code currently does; re-point eligibility at the new `COMPLETED` state (`PM-GAP-035`).
- Fix the exception-swallowing bug that turns a legitimate 403 into a 500 (`PM-GAP-036`).
- Add duplicate-review prevention (`PM-GAP-037`).
- Decide and build (or explicitly defer) the separate platform-review system (`PM-GAP-038`) — this has no existing code to build on, unlike service/provider reviews.
- Wire rating aggregation from `Review` back onto `EventCenter.rating`/`Catering.rating` (`PM-GAP-042`).

## Phase 6 — Messaging (greenfield)

**Depends on Phase 2** (structured quote data gives negotiation something concrete to reference) and benefits from Phase 1 being stable (a message referencing "this booking" should be pointing at a booking whose lifecycle is trustworthy). This is the single largest net-new feature in the roadmap — there is no dead code to reconnect, `PM-GAP-034` confirmed zero footprint anywhere in the repo. Needs its own feature-design pass (Phase B) before implementation: transport (REST polling vs. websocket — no realtime dependency exists in the repo today), data model, and how conversations link to quote requests/bookings/invoices/support cases.

## Phase 7 — Notifications, Support & Platform Config Cleanup

Mostly independent, low-coupling fixes that can be picked up opportunistically alongside any phase above:

- Fix the payment-failed/subscription-expired notification category/channel confusion (GAP-017 confirmed, `PM-GAP-039`/`PM-GAP-040` extend it) and reinstate notification persistence.
- Add an informal support/customer-care concern channel, distinct from the Phase-2-deferred formal dispute system (`PM-GAP-041`).
- Remove the dead `users`-schema `Subscription`/`SubscriptionPlan`/`Featured` models (`PM-GAP-005`).
- Decide the fate of `Permission`/`AdminRole` fine-grained authorization (`PM-GAP-002`) and the `KYCVerification` workflow (`PM-GAP-003`) — both are schema-complete with zero application logic; either build the workflow or remove the schema to stop it looking like a supported feature.

## Phase 8 — External / Off-Platform Customer Support

**Depends on Phase 3** (invoicing must be solid) and on a product decision that hasn't been made yet (`PM-GAP-004`/`PM-GAP-019`) — see [open decision](open-decisions.md#external-customer-onboarding). Do not schedule engineering time against this phase until that decision is made; the shape of the work (a new customer-creation endpoint? a payment-link-without-account flow?) depends entirely on the answer.

## Continuous, throughout every phase above

- Add real test coverage for each phase's highest-risk change as it lands (not retroactively).
- Add `ConfigModule` validation schemas, `@nestjs/terminus` health checks, and reconcile `docker-compose.prod.yml` to all 8 services — these are already tracked in `KNOWN_GAPS.md` Phase 2/5/6 and don't block any phase above, but shouldn't be pushed indefinitely either.

---

## What can safely wait until after initial production

- Full unified `Service` abstraction / multi-database-to-shared-model migration (`PM-GAP-008`) — the ADR decision should be made before launch (so you don't paint yourself further into a corner), but the actual refactor can follow if only 2 categories are needed at launch.
- Fine-grained admin permissions (`PM-GAP-002`) — binary admin/not-admin is a real, if coarse, control once GAP-001 is fixed.
- KYC workflow (`PM-GAP-003`) — unless required by a payment processor or regulator before launch.
- Platform review system (`PM-GAP-038`) — service/provider reviews are the higher-value system to ship first.
- SMS/in-app notification channels (`PM-GAP-040`) — email is the one live, working channel; adding channels is additive, not corrective.
- General-purpose dispute system beyond the existing refund-decline-appeal scope — explicitly Phase 2/MVP 2 per the business model.

## What must not wait

Every item in [`backend-gaps.md`](backend-gaps.md)'s P0 summary — these are either security/authorization bypasses, financial-correctness bugs with confirmed reproduction paths, or foundational gaps (no `COMPLETED` status, no messaging) that every later phase implicitly depends on getting right the first time.
