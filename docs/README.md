# BanquetPro API — Engineering Documentation

This is the engineering blueprint for taking BanquetPro's backend to production: what the system is supposed to do, what it actually does today, where the two diverge, and what to build next. It is written for whoever owns completing this backend, not as a tour of the code.

**Relationship to the existing root-level docs** (`../DOCUMENTATION.md`, `../KNOWN_GAPS.md`, `../TECHNICAL_DEBT.md`): those were produced 2026-09-06 by a first-pass architecture/security audit and remain accurate — this tree cites their `GAP-001`..`GAP-017` findings by ID rather than restating them, and layers a business-model-driven analysis on top (this audit, 2026-09-07). Read the root docs for deep architecture/auth-bug detail; read this tree for how the codebase maps to the actual product the business needs.

---

## Start here

1. [`product/business-model.md`](product/business-model.md) — the canonical product model this backend is measured against.
2. [`domain/overview.md`](domain/overview.md) — what actually exists in the code, domain by domain, with evidence.
3. [`planning/backend-gaps.md`](planning/backend-gaps.md) — the full gap matrix: every capability classified Implemented / Partial / Broken / Missing / Dead code / Product-decision-required.
4. [`planning/production-roadmap.md`](planning/production-roadmap.md) — what to build, in dependency order.
5. [`planning/open-decisions.md`](planning/open-decisions.md) — product/architecture questions that need an answer before certain work can start.
6. [`planning/implementation-tracker.md`](planning/implementation-tracker.md) — the working execution checklist for the build phase; check items off here as they land.

---

## Executive summary

**What this backend is**: a NestJS microservices monorepo (`apps/apigateway` + 7 backing microservices, each with its own Postgres database, communicating over RabbitMQ) implementing a two-sided event-services marketplace: providers list event centers and/or catering services, customers book them directly or via a quote-negotiation pathway, pay through the platform (which takes a commission and can hold funds in escrow), and — once a service is rendered — leave reviews. See [`architecture` in the root `DOCUMENTATION.md`](../DOCUMENTATION.md#4-application-architecture) for the full container diagram.

**Major domains**: Users/Auth, Service Catalog (Event Centers + Catering), Booking/Slots/Quotes, Payments/Invoices/Wallet/Escrow, Reviews/Notifications, Management (platform config + reference data). Full inventory: [`domain/overview.md`](domain/overview.md).

**What's already solid**:
- Booking-percentage (deposit) enforcement is real and server-validated — a client cannot pay less than the provider's configured deposit.
- Partial-payment tracking (`PARTIALLY_PAID`/`OVER_PAID`) is genuinely reachable and computed correctly against a running ledger, not a stored counter.
- A "second invoice for a booking" capability exists and works (`POST /invoice/create-invoice`), contrary to what a schema-only read would suggest.
- The `WalletTransaction` ledger design (append-only, `balanceBefore`/`balanceAfter`, typed reasons) is sound and a good foundation to build on.
- `Booking.status` and `Booking.paymentStatus` are genuinely separate columns, correctly decoupled in the one code path (`updatePayment()`) that's fully wired up — the business model's core "payment ≠ booking status" rule is implemented correctly where it matters most.
- Multi-slot booking (one booking spanning several time slots) works.
- Catering is correctly, server-side, blocked from customer-initiated direct booking — the "catering is always quote-based" rule is enforced, not just documented.
- A `Dispute` system exists, fully wired end-to-end, scoped to refund-decline appeals — a real foundation for the Phase 2 dispute system the business model defers, not a blank slate.

**What's partially implemented**: service listings (no draft/publish workflow, binary active/inactive only); cancellation (slot release works, but zero refund/policy logic); notifications (email works, in-app/SMS are stubs, payment-failed/subscription-expired silently drop); subscriptions (the entitlement/visibility logic is correct, but the `users`-schema models duplicating it are dead code that should be removed).

**What's completely missing**:
- A messaging/negotiation system of any kind — zero footprint anywhere in the repo. Blocks the quote-negotiation pathway the business model describes.
- A `COMPLETED` booking status — blocks correct review eligibility and any "service was rendered" logic.
- A central platform-policy configuration mechanism (commission rate, escrow toggle, cancellation-policy presets) — `AppSettings` exists but none of these are wired to it.
- A unified Service abstraction — event centers and catering are fully independent, and the category tag is hardcoded in 5 places, one inconsistently.
- Structured dynamic quote-request data (guest count, dietary/allergy/drinks/staffing/equipment) — the backend cannot represent the core catering business requirement as queryable data today.
- Escrow release — 100% dead code, no scheduler exists anywhere in the payments app.
- A platform review system (distinct from provider/service reviews).
- External/off-platform customer onboarding.

**What's broken** (exists, doesn't work as intended): paid invoices are mutable with no guard; a replayed payment webhook double-applies its wallet/invoice effects; `confirm()`/`cancel()` on a booking never actually update `Booking.status` even if reconnected; dormant Review eligibility logic checks the wrong booking status (one that doesn't gate on completion); admin accounts have no path out of their "pending approval" state except the same unguarded endpoint that's already the most severe security gap in the repo.

**What's technically risky**: the database-per-microservice architecture has zero cross-service referential validation confirmed on every case traced (customer IDs, provider IDs, service IDs all fully trusted client input); 5 independently-defined `ServiceType`-equivalent enums with one naming mismatch; near-zero real test coverage on every highest-stakes area (auth guards, booking creation, payment webhook — confirmed by direct inspection, not just file-count).

**What's financially risky**: escrow funds with no release path if escrow mode is ever enabled (this is the single highest-severity finding in the audit); webhook replay double-crediting; mutable paid invoices; a flat, non-server-computed commission with no single source of truth; refunds that never reverse the platform's commission, with no documented reasoning either way.

**Architectural decisions needed before certain work can start**: see [`planning/open-decisions.md`](planning/open-decisions.md) in full — the highest-leverage ones are the Service-category-extensibility model, the commission model, the cancellation-policy model, and the escrow-release trigger.

**Recommended implementation order**: see [`planning/production-roadmap.md`](planning/production-roadmap.md) — in short: identity/trust-boundary fixes first (Phase 0), then a correct booking state machine including a `COMPLETED` status (Phase 1, unblocks reviews and completion-driven logic), quote/catalog data model in parallel (Phase 2), financial-core hardening (Phase 3, must precede cancellation/refunds), cancellation & refunds (Phase 4), reviews (Phase 5), messaging as a greenfield build (Phase 6, benefits from Phase 2's data model existing first), then notification/support cleanup, and external-customer support last (blocked on a product decision, not engineering readiness).

**What can wait past initial production**: full unified Service abstraction (decide the ADR now, defer the refactor), fine-grained admin permissions, KYC workflow, platform reviews, SMS/in-app notification channels, and a general-purpose dispute system beyond the existing refund-appeal scope (explicitly Phase 2/MVP 2 per the business model).

---

## Documentation framework

This is the standard structure for this project's engineering documentation going forward — extend it in place rather than starting new ad-hoc docs elsewhere. Status markers: ✅ populated (Phase A, this audit) · 🚧 stub/planned (Phase B) · — not yet started.

```text
docs/
  README.md                          ✅ this file
  product/
    overview.md                      ✅ what the platform is, at a glance
    business-model.md                ✅ canonical product model (source of truth)
    actors-and-roles.md              ✅ Customer / Provider / Staff / Admin / Platform
    terminology.md                   —
    core-user-journeys.md            —  (step-by-step flows: direct booking, quote negotiation, cancellation, etc.)
    business-rules.md                —  (extracted, atomic rules with rule IDs — currently folded into business-model.md)
  domain/
    overview.md                      ✅ full entity inventory, all 7 services, evidence-based
    service.md, booking.md,
    quotes.md, invoices.md,
    payments.md, wallets.md,
    escrow.md, commissions.md,
    refunds.md, subscriptions.md,
    reviews.md, messaging.md,
    notifications.md                 —  (Phase B: split overview.md into focused per-concept docs as each gets a feature design)
  architecture/
    overview.md, system-context.md,
    module-architecture.md, etc.     —  (Phase B — see ../DOCUMENTATION.md §3-4 for the current architecture writeup in the interim)
    decision-records/                —  (ADRs — see open-decisions.md for candidates not yet formalized as ADRs)
  api/                                —  (Phase B — public API contract inventory beyond Swagger)
  data/
    data-model.md                    ✅ ER map, cross-service references, schema duplications
    database-conventions.md,
    migrations.md,
    financial-data-model.md          —
  features/
    implemented/, partial/,
    missing/, designs/               —  (Phase B — one feature-design doc per PM-GAP that needs a from-scratch build, per Part 16 of the audit brief)
  operations/                        —  (Phase B — see ../DOCUMENTATION.md §8-11 in the interim)
  security/                          —  (Phase B — see ../DOCUMENTATION.md §5 and ../TECHNICAL_DEBT.md in the interim)
  quality/
    testing-strategy.md,
    technical-debt.md,
    known-bugs.md                    —  (Phase B — see ../TECHNICAL_DEBT.md in the interim; this audit's bug-shaped findings are folded into planning/backend-gaps.md for now)
  planning/
    backend-gaps.md                  ✅ the master gap matrix (GAP-* + PM-GAP-*)
    production-roadmap.md            ✅ dependency-ordered build plan
    open-decisions.md                ✅ product/architecture questions needing an answer
    implementation-tracker.md        ✅ step-by-step execution checklist, checked off as work lands
```

**Phase B** (next pass, on request): split `domain/overview.md` into the per-concept files above as each area gets deeper attention; write ADRs for the decisions in `open-decisions.md` that get resolved; write feature-design documents (problem/actors/entities/state-machine/API/DB/auth/events/edge-cases/testing/migration/open-questions/sequence) for the from-scratch items — messaging, platform reviews, structured quote data, and the Service-abstraction migration if that path is chosen; migrate the architecture/operations/security detail currently living in the root `DOCUMENTATION.md`/`TECHNICAL_DEBT.md` into this tree's `architecture/`, `operations/`, and `security/` sections.
