# Open Product & Architecture Decisions

Every entry below is a business/product or architecture decision that cannot be safely inferred from the codebase — implementing against a guess here risks building the wrong thing twice. None of these have been decided by this audit; each includes a recommendation where one is reasonable, not a decision.

---

## Service category extensibility

**Question**: Should EventCenter/Catering share a unified `Service` data model (one table/schema, category as a discriminator, category-specific config as JSON or subtype tables), or should the platform continue the current pattern of one dedicated microservice + database per category?

**Why it matters**: the business model explicitly states the platform "is not limited to those categories." Today, `ServiceType` is independently hardcoded in 5 places (`booking`, `payments`, `notifications`, `users` [inconsistently named], `libs/contracts`), and adding a 3rd category means standing up a whole new microservice and touching ~21 files (`PM-GAP-008`).

**Affected domains**: Service Catalog, Booking, Payments, Notifications, Users.

**Options**:
1. Keep one-microservice-per-category, but centralize `ServiceType` as a single contract-level type all 5 schemas mirror, with a CI check for drift. Lower migration cost, doesn't fully solve the extensibility problem — a 3rd category is still a new microservice.
2. Migrate to a unified `Service` table (in a new or existing service) with category-specific config as structured JSON or per-category extension tables, similar to how `EventCenterBooking`/`CateringBooking` already extend `Booking`. Higher migration cost, genuinely solves extensibility.
3. Do nothing now; revisit when a 3rd category is actually committed to the product roadmap.

**Recommendation**: Option 1 now (stop the active `EVENTCENTER`/`EVENTCENTERS` naming-mismatch bug, establish one source of truth), Option 2 only if a 3rd category is on the near-term roadmap — this is a genuine architecture investment, not a quick fix, and shouldn't block initial production for 2 categories.

**Consequences**: deferring Option 2 means every future category-aware feature (this audit found several: quote data shape, cancellation policy, commission) gets built once more against the current pattern, increasing the eventual migration cost.

**Status**: Decision required before scoping any work that touches `ServiceType` broadly (e.g. Phase 2 of the roadmap).

---

## Commission model

**Question**: Is the platform's commission a flat fee (current implementation), a percentage of transaction value, or category/provider-tiered?

**Why it matters**: the business model describes "the platform takes its commission" in percentage-of-transaction language; the current implementation (`AppSettings.serviceCharge`) is explicitly a fixed amount, and isn't even read by the code that applies it (`PM-GAP-023`).

**Affected domains**: Payments, Management (platform config).

**Options**: (a) keep flat fee, wire `AppSettings.serviceCharge` up as the actual single source of truth; (b) percentage of `Invoice.amountDue`, flat across categories; (c) percentage, configurable per category or per provider tier.

**Recommendation**: no strong evidence either way from the codebase — this is a pure business decision. Whatever is chosen, it must become a **server-computed** value, not caller-supplied (today the invoice-creating caller decides the commission and the system only checks internal consistency).

**Consequences**: (c) requires a new per-category/per-provider rate table; (a)/(b) can reuse `AppSettings` with new fields.

**Status**: Decision required before Phase 3 of the roadmap.

---

## Cancellation policy model

**Question**: Platform-fixed presets (Flexible/Moderate/Strict, per the business model) or the current arbitrary provider-authored tiers?

**Why it matters**: `RefundPolicy`/`RefundPolicyTier` today lets each provider define arbitrary `(daysBefore, deductionPercentage)` pairs — the opposite of what the business model describes as preferred, and the feature is currently unreachable anyway (GAP-008), so nothing is lost by changing the model before reconnecting it (`PM-GAP-011`).

**Affected domains**: Service Catalog, Booking, Payments (refunds).

**Options**: (a) 3 platform-fixed presets a provider selects from (no custom thresholds); (b) platform-fixed presets with provider-configurable thresholds within platform-set bounds; (c) keep fully arbitrary provider-defined tiers.

**Recommendation**: (a), matching the business model's explicit stated preference and simplifying the refund-computation logic in `PM-GAP-017`.

**Consequences**: (a)/(b) require deleting or migrating the existing `RefundPolicyTier` model; existing seed/test data using arbitrary tiers would need to map onto the nearest preset.

**Status**: Decision required before Phase 4 of the roadmap; low urgency to build against until then since the feature is fully unreachable today.

---

## Escrow release trigger

**Question**: What actually releases escrowed funds — a time-based rule (N days after service date / booking completion), a manual admin action, automatic release on booking `COMPLETED`, or some combination?

**Why it matters**: `WalletService.releaseEscrow()` exists but is entirely commented out, and no scheduler of any kind exists anywhere in the payments app (`PM-GAP-025`) — there is currently no evidence of what the intended trigger even was.

**Affected domains**: Payments, Booking (needs the `COMPLETED` status from `PM-GAP-016`).

**Options**: (a) auto-release N days after booking `COMPLETED`; (b) auto-release on booking `COMPLETED` immediately; (c) manual admin/provider-triggered release; (d) hybrid — auto-release after a grace period unless a dispute/refund is in progress.

**Recommendation**: (d) is the common marketplace pattern (protects both the platform from paying out before a dispute window closes, and the provider from indefinite holds) but requires the dispute/refund window logic to exist first.

**Consequences**: (a)/(b)/(d) require a scheduler (none exists in this app today — see roadmap Phase 3); (c) requires an admin UI/endpoint.

**Status**: Decision required before Phase 3 of the roadmap — this is the highest-severity open item in the entire audit if escrow mode is ever enabled without it.

---

## Commission reversal on refund

**Question**: When a customer is refunded, does the platform also refund its commission, or keep it?

**Why it matters**: the dormant `RefundService.processRefund()` logic currently reverses only the principal payment and silently keeps 100% of the commission on every refund — with no comment or configuration indicating this was a deliberate choice (`PM-GAP-029`).

**Affected domains**: Payments (refunds, wallet).

**Options**: (a) commission is non-refundable (platform keeps it always); (b) commission is refunded proportionally to the refund amount; (c) commission is refunded only on provider-initiated cancellation (full refund case), kept on customer-initiated partial cancellation.

**Recommendation**: no strong evidence either way — this is a margin/business decision, not an engineering one. Whichever is chosen, it must be made explicit in code (a named constant/config, not implicit silence) so a future reader doesn't mistake it for a bug.

**Status**: Decision required before Phase 4 of the roadmap.

---

## External customer onboarding

**Question**: What is the actual UX/data-model for a provider managing a customer acquired off-platform (e.g. via Instagram) — invited/passwordless customer accounts? A payment-link-without-account flow? Provider-proxied booking creation?

**Why it matters**: confirmed entirely missing today (`PM-GAP-004`/`PM-GAP-019`) — `CreateBookingDto.customerId` mandates a pre-existing platform `User`, and there is no invited/passwordless account state anywhere.

**Affected domains**: Users, Booking, Payments (Invoices).

**Options**: (a) provider creates a minimal `Customer` record (name/phone/email, no password) that can later be claimed/upgraded to a full account by the customer; (b) provider generates a payment-link/invoice that an anonymous payer can pay without any `User` record existing at all; (c) provider books entirely on the customer's behalf with the provider as the `Booking`'s effective owner, no separate customer identity required.

**Recommendation**: this is explicitly flagged in the business brief as undecided — do not infer a UX. (a) is the most common pattern in comparable marketplaces and composes cleanly with the existing `User`/`Customer` model, but the actual answer should come from product research, not this audit.

**Status**: Decision required before Phase 8 of the roadmap; no engineering time should be scheduled against this until answered.

---

## Held vs. available wallet balance

**Question**: Should `Wallet` gain an explicit `heldBalance`/`availableBalance` split, or continue relying on the current (incidental) design where escrowed funds simply never touch the provider's own wallet row?

**Why it matters**: today this "works" only because escrow-held funds are credited to the *platform* wallet, not the provider's — an accident of the current escrow implementation, not a designed guarantee (`PM-GAP-027`). Any future change to how escrow crediting works (e.g. a naive fix to `PM-GAP-025` that credits the provider wallet directly with a "held" flag instead of using the platform wallet) could silently reintroduce a double-count/over-withdrawal risk.

**Affected domains**: Payments (Wallet, Withdrawals, Escrow).

**Recommendation**: add the explicit split now, before implementing escrow release — it removes an entire class of future bug rather than relying on the current design's accidental correctness.

**Status**: Decision required before Phase 3 of the roadmap (blocks `PM-GAP-025`/`PM-GAP-028` being done safely).

---

## Booking completion trigger

**Question**: What marks a booking `COMPLETED` — automatic transition when the event date/time passes, a manual provider action ("mark as completed"), or a customer confirmation step?

**Why it matters**: `PM-GAP-016` (no `COMPLETED` status exists at all) is a P0 finding blocking review eligibility platform-wide; adding the enum value is easy, but *what triggers the transition* is a real design question with no evidence in the codebase either way.

**Affected domains**: Booking, Reviews, Payments (escrow release, if tied to completion per the decision above).

**Options**: (a) automatic, N hours/days after the booked slot's end time; (b) manual provider action; (c) hybrid — auto-complete unless the provider or customer flags an issue within a window.

**Recommendation**: (a) is the lowest-friction default and avoids relying on providers to remember a manual step, with (c)'s issue-flagging as a natural Phase 2 extension once the support/dispute system matures.

**Status**: Decision required before Phase 1 of the roadmap — this blocks `PM-GAP-016`, which several other P0 items depend on.

---

## Platform review system scope

**Question**: What does a platform review actually consist of — a simple rating, structured feedback categories, tied to a specific interaction (e.g. after N bookings) or freely submittable at any time?

**Why it matters**: confirmed entirely missing (`PM-GAP-038`) — there is no existing code, unlike service/provider reviews, to build on or constrain the design.

**Affected domains**: Notifications/Reviews.

**Recommendation**: lower priority than service/provider reviews (Phase 5); can be scoped later without blocking anything else.

**Status**: Decision required before scheduling Phase 5's platform-review sub-item; not urgent.

---

## Subscription/Featured schema duplication cleanup

**Question**: Confirm the `apps/users`-schema `Subscription`/`SubscriptionPlan`/`Featured` models are safe to delete, and separately confirm whether `apps/users`' `Featured` or `apps/payments`' `FeaturedPlans` (or both) are actually live.

**Why it matters**: `Subscription`/`SubscriptionPlan` in `users` are confirmed dead code (`PM-GAP-005`) — the `payments`-schema versions are the live implementation. `Featured` vs. `FeaturedPlans` was flagged `AMBIGUOUS` by the audit (not fully traced) and needs a short follow-up grep before deletion.

**Affected domains**: Users, Payments.

**Recommendation**: low-risk cleanup, not a business decision — just needs the follow-up verification pass before deleting.

**Status**: Verification needed, not a product decision; can happen anytime (Phase 7).
