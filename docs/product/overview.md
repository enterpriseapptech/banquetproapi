# Product Overview

BanquetPro is a two-sided marketplace connecting **service providers** (currently: event-center owners and caterers) with **customers** planning events, plus the payment/wallet/communication infrastructure that makes the platform the transaction counterparty rather than a passive listings board.

Full canonical product model: [`business-model.md`](business-model.md). Actor definitions: [`actors-and-roles.md`](actors-and-roles.md). Step-by-step flows: [`core-user-journeys.md`](core-user-journeys.md) *(Phase B)*.

## The two booking pathways, at a glance

| | Direct booking | Request quote |
|---|---|---|
| When | Service is fully defined, fixed price, no custom terms | Requirements are dynamic (always true for catering) or the customer needs custom terms |
| Scope | One specific service | One specific provider's one specific service (never app-wide) |
| Pricing | Computed server-side from listing price × booking percentage | Provider prices it manually after reviewing the request |
| Path to payment | Immediate — invoice generated at booking creation | After provider review, possibly after negotiation via messaging |

## Why this matters for implementation

Every domain in this backend exists to serve one of these two pathways to a paid, provider-confirmed, eventually-completed booking. When evaluating any feature (slots, invoices, wallet, reviews), ask: which pathway does this serve, and does it correctly keep **payment status** and **booking status** as independent dimensions (§9 of the business model)? Most of the severity-P0 findings in [`../planning/backend-gaps.md`](../planning/backend-gaps.md) trace back to a violation of that one rule, or to a missing state needed to enforce it (e.g. no `COMPLETED` booking status).

## Current implementation posture (one paragraph)

The backend correctly implements more of the financial core than a first read of the schema suggests — deposit-percentage enforcement, partial-payment tracking, and even multi-invoice generation are real and reachable. But several foundational pieces the product model depends on do not exist yet at all (a messaging system, a `COMPLETED` booking state, a platform-level commission/policy configuration mechanism, a unified Service abstraction), and several financial code paths that do exist have correctness defects serious enough to block production (escrow funds with no release path, a webhook replay that double-applies a payment). See the [executive summary in the docs README](../README.md#executive-summary) for the full picture.
