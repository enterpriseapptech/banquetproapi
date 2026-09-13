# Domain Overview — Entity Inventory

Evidence basis: direct reading of all 7 microservice Prisma schemas + their service/controller layers, plus the apigateway's per-domain controllers, during the Phase A audit (2026-09-07). Every claim below traces to a specific file; the full evidence trail lives in the audit scratch files referenced per section and is condensed into gap IDs cross-referenced against [`../planning/backend-gaps.md`](../planning/backend-gaps.md). Existing GAP-001..017 (from the repo-root `KNOWN_GAPS.md`, dated 2026-09-06) are cited by their original ID, not restated. New findings from this audit are numbered `PM-GAP-0xx`.

**Read this alongside** [`../data/data-model.md`](../data/data-model.md) for full field-level schema and the cross-service reference diagram, and [`../product/business-model.md`](../product/business-model.md) for what each domain is supposed to do.

**Architecture note that applies to every domain below**: this is a database-per-microservice architecture (7 independent Postgres databases behind 7 NestJS microservices + 1 API gateway). Any field described as a "reference" to another domain's entity (e.g. `Booking.customerId`) is a **plain string with no database-level foreign key** — referential integrity is possible only at the application level, and per [`PM-GAP-043`](../planning/backend-gaps.md), in most traced cases it currently isn't enforced there either.

---

## 1. Users, Auth & Roles

*(Service: `apps/users`. Full trace: fork-users audit.)*

| Entity | Purpose | Key fields | Status |
|---|---|---|---|
| `User` | Single account table, `userType`-discriminated | `status` (ACTIVE/DEACTIVATED/RESTRICTED), `isEmailVerified`, `loginAttempts`, `refreshToken` (plaintext), `catering`/`eventCenter: String[]` (**bookmarks, not owned listings** — misleadingly named) | Implemented core CRUD; broken at the edges (GAP-001/002/016 + `PM-GAP-001`) |
| `Admin`/`ServiceProvider`/`Customer`/`Staff` | 1:1 satellite tables per actor | `ServiceProvider.serviceType` (self-declared, unenforced against actual listings); `Staff.serviceProviderId` | Implemented as data; provider↔listing link is app-level only (architecturally expected) with zero write-time validation (`PM-GAP-006`) |
| `PersonalAccessTokens` | Verification/reset/delete-account tokens | 6-hex-char code via `Math.random()` (low entropy, not CSPRNG) | Partial — works for verification; reset-expiry is GAP-004 |
| `Permission` | ABAC-shaped fine-grained authorization table | `role`/`action`/`resource`/`condition` | **Dead code** — zero application references anywhere in the repo (`PM-GAP-002`) |
| `KYCVerification` | Identity/business verification | facial + ID document fields, `VerificationStatus` | **Missing end-to-end** — no submission or review endpoint exists; the only live "KYC" reference is a payable fee line item, unrelated to actually verifying anyone (`PM-GAP-003`) |
| `Subscription`/`SubscriptionPlan`/`Featured` (users schema) | Subscription/visibility state | — | **Dead code** — the live implementation is the structurally-duplicate model set in `apps/payments` (see §4). Recommend deletion once confirmed unused elsewhere (`PM-GAP-005`) |

**Lifecycle**: `User.status` has exactly three values (`ACTIVE`/`DEACTIVATED`/`RESTRICTED`) with no distinct "pending verification" state — `isEmailVerified` is an orthogonal boolean. New admins and 7-consecutive-failed-login accounts both land in `RESTRICTED` with **no code path back to `ACTIVE`** except the unguarded `PATCH /users/:id` from GAP-016 — see `PM-GAP-001`, and read it together with GAP-016, not as a lesser, separate issue.

**Entitlement logic (confirmed correct)**: `apps/eventcenters/src/eventcenters.service.ts` orders search results by `subscriptionStatus: 'desc'` — expired-subscription providers are demoted in ranking, not delisted. This is a correct, working implementation of the business rule "subscription controls visibility, not core functionality" (verified for `eventcenters`; not independently re-verified for `catering`).

**External/off-platform customers**: confirmed **missing** — no code path anywhere lets a provider create a `Customer` on someone else's behalf, no passwordless/invited-customer state exists. See `PM-GAP-004`.

---

## 2. Service Catalog — Event Centers & Catering

*(Services: `apps/eventcenters`, `apps/catering`. Full trace: fork-catalog audit.)*

| Entity | Purpose | Key fields | Status |
|---|---|---|---|
| `EventCenter` | One listing | `pricingPerSlot: Decimal` (fixed), `depositPercentage: Int` (the business model's "booking percentage," correctly enforced server-side — see §3), `status: ServiceStatus` (ACTIVE/INACTIVE only), `cancellationPolicy: String` (free text) | Implemented, no ownership/existence validation on write (GAP-006, `PM-GAP-006`) |
| `Catering` | One listing | `startPrice: Float` (**not `Decimal`** — the only non-`Decimal` money field found anywhere in the codebase, a real float-precision risk), `depositPercentage: Int`, `minCapacity`/`maxCapacity: Int?` (a catalog range, not a per-quote guest count) | Implemented as a catalog entry; captures none of the dynamic per-quote requirement data the business model needs (`PM-GAP-010`) |
| `Menu` | Named menu item + images, belongs to one Catering | No pricing, no per-guest cost | Marketing/catalog content only |
| `RefundPolicy`/`RefundPolicyTier` | Per-listing cancellation refund tiers | Arbitrary `(minDaysBeforeEvent, deductionPercentage)` pairs, **provider-defined**, byte-for-byte duplicated model definition across both schemas | Endpoints dead-on-arrival (GAP-008); design itself contradicts the business model's preference for platform-fixed presets (`PM-GAP-011`) |

**No shared "Service" abstraction exists.** `EventCenter` and `Catering` are two fully independent models in two separate databases; `ServiceStatus`/`SubscriptionStatus` enums are redefined identically in both schemas rather than shared. The `{EVENTCENTER, CATERING}` category pair is independently hardcoded in at least 5 separate enum definitions across `booking`, `payments`, `notifications`, `users`, and `libs/contracts` — one of which (`users`' `EVENTCENTERS`, plural) doesn't even match the other four's spelling. Adding a genuinely new service category today requires a new microservice + database plus edits across all of those files. **This is the single largest architectural extensibility gap found in the audit** — see `PM-GAP-008` and the [ADR candidate](../planning/open-decisions.md#service-category-extensibility).

**No field anywhere marks a listing "requires a quote" vs. "directly bookable"** — the business rule that an otherwise fixed-price event center can still require a quote for custom terms has zero backend representation (`PM-GAP-009`). Enforcement of "catering can never be directly booked by a customer" happens correctly, but at the *booking* layer, not the catalog layer — see §3.

**Lifecycle**: `ServiceStatus` is binary (`ACTIVE`/`INACTIVE`) with no draft/publish workflow — a listing is live the instant `create` succeeds if the caller passes `status: ACTIVE` (`PM-GAP-012`).

---

## 3. Booking, Slots & Quotes

*(Service: `apps/booking`. Full trace: fork-booking audit.)*

| Entity | Purpose | Key fields | Status |
|---|---|---|---|
| `TimeSlot` | A bookable interval owned by one service | `isAvailable: Boolean`, `bookingId` (current claimant), `previousBookings: String[]` | Ownership validated at slot-*creation* time (real RMQ check against eventcenters/catering); **never checked or claimed at booking-creation time** — GAP-010, confirmed with exact mechanism: `isAvailable` is currently write-only-in-reverse (only ever freed, never claimed) |
| `Booking` | The confirmed/pending engagement of one service for ≥1 slots | `status: BookingStatus`, `paymentStatus: InvoiceStatus` (**two genuinely separate columns** — correct), `invoice: String[]` (schema anticipates multiple invoices), `confirmedBy`/`confirmedAt`, `cancelledBy`/`cancelationReason` | Creation well-validated; state-transition methods (`confirm`/`cancel`/`reschedule`) unreachable (GAP-011) **and independently buggy if reconnected** — see below |
| `RequestQuote` | A quote request scoped to one provider's one service | `budget: String` (free text), `customerNotes?`, `billingDetails: Json`, `status` (reuses payments' `InvoiceStatus` — a semantic mismatch) | Correctly scoped (not app-wide); captures **none** of the dynamic quote data the business model requires (`PM-GAP-010`, shared with §2) |
| `EventCenterBooking`/`CateringBooking` | 1:1 post-booking detail rows | `noOfGuest`, `specialRequirements` (enum with only 2 values: wheelchair access, temperature — **no dietary/allergy/drinks/staffing/equipment representation anywhere**) | Correctly modeled as 1:1 extension tables, but structurally too thin for the business model's catering requirements |

**Multi-slot booking: implemented.** `Booking.requestedTimeSlots` is a genuine many-to-many relation; a single booking can span N slots.

**Booking percentage / deposit: implemented, and more robustly than a schema-only read suggests.** `apps/apigateway/src/booking/booking.controller.ts` reads `depositPercentage` per-service, computes the minimum required deposit server-side, and **rejects** a client-declared `amountDue` outside `[minimumAmountDue, computedTotal]`. Catering is correctly hard-blocked from customer-initiated direct booking (`BadRequestException`, "only requests for quotes are allowed for catering") — this is real, working enforcement of two core business rules.

**What's missing**: no code path generates an *automatic* additional invoice when a booking's requirements change (a manual endpoint for this exists in the payments domain — see §4, `PM-GAP-020`); `confirm()` and `cancel()` never write `Booking.status` even in principle, so reconnecting GAP-011 alone would not make status transitions correct (`PM-GAP-015`); there is **no `COMPLETED` value in `BookingStatus` at all** (`PENDING/CONFIRMED/RESERVED/POSTPONED/CANCELED` only) — this single missing enum value blocks correct review-eligibility enforcement platform-wide (`PM-GAP-016`, cross-referenced in §5); and `cancel()` releases slots correctly but has **zero cancellation-policy evaluation, refund computation, or wallet/commission reversal** — the entire "evaluate policy → refund → reverse escrow/commission → notify" chain required by the business model does not exist in this domain (`PM-GAP-017`).

### Reconstructed state machines (what the code actually does)

```text
Booking.status:      PENDING ──(no code path sets any other value on the reachable path)──▶ stuck
                      (generic, unguarded PATCH /booking/:id can set it to any enum value, no transition rules — GAP-012)

Booking.paymentStatus: GENERATED ──(updatePayment(), amountPaid vs total)──▶ PARTIALLY_PAID | PAID
                        (correctly decoupled from Booking.status — the one place this business rule is properly implemented)

RequestQuote.status:  GENERATED ──(generic PATCH, no transition rules)──▶ any value
                       RequestQuote ──(customer/provider manually passes requestQuoteId into POST /booking)──▶ Booking
                       (no automatic status sync back onto RequestQuote when its Booking is created)
```

---

## 4. Payments, Invoices, Wallet, Escrow, Commission, Refunds, Disputes, Withdrawals

*(Service: `apps/payments`. Full trace: fork-payments audit — the highest-stakes domain in this system.)*

| Entity | Purpose | Status |
|---|---|---|
| `Payment` | One record per gateway transaction | Implemented, live; `@@unique([reference, paymentReference, transactionId])` correctly deduplicates replayed webhooks **at the Payment-row level** |
| `Invoice` | Billable object for a booking or subscription | Implemented; **mutable after payment with no guard** — a `PAID`/`PARTIALLY_PAID` invoice's `amountDue`/`items` can be silently rewritten via `PATCH /invoice/:id` (`PM-GAP-021`, **P0**) |
| `Refund` | Refund request/approval record | Schema + a materially complete dormant service exist; unreachable (GAP-014). Dormant logic never reverses the platform's commission on a refund (`PM-GAP-029`) |
| `Dispute` | Escalation of a **declined refund** to admin | **Implemented and fully reachable end-to-end** — not mentioned in any prior audit. Narrow scope (refund-decline appeals only, not general complaints); `resolve()` cannot move money because it depends on the dead `RefundService`. See [dispute system note](#existing-partial-dispute-system) below |
| `Wallet` | One row per user + one singleton `PLATFORM` row | Implemented; **single `balance` field with no held/available split** (`PM-GAP-027`) |
| `WalletTransaction` | Append-only ledger line | Implemented correctly — a genuine strength: every credit/debit carries `balanceBefore`/`balanceAfter` and a typed `reason` |
| `Withdrawal` | Payout request | Schema + a sound dormant service exist; entirely commented out (GAP-014). If reconnected as-is, its balance check is correct in isolation but the missing held/available split (`PM-GAP-027`) is a latent risk |
| `Subscriptions`/`SubscriptionPlans`/`FeaturedPlans` (payments schema) | The **live** subscription/featured-listing billing implementation | Confirmed via `SubscriptionExpiryService`'s working daily cron, which denormalizes expiry onto `EventCenter`/`Catering` rows |

### Booking percentage / multi-invoice — reconciling a cross-fork discrepancy

The booking-domain audit, reading only `apps/booking`, concluded no additional-invoice path exists. **Reading `apps/payments/src/services/invoice.service.ts` directly overturns that**: `InvoiceService.createSecondInvoice()`, exposed at `POST /invoice/create-invoice`, is a real, working implementation of "generate an additional invoice for a booking" — it sums prior payments across all of a booking's invoices and creates a new `PENDING` invoice for the difference. **Correct classification: implemented, but manual and unvalidated** — nothing on the booking side automatically triggers it when requirements change (e.g. a guest-count increase), and the new invoice amount is not validated against anything (`invoice.service.ts` has an explicit unresolved `// TODO: validate`). See `PM-GAP-020`.

### Commission — a flat fee, with no single source of truth

`AppSettings.serviceCharge` (`apps/management`) is explicitly a **fixed amount, not a percentage**, and — this is the more serious finding — **it is never actually read by the payments service**. `serviceChargeAmount` on every invoice is instead supplied by the caller and only self-consistency-checked (does it match an `items` line entry), never computed from any platform-configured rate. There is currently no single source of truth for "what does the platform charge," anywhere. See `PM-GAP-023` and `PM-GAP-031`.

### Escrow — hold works, release does not exist

`HOLD_PAYMENT_IN_ESCROW_WALLET=true` correctly routes a provider's net amount to the `PLATFORM` wallet with reason `ESCROW_HOLD`. **`WalletService.releaseEscrow()` is 100% commented out, and no cron/scheduler/admin endpoint anywhere in the repository ever moves money out of escrow.** If escrow mode is ever enabled in production, provider earnings are captured permanently with zero payout path. This is the single most severe financial-correctness finding in the audit — `PM-GAP-025`, **P0**.

### Webhook replay — a real double-credit bug

Duplicate-payment detection at the `Payment`-row level is correctly implemented (a replayed webhook does not create a second `Payment` row). **But the code that applies a payment's effects to an invoice/wallet does not check for that `null` "duplicate" return value before continuing** — it proceeds to debit the customer, credit the platform's commission, and credit/escrow the provider's share a second time regardless. A replayed webhook (a scenario both Stripe and Paystack explicitly expect integrators to handle idempotently) **will double-apply the entire payment distribution**, not just fail to double-create a row. `PM-GAP-030`, **P0** — distinct from and more severe than the already-tracked GAP-013 (unsigned webhook), which is about *authenticity*; this is about *idempotency of an authentic, legitimately-retried webhook*.

### Existing partial dispute system

`Dispute` is real, wired end-to-end (gateway HTTP routes → RMQ patterns → live service), and models exactly one flow: a customer escalating a provider's **declined refund** to platform admin review. It is not a general-purpose complaint/dispute system, and its `resolve()` action cannot currently move any money since the `RefundService` it depends on is dead code. Recommend documenting this precisely as "existing partial implementation, scope = refund-decline appeals only" when planning the Phase 2 dispute system referenced in the business model — this is a real foundation to build on, not a blank slate.

Full severity-tagged list of every payments-domain finding: [`../planning/backend-gaps.md`](../planning/backend-gaps.md) (`PM-GAP-021` through `PM-GAP-033`).

---

## 5. Reviews, Notifications & Messaging

*(Service: `apps/notifications`. Full trace: fork-reviews-messaging audit.)*

| Entity | Purpose | Status |
|---|---|---|
| `Review` | Customer review of a specific booking/service | Schema + a materially real (but defective) eligibility-check service exist; **fully unreachable** (GAP-015). Eligibility checks `booking.status === 'CONFIRMED'` — but no `COMPLETED` status exists anywhere in the Booking domain (§3), so even reconnecting this would let customers review before the service was ever rendered (`PM-GAP-035`, **P0** jointly with `PM-GAP-016`) |
| `Notification` | Persisted delivery record | Table exists; **the only live code path (`send()`) never writes to it** — zero notification history despite the model (`PM-GAP-039`) |
| *(none)* — **Platform review** | Customer reviews the platform itself | **Confirmed entirely missing** — no model, no field, no distinct concept anywhere. Only the provider/service review (above) exists, and only partially (`PM-GAP-038`) |
| *(none)* — **Messaging/Conversation** | Customer↔Provider / Provider↔Platform / Customer↔Platform negotiation and support | **Confirmed absent, repo-wide, with zero footprint** — not partial, not dead code, not schema-only. No model, service, RMQ pattern, or realtime dependency exists anywhere in any of the 8 apps or 2 shared libs. This is a from-scratch Phase B feature design item, and a hard blocker for the "negotiate via messaging" step of the Request-Quote pathway (`PM-GAP-034`, **P0**, foundational) |
| *(none)* — **Support/complaint** | Informal customer concern, distinct from a review or formal dispute | **Confirmed missing** — no ticket/complaint/customer-care record type exists anywhere (`PM-GAP-041`). Per the business model, a *formal* dispute system is explicitly deferred to Phase 2/MVP 2 — but even the informal "customer raises a concern" channel this Phase envisions has no backend representation today |

**Dormant Review logic has two further defects beyond unreachability**: the `ForbiddenException` thrown for an ineligible review is caught by the method's own broad `try/catch` and surfaces as a generic 500 instead of a 403 (`PM-GAP-036`); and there is no duplicate-review prevention (`PM-GAP-037`) — nothing stops one customer submitting unlimited reviews for the same booking.

**Notification deliverability** (extends GAP-017 with a full source→handler trace): booking/payment-received/quote-request/timeslot notifications are correctly delivered end-to-end. Payment-failed and subscription-expired notifications are **silently dropped** — their callers send a `type` value (`ERROR`/`WARNING`) meant for a different enum than the one `send()` actually branches on (`EMAIL`/`IN_APP`/`SMS`), a category/channel confusion, not merely a "shape mismatch." In-app and SMS channels are declared in the interface but have zero implementation (`PM-GAP-040`).

**Rating aggregation**: `EventCenter.rating`/`Catering.rating` exist as indexed `Decimal?` fields, but nothing anywhere computes or writes to them from `Review` data — they hold their default (unset) value in every real row (`PM-GAP-042`).

---

## 6. Management & Cross-Cutting Platform Configuration

*(Service: `apps/management`. Full trace: fork-mgmt-arch audit, which also re-verified 6 load-bearing claims from the repo-root `KNOWN_GAPS.md`/`TECHNICAL_DEBT.md` — all confirmed except one correction noted below.)*

| Entity | Purpose | Status |
|---|---|---|
| `AppSettings` | Singleton platform config row | Only monetary field is `serviceCharge` (flat, not %) — and per §4, it's **never consumed** by the payments service. No escrow-toggle, cancellation-tier, or booking-percentage field exists here or anywhere else. There is currently **no central platform-policy configuration mechanism** for any of the three business-model concepts that explicitly call for platform-controlled rules (commission rate, escrow behavior, cancellation-policy presets) (`PM-GAP-031`) |
| `Country`/`State`/`City` | Reference data | Implemented, functional |

**Cross-service referential integrity, confirmed on 3 concrete cases**: `Booking.customerId`, `Booking.serviceProvider`/`serviceId`, and `TimeSlot.serviceId` are all persisted with **zero runtime existence check** against the service that actually owns that ID — fully trusted client input, confirmed by direct trace (`PM-GAP-043`).

**One correction to the prior audit**: `TECHNICAL_DEBT.md`'s claim that `notifications` (in addition to `payments`) loads its env file from a broken relative path (`'../env'`) does **not hold** — `apps/notifications/src/notifications.module.ts` correctly loads its own `.env`. Only `payments` (malformed relative path) and `eventcenters` (loads the *gateway's* `.env` file entirely) are actually broken. All other spot-checked claims (JwtStrategy Observable-await bug, AdminRoleGuard, docker-compose.prod.yml's 3-of-8 services, RMQ durable/noAck inconsistency) were independently reconfirmed against current source.

---

## Cross-domain summary: what's conspicuously absent everywhere

These recur across ≥2 domains and are foundational rather than local fixes:

1. **No `COMPLETED` booking state** — blocks review eligibility, "service rendered" semantics, and by extension any future dispute/support flow gated on "did the service actually happen."
2. **No messaging system** — blocks quote negotiation as described in the business model; nothing to extend, must be designed from scratch.
3. **No unified Service abstraction / category extensibility** — 5 independently-hardcoded `ServiceType`-equivalent enums, one inconsistent, across booking/payments/notifications/users/contracts.
4. **No central platform-policy configuration** — commission rate, escrow toggle, and cancellation-policy presets are each individually missing a single source of truth, despite `AppSettings` existing as the obvious place for them.
5. **No held-vs-available balance concept on `Wallet`** — currently works by accident (escrow funds land on the platform wallet, not the provider's), not by design; a future fix to escrow release without addressing this could silently reintroduce a double-count risk.

See [`../planning/backend-gaps.md`](../planning/backend-gaps.md) for the full, prioritized matrix and [`../planning/open-decisions.md`](../planning/open-decisions.md) for the product decisions these gaps require before they can be closed.
