/*
  Warnings:

  - You are about to drop the column `featuredPlanId` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `feesId` on the `Subscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceProviderId]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_featuredPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_feesId_fkey";

-- DropIndex
DROP INDEX "Subscriptions_serviceProviderId_featuredPlanId_key";

-- DropIndex
DROP INDEX "Subscriptions_serviceProviderId_feesId_key";

-- DropIndex
DROP INDEX "Subscriptions_serviceProviderId_subscriptionplanId_key";

-- AlterTable
ALTER TABLE "Subscriptions" DROP COLUMN "featuredPlanId",
DROP COLUMN "feesId";

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_serviceId_key" ON "Subscriptions"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_serviceProviderId_key" ON "Subscriptions"("serviceProviderId");
