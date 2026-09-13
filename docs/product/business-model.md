# Business Model

**Status**: Product source of truth, as supplied by the product/engineering owner on 2026-09-07 and cross-checked against the codebase during the Phase A audit. Where the current backend diverges from a rule below, the rule is stated as-intended here and the divergence is tracked in [`../planning/backend-gaps.md`](../planning/backend-gaps.md) — this document is not a description of what the code does, it is the standard the code is measured against. See [`../domain/overview.md`](../domain/overview.md) for what actually exists today.

---

## 1. What the platform is

BanquetPro is a **two-sided service marketplace and service-management/payment platform**, not just a listings site. It simultaneously functions as:

1. Service marketplace (discovery)
2. Service catalog (per-provider offerings)
3. Booking system
4. Quote/request system
5. Negotiation/messaging system
6. Invoice system
7. Payment system
8. Provider wallet system
9. Escrow/release system
10. Provider subscription/visibility system
11. Review system (two distinct kinds)
12. Customer/provider communication system
13. Provider business-management tool (including for customers acquired off-platform)

The two primary sides are **Service Providers** and **Customers**; the **Platform** itself is a third actor — it is the payment/escrow/commission counterparty, not a passive intermediary.

## 2. Service model

A provider creates one or more **Services**. A Service is independently trackable, bookable, configurable, reviewable, and associated with its own bookings — a provider offering both an event center and catering runs two independent Services, not one listing with two modes.

The platform is **category-open by design intent**: event centers and catering are the first two categories, but the model must not hard-code an assumption that only these two exist. *(Current backend status: this is the single largest architectural gap found in the audit — see [ADR candidate: Service category extensibility](../planning/open-decisions.md#service-category-extensibility) and [`PM-GAP-020`](../planning/backend-gaps.md).)*

A Service carries, in general: name, description, category, pricing, booking percentage, cancellation policy, availability/slots, category-specific configuration, requirements, and optional add-on items.

### Event centers
- Fixed price, defined capacity, available time slots.
- **Directly bookable** when sufficiently defined and the customer's request has no varying/custom terms.
- **Falls into the quote pathway** when the customer needs additional allowances, modifications, or anything that affects price.

### Catering
- **Always quote-based.** Requirements are inherently dynamic: guest count, menu arrangement, dietary requirements, allergies, special food requirements, drinks, staffing, equipment, event details/date/time, venue/context, and other custom requirements needed to produce an accurate quote.
- Must never be modeled as a simple fixed-price product.

## 3. Booking pathway 1 — Direct booking

```text
Customer selects service → selects slot(s) → provides booking info → creates booking
  → receives invoice/payment obligation → pays required amount
  → booking becomes PAID / PARTIALLY_PAID (payment status)
  → provider explicitly confirms → booking becomes CONFIRMED (booking status)
  → service is eventually completed
  → customer becomes eligible to review / report issues
```

**Payment status and booking status are two separate dimensions and must never be collapsed into one.** A customer can be `PAID` while the booking is still `AWAITING_PROVIDER_CONFIRMATION` — that is a valid, expected state, not a bug.

## 4. Booking pathway 2 — Request quote

A quote request targets **one specific provider's one specific service** — never an app-wide broadcast.

```text
Customer requests a quote for Provider A's Catering service, providing full requirement detail
  → Provider reviews the request
  → Provider creates a booking + invoice
  → Customer either:
       (a) pays the invoice, or
       (b) negotiates via in-app messaging — requirements/items/pricing may change,
           producing additional charges / a new invoice
  → once commercial agreement is reached: customer pays, provider confirms
```

## 5. Slots / availability

- Providers create their own availability slots. Every booking or quote request is associated with a slot.
- A customer may book more than one slot in a single booking.
- The system must handle: slot ownership, slot lifecycle, concurrency/race conditions on claiming a slot, conflicting bookings, and cancellation-triggered slot release.
- Availability is **not** a boolean on the service — it is a first-class, per-interval resource with its own lifecycle.

## 6. Booking percentage / payment

Each provider sets a **booking percentage** per service (a deposit rate). Examples:

- Price ₦1,000,000, booking percentage 30% → customer pays ₦300,000 upfront, ₦700,000 remains outstanding.
- Price ₦1,000,000, booking percentage 100% → customer pays the full ₦1,000,000 upfront.

The payment model must support: 100% upfront, partial/booking payment, tracked remaining balance, additional charges arising after the fact, and multiple invoices per booking where necessary. A second invoice/payment is **not** always required — 100%-upfront services should never force a second invoice into existence.

## 7. Invoices

- A provider may modify an invoice **only while it is unpaid**. Once money has been paid against an invoice, that financial history must not be silently rewritten.
- Example: Invoice for ₦1,000,000 has ₦300,000 paid; the customer later needs 50 additional guests. The correct system behavior is to update the booking, record the additional requirement, and generate a **new/additional invoice for the difference** — not mutate the paid invoice's amount.
- Required capabilities: invoice status, invoice line items, partial-payment tracking, multiple invoices per booking, additional-charge invoices, payment allocation, immutable financial history once paid, and an audit trail.

## 8. Payments / commission / escrow / wallet

```text
Customer Payment
      │
      ▼
   Platform
      ├── Platform Commission
      ▼
 Provider Net Amount
      ├── Immediate Wallet Credit   (platform-configured mode)
      OR
      └── Escrow / Held Balance → Released per platform rules   (platform-configured mode)
```

- The platform takes its commission before crediting/releasing the provider's net balance.
- A platform-level (environment/config) toggle controls whether provider funds are credited to the wallet immediately or held in escrow.
- A provider may withdraw funds **only once they are actually credited/available** — escrowed/held funds are not withdrawable until released.

This is a financial system: correctness, consistency, idempotency, and auditability are non-negotiable priorities — wallet balances, held vs. available balance, provider ledgers, transactions, commission, fees, refunds (full/partial), withdrawals, wallet credits/debits, reconciliation, transaction idempotency, webhook handling, payment-status synchronization, double-credit prevention, and negative-balance prevention are all in scope.

## 9. Booking status vs. payment status

Two independent dimensions. Neither implies the other.

- **Payment status** (example set): unpaid, partially paid, paid, refunded, partially refunded, failed, pending.
- **Booking status** (example set): pending, awaiting provider confirmation, confirmed, completed, cancelled, rejected.

`payment: PAID` + `booking: AWAITING_PROVIDER_CONFIRMATION` is a valid, normal state.

## 10. Provider confirmation

A booking is never considered confirmed merely because the customer paid — the provider must explicitly confirm it.

```text
Customer pays → Paid booking → Provider confirms → Confirmed booking
```

If the provider rejects or cancels a booking after payment, the customer is refunded. This requires: an explicit confirmation action, rejection/cancellation handling, refund initiation and completion, slot release, wallet reversal, commission reversal, and notifications — as one coordinated flow, not independent, disconnected steps.

## 11. Cancellation

- Cancellation policies should be **platform-controlled, predefined presets** (e.g. Flexible / Moderate / Strict) rather than arbitrary provider-authored formulas.
- Example rule shape: 30+ days before the event → full refund; 10–29 days → partial refund; etc. The exact thresholds are platform-controlled.
- **Customer cancellation**: evaluate the applicable policy, compute the refund accordingly.
- **Provider cancellation**: always results in a full refund to the customer.
- Every cancellation must, together: transition booking status correctly, compute and process the refund, reverse wallet/escrow holds, reverse commission (or deliberately decide not to — see [open decision](../planning/open-decisions.md#commission-reversal-on-refund)), release the slot, and record an audit trail.

## 12. Service completion, support, and disputes

- After a service is rendered, the booking becomes **completed** — this is the gate that unlocks review rights.
- Customers may contact customer care or raise a concern through the platform without that automatically creating a **formal dispute**. Support/complaint conversation, refund request, formal dispute, and review are four distinct concepts that must not be conflated.
- **A formal, general-purpose dispute system is explicitly out of scope for this phase** — document what exists today (if anything) and treat a full dispute system as a Phase 2 / MVP 2 item; do not build one now.

## 13. Reviews — two separate systems

1. **Service/provider review** — tied to a specific completed booking. Must be traceable to: who reviewed, which booking, which service, which provider, when the service was rendered, and whether the customer was actually eligible (i.e. had a genuinely completed booking for that service/provider). A customer may accumulate many reviews over time, one per completed booking — not an unverified, free-floating customer↔provider relationship.
2. **Platform review** — the customer reviews the platform itself. This is a separate system from (1) and must never be conflated with it.

## 14. Messaging

Supports: Customer ↔ Provider, Provider ↔ Platform, Customer ↔ Platform. Used for: quote requests/negotiation, bookings, support/customer-care, and general platform communication. Conversations should be linkable to the entities they concern — users, providers, services, quote requests, bookings, invoices, support cases.

## 15. Provider subscriptions

Subscription is **not** mandatory to use the platform — a provider can fully operate without one. Subscription provides **marketplace visibility/placement entitlements** (e.g. homepage visibility, featured placement, top listings, improved search ranking), not baseline functionality.

When a subscription expires: the provider remains active, services remain available, existing bookings remain valid, and no core functionality is lost — only the visibility/featured entitlements are disabled. Subscription is an **entitlement system**, not an operating requirement.

## 16. External / off-platform customers

A provider may acquire customers outside the marketplace (e.g. via Instagram) and still use the platform to manage that customer, create a booking, create and send an invoice, and receive payment through the platform.

**The exact onboarding/payment-link UX for this journey is an explicit open product decision — do not invent it.** See [`open-decisions.md`](../planning/open-decisions.md#external-customer-onboarding).
