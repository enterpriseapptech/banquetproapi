# Actors & Roles

Evidence source: `apps/users/prisma/schema.prisma`, `apps/apigateway/src/jwt/**`. Fork audit: users/auth domain, 2026-09-07.

## Implemented actor types

`UserType` enum (`apps/users/prisma/schema.prisma`): `ADMIN`, `SERVICE_PROVIDER`, `CUSTOMER`, `STAFF`. Each `User` row gets exactly one 1:1 satellite row (`Admin`/`ServiceProvider`/`Customer`/`Staff`, keyed on the same id).

| Actor | Satellite table | Notes |
|---|---|---|
| Customer | `Customer` | Self-registers, pays for bookings, requests quotes, (eventually) reviews. |
| Service Provider | `ServiceProvider` | Owns Services in the **eventcenters**/**catering** microservices (separate databases — linked only by a plain `serviceProviderId` string, no DB-level FK). `serviceType: ServiceType` (`EVENTCENTERS`/`CATERING`/`ALL`) is a self-declared category tag, not enforced against what they actually list. |
| Staff | `Staff` | `serviceProviderId` links staff to one provider. **No code path found that scopes a Staff user's actions to their own provider's resources** — flagged `AMBIGUOUS`, not confirmed either way; see [`PM-GAP-004`](../planning/backend-gaps.md). |
| Admin | `Admin` | Sub-classified by `AdminRole` (`SUPERADMIN`/`ADMIN`/`CUSTOMERSERVICE`) — **decorative only today**. `AdminRoleGuard` checks only "has an Admin row," never `role`; the purpose-built `Permission` (ABAC-shaped: role/action/resource/condition) table has **zero application-code references anywhere in the repo** — dead code. See [`PM-GAP-003`](../planning/backend-gaps.md). |
| Platform | *(implicit)* | Not a `User` row — the platform is the payments-domain `Wallet` row with `type: PLATFORM` (`userId: null`) and the implicit counterparty in every commission/escrow transaction. See [`../domain/overview.md`](../domain/overview.md#payments--wallet--escrow). |

## Admin account lifecycle — a real dead end

New `ADMIN` accounts are created with `status: RESTRICTED` ("pending approval" per the code comment), and `login()` correctly refuses `RESTRICTED` accounts. **No code path anywhere in the repository ever transitions a user from `RESTRICTED` back to `ACTIVE`.** The only endpoint capable of writing `status` is the generic `PATCH /users/:id` — which, per `KNOWN_GAPS.md` GAP-016, has no guard and no ownership check at all. In other words, the admin-approval control's *only* activation mechanism today is the single most severe open vulnerability in the codebase. This is documented as [`PM-GAP-001`](../planning/backend-gaps.md) and should be read alongside GAP-016, not as a separate, lesser issue — fixing GAP-016 without also adding a real RESTRICTED→ACTIVE admin-approval transition leaves new admin accounts permanently unusable.

## Authorization model as implemented today

Enforcement is guard-based (`JwtAuthGuard`, `VerificationGuard`, `AccountStatusGuard`, `AdminRoleGuard`) stacked per-route, plus ad-hoc in-handler `user.userType !== 'ADMIN'` checks applied inconsistently. The guard chain itself has severe, already-tracked defects (`KNOWN_GAPS.md` GAP-001/GAP-002) that this audit re-confirmed still hold (see `fork-mgmt-arch` verification table, folded into [`../planning/backend-gaps.md`](../planning/backend-gaps.md)). There is exactly **one enforced permission level** in practice today: authenticated-and-has-an-Admin-row, or not. Everything finer-grained (`AdminRole`, `Permission`, staff-to-provider scoping) is unenforced.

## Provider ↔ Service linkage

A `ServiceProvider` does not "contain" its Services in any database sense — `EventCenter.serviceProviderId` / `Catering.serviceProviderId` are bare strings pointing into the `users` service's database, validated at **no point** (not at listing creation, not at update) against the users service. This is architecturally expected for a database-per-microservice design, but the complete absence of any existence/validity check is a data-integrity gap, tracked in [`../planning/backend-gaps.md`](../planning/backend-gaps.md) (`PM-GAP-006`, cross-referenced with `GAP-006`'s authorization gap, which is a distinct concern — ownership vs. existence).
