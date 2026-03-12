/*
  Warnings:

  - manually generated migration to copy existing data to new table with unique indexes, and then drop old table and rename new table to old table name. This is to avoid downtime and data loss.

*/

-- Drop existing indexes on subscriptionplans
DROP INDEX IF EXISTS "SubscriptionPlans_plan_key";
DROP INDEX IF EXISTS "SubscriptionPlans_plan_amount_key";
DROP INDEX IF EXISTS "SubscriptionPlans_amount_timeFrame_key";

-- Recreate compound unique indexes
CREATE UNIQUE INDEX "SubscriptionPlans_plan_amount_key"
ON "SubscriptionPlans" ("plan", "amount")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "SubscriptionPlans_amount_timeFrame_key" ON "SubscriptionPlans" ("amount", "timeFrame") WHERE "deletedAt" IS NULL;

-- Optional: if you still want plan alone unique for active rows
CREATE UNIQUE INDEX "SubscriptionPlans_plan_active_key" ON "SubscriptionPlans" ("plan") WHERE "deletedAt" IS NULL;