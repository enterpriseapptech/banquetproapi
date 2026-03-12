/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Fees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,amount]` on the table `Fees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plan]` on the table `SubscriptionPlans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plan,amount]` on the table `SubscriptionPlans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[amount,timeFrame]` on the table `SubscriptionPlans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('EVENTCENTER', 'CATERING');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "serviceId" TEXT,
ADD COLUMN     "serviceType" "ServiceType",
ADD COLUMN     "subscriptionPlanId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Fees_name_key" ON "Fees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fees_name_amount_key" ON "Fees"("name", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlans_plan_key" ON "SubscriptionPlans"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlans_plan_amount_key" ON "SubscriptionPlans"("plan", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlans_amount_timeFrame_key" ON "SubscriptionPlans"("amount", "timeFrame");
