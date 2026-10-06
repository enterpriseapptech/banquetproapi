# Backend Gap Matrix

Two numbering systems appear in this repository, deliberately kept separate:

- **`GAP-001` .. `GAP-017`** — from the repo-root `KNOWN_GAPS.md` (2026-09-06), a security/architecture-focused audit. Cited here by ID, not restated; read that file for full detail.
- **`PM-GAP-001` .. `PM-GAP-043`** — new findings from this Phase A audit (2026-09-07), produced by mapping the codebase against the detailed business model in [`../product/business-model.md`](../product/business-model.md). This is the primary content of this document.

**Priority key**: P0 = production blocker (correctness/security/financial-integrity failure) · P1 = required for the core product as described · P2 = important, can follow initial production · P3 = enhancement/cleanup.

**Status legend**: Implemented · Partial · Broken (exists, doesn't work as intended) · Missing (no reachable implementation) · Dead code (exists, nothing calls it, not on any reachable path) · Ambiguous (needs further verification) · Product decision required (implementation depends on an unresolved business rule).

---

## Existing gaps, by domain (from `KNOWN_GAPS.md` — cited, not restated)

| Domain | GAP IDs |
|---|---|
| Auth / guards | GAP-001, GAP-002, GAP-016 |
| Login/session | GAP-003, GAP-004 |
| Service catalog | GAP-005, GAP-006, GAP-007, GAP-008 |
| Booking | GAP-009, GAP-010, GAP-011, GAP-012 |
| Payments | GAP-013, GAP-014 |
| Reviews | GAP-015 |
| Notifications | GAP-017 |

All seven were spot-checked or fully re-traced during this audit and **confirmed still accurate**, with one correction: `TECHNICAL_DEBT.md`'s claim that `notifications`' env-file loading is broken (in addition to `payments`) does not hold — only `payments` (malformed relative path) and `eventcenters` (loads the gateway's `.env`) are actually broken.

---

## Users, Auth & Roles

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-001 | Admin account activation | Broken | New admins land in `RESTRICTED`; no code path ever transitions back to `ACTIVE` except the unguarded `PATCH /users/:id` from GAP-016. **Read jointly with GAP-016** — fixing GAP-016's guard without adding a real approval-transition endpoint permanently locks out every new admin. | **P0** |
| PM-GAP-002 | Fine-grained admin permissions (`AdminRole`, `Permission` table) | Dead code | `AdminRoleGuard` only checks "has an Admin row," never `role`; the ABAC-shaped `Permission` table has zero application references anywhere. | P2 |
| PM-GAP-003 | KYC verification workflow | Missing (schema-only) | No submission endpoint, no review/approval endpoint, no gating of any provider action on KYC status. Only live "KYC" reference is an unrelated payable fee line item. | P2 |
| PM-GAP-004 | External / off-platform customer onboarding | Missing | No code path for a provider to create a `Customer` on someone else's behalf; registration always requires self-service password creation. Business brief explicitly defers the UX decision — see [open decision](open-decisions.md#external-customer-onboarding). | P1 — product decision required |
| PM-GAP-005 | Users-schema `Subscription`/`SubscriptionPlan`/`Featured` | Dead code | Structurally duplicates the live `payments`-schema models; zero application code touches the users-schema versions. Recommend deletion once confirmed unused elsewhere. | P3 |
| PM-GAP-006 | Listing `serviceProviderId` existence validation | Missing | No RMQ call to the users service validates a listing's `serviceProviderId` is a real, active provider — neither at creation nor update. Distinct from GAP-006's *authorization* gap (this is *referential validity*). | P1 |
| PM-GAP-007 | Staff-to-provider action scoping | Ambiguous | `Staff.serviceProviderId` exists; no guard/check found (in the users-domain audit's scope) restricting a Staff user's actions to their own provider's resources across booking/catalog domains. Needs a targeted follow-up check before being finalized as Missing. | P2 |

## Service Catalog — Event Centers & Catering

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-008 | Service category extensibility / unified Service abstraction | Missing | No shared Service model; `ServiceType`-equivalent hardcoded independently in ≥5 places (`booking`, `payments`, `notifications`, `users` [inconsistently named `EVENTCENTERS`], `libs/contracts`). Adding a 3rd category requires a new microservice + edits across ~21 files. See [ADR candidate](open-decisions.md#service-category-extensibility). | P1 — architecture/product decision |
| PM-GAP-009 | "Requires quote" vs. "directly bookable" listing flag | Missing | No field on `EventCenter` distinguishes a listing that can always be directly booked from one that needs a quote for custom terms — the distinction exists today only implicitly, via caller-identity branching in the booking controller. | P2 |
| PM-GAP-010 | Structured dynamic quote-request data (guests, dietary, allergies, drinks, staffing, equipment) | Missing | Absent from `RequestQuote` entirely (only `budget`/`customerNotes` free text); partially present but still thin in post-booking `CateringBooking` (`specialRequirements` enum has only 2 values, neither diet-related). This is the single most important gap for "catering is always quote-based, driven by dynamic structured requirements." | P1 |
| PM-GAP-011 | Cancellation-policy model | Broken / product decision required | `RefundPolicy`/`RefundPolicyTier` is arbitrary, provider-defined, duplicated identically across 2 schemas, and unreachable (GAP-008). Contradicts the business model's stated preference for platform-fixed presets (Flexible/Moderate/Strict). A third, disconnected free-text `cancellationPolicy` field is what's actually live. See [open decision](open-decisions.md#cancellation-policy-model). | P1 — product decision required |
| PM-GAP-012 | Service lifecycle (draft/publish workflow) | Partial | `ServiceStatus` is binary `ACTIVE`/`INACTIVE` only; no draft state, no server-driven publish step — a listing goes live the instant `create` succeeds. | P2 |
| PM-GAP-013 | Dead `BookingStatus`/`PaymentStatus` enums in `eventcenters` schema | Dead code | Copy-paste leftovers, zero usage confirmed by grep. | P3 |

## Booking, Slots & Quotes

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-014 | `confirmedTimeSlots` relation (requested vs. confirmed slot split) | Dead code | Schema models a two-stage "requested → provider confirms which slots" flow; no code path anywhere ever populates it. | P2 |
| PM-GAP-015 | `confirm()`/`cancel()` write `Booking.status` | Broken (would remain broken even if GAP-011 is fixed) | Neither method writes `status` at all — `confirm()` only sets timestamps; `cancel()` releases slots but never sets `CANCELED`. Reconnecting the RMQ patterns (GAP-011) is necessary but not sufficient. | **P0** |
| PM-GAP-016 | `COMPLETED` (or equivalent terminal) booking status | Missing | `BookingStatus` enum has no value representing "service was rendered." Blocks correct review-eligibility enforcement platform-wide (joint with `PM-GAP-035`) and any future "service completion" business logic. | **P0** |
| PM-GAP-017 | Cancellation-policy evaluation & refund computation in the booking domain | Missing | `cancel()` releases time slots correctly but has zero refund calculation, zero call to the payments service, zero reference to any refund policy, zero wallet/commission reversal, zero notification. | **P0** |
| PM-GAP-018 | Single source of truth for `BookingStatus` | Broken | Two independently-defined `BookingStatus` enums (`booking` schema, live; `eventcenters` schema, dead) with different values — a status added to one won't exist in the other. | P2 |
| PM-GAP-019 | Provider-initiated booking for an off-platform-acquired customer | Missing | `BookingSource` enum (`WEB`/`MOBILE`) is a client-platform indicator only, unrelated to this. `CreateBookingDto.customerId` mandates a pre-existing platform `User`. Joint with `PM-GAP-004`. | P1 — product decision required |
| PM-GAP-020 | Additional/second invoice generation | Partial | **Corrects an initial cross-fork assumption**: `InvoiceService.createSecondInvoice()` is real and reachable (`POST /invoice/create-invoice`) — but nothing on the booking side automatically triggers it on a requirement change, and the new amount is unvalidated (`// TODO: validate` in source). | P2 |

## Payments, Invoices, Wallet, Escrow, Commission, Refunds, Disputes, Withdrawals

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-021 | Invoice immutability after payment | **Broken** | `PATCH /invoice/:id` has zero check of invoice status or existing payments — a `PAID`/`PARTIALLY_PAID` invoice's `amountDue`/`items` can be silently rewritten. Directly contradicts the business model's core financial-integrity requirement. | **P0** |
| PM-GAP-022 | Paid-invoice delete/replace protection | Broken (real bug, not just missing) | `status: PAID \|\| PARTIALLY_PAID` is a JS `\|\|` between two truthy strings — always evaluates to `PAID`. `PARTIALLY_PAID` invoices are unprotected from deletion/replacement despite the code's evident intent. | P1 |
| PM-GAP-023 | Platform commission calculation | Broken / product decision required | Single global **flat fee** (not %, not category-aware); `AppSettings.serviceCharge` exists but is never read — the invoice-creating caller supplies `serviceChargeAmount` directly, self-checked for internal consistency only. No single source of truth for "what the platform charges." | P1 — product decision required |
| PM-GAP-024 | Invoice service-charge line-item lookup | Broken (unguarded) | `invoice.items.find(item => item.item === "service charge").amount` has no null guard — throws a raw `TypeError` (inside a `$transaction`, so it aborts safely, but as an unhandled 500) if the line item is ever absent. | P2 |
| PM-GAP-025 | Escrow release | **Missing — no path exists at all** | `WalletService.releaseEscrow()` is 100% commented out; no cron, scheduler, or admin endpoint anywhere moves money out of `ESCROW_HOLD`. If `HOLD_PAYMENT_IN_ESCROW_WALLET=true` is ever set, provider earnings are captured permanently with zero payout path. | **P0** |
| PM-GAP-026 | Ledger reason-code accuracy in non-escrow mode | Broken (labeling only) | Direct provider credits (escrow disabled) are recorded with reason `ESCROW_RELEASE` despite no `ESCROW_HOLD` ever occurring — confusing for reconciliation. | P3 |
| PM-GAP-027 | Held vs. available wallet balance | Missing (architectural risk) | `Wallet.balance` is a single field. Currently "works" only because escrow-held funds land on the *platform* wallet, not the provider's own — incidental, not designed. Must be resolved before/alongside fixing PM-GAP-025, or a naive escrow-release fix could reintroduce a double-count risk. | P1 |
| PM-GAP-028 | Withdrawals | Missing (dormant, unreachable — cites GAP-014) | Dormant `WithdrawalService` logic is sound in isolation (correct balance check, correct failure-reversal), but depends on PM-GAP-027 being resolved first to be safe once reconnected. | **P0** if in scope for launch |
| PM-GAP-029 | Refund commission reversal | Product decision required | Dormant `RefundService.processRefund()` correctly reverses the principal payment but never reverses the platform's `SERVICE_CHARGE` credit — an accounting asymmetry with no documented intent either way. | P1 — product decision required |
| PM-GAP-030 | Webhook idempotency (effect application, not just row dedup) | **Broken — confirmed double-credit bug** | `Payment`-row dedup is correct and doesn't throw; but the caller (`processServiceRequest`/`processSubscription`) never checks for the `null` "duplicate" return before continuing to apply the invoice-payment distribution. A replayed webhook double-debits the customer and double-credits the platform + provider. Distinct from and more severe than GAP-013 (which is about authenticity, not idempotency of a legitimate retry). | **P0** |
| PM-GAP-031 | Central platform-policy configuration (commission rate, escrow toggle, cancellation presets) | Missing | `AppSettings` has none of these fields; each is individually missing a single source of truth (joint with PM-GAP-011, PM-GAP-023). | P1 — product decision required |
| PM-GAP-032 | Relational invoice line items | Missing | `Invoice.items` is untyped `Json[]` — no referential integrity, no per-item audit trail, is the root enabler of PM-GAP-021/022/024. | P2 |
| PM-GAP-033 | General-purpose dispute/complaint system | Partial (existing foundation, narrow scope) | `Dispute` is real and fully wired, but scoped only to refund-decline appeals, and `resolve()` cannot move money (depends on dead RefundService). Not "missing" — a real foundation for the Phase 2 dispute system the business model defers. | P1 (to make functional); general dispute system explicitly Phase 2 |

## Reviews, Notifications & Messaging

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-034 | Messaging / conversation system (Customer↔Provider↔Platform) | **Missing — zero footprint anywhere** | No model, service, RMQ pattern, or realtime dependency in any of the 8 apps or 2 shared libs. Hard blocker for the Request-Quote negotiation pathway. From-scratch feature design, not a reconnection job. | **P0** — foundational |
| PM-GAP-035 | Booking-completion-based review eligibility | Broken (would remain broken even after GAP-015 is fixed) | Dormant `ReviewService.create()` checks `booking.status === 'CONFIRMED'` — but no `COMPLETED` state exists (joint with PM-GAP-016). Reconnecting Reviews alone would let customers review before the service was rendered. | **P0** |
| PM-GAP-036 | Review eligibility error handling | Broken (bug in dormant code) | The `ForbiddenException` thrown for an ineligible review is caught by the method's own broad `catch` and surfaces as a generic 500. | P2 |
| PM-GAP-037 | Duplicate-review prevention | Missing | No unique constraint or pre-check on `[userId, bookingId]` — reconnecting Reviews as-is allows unlimited reviews per booking. | P1 |
| PM-GAP-038 | Platform review system | **Missing** | No model, field, or distinct concept anywhere — only the (unreachable) provider/service review exists. | P1 |
| PM-GAP-039 | Notification delivery history / audit trail | Missing | `Notification` table exists; the only live code path never writes to it. | P1 |
| PM-GAP-040 | In-app / SMS notification delivery | Missing | Declared in the transport interface; zero implementation for either channel. | P2 |
| PM-GAP-041 | Informal support / customer-care concern channel | Missing | No ticket/complaint/customer-care record type exists anywhere — even the informal channel the business model expects (distinct from the Phase-2-deferred formal dispute system). | P2 |
| PM-GAP-042 | Rating aggregation | Missing (dead field) | `EventCenter.rating`/`Catering.rating` exist, indexed, but nothing computes or writes to them from `Review` data. | P2 |

## Management & Cross-Cutting

| ID | Capability | Current State | Gap | Priority |
|---|---|---|---|---|
| PM-GAP-043 | Cross-service ID referential validation | Missing | Confirmed on 3 concrete cases (`Booking.customerId`, `Booking.serviceProvider`/`serviceId`, `TimeSlot.serviceId`): zero runtime existence check against the owning service, fully trusted client input. | P1 |

---

## P0 summary (production blockers, this audit — in addition to GAP-001/002/010/011/013/016 already tracked)

1. `PM-GAP-001` — Admin approval dead-end (compounds GAP-016)
2. `PM-GAP-015` — `confirm()`/`cancel()` never update `Booking.status`
3. `PM-GAP-016` — No `COMPLETED` booking status (blocks review eligibility platform-wide)
4. `PM-GAP-017` — No cancellation-policy/refund logic in the booking domain
5. `PM-GAP-021` — Paid invoices are mutable
6. `PM-GAP-025` — Escrow release does not exist
7. `PM-GAP-028` — Withdrawals unreachable (if in launch scope)
8. `PM-GAP-030` — Webhook replay double-applies payment distribution
9. `PM-GAP-034` — No messaging system (foundational, blocks the quote-negotiation pathway)
10. `PM-GAP-035` — Review eligibility would remain incorrect even after reconnection

See [`production-roadmap.md`](production-roadmap.md) for how these are sequenced against each other and against the existing GAP-001..017 list.
