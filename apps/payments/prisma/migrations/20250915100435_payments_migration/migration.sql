-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('KYC', 'CERTIFICATION', 'FEATUREDPLANS', 'SUBSCRIPTIONPLANS');

-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'PARTIALLY_PAID';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "subscriptionId" TEXT,
ALTER COLUMN "bookingId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" "PaymentType" NOT NULL,
    "feesId" TEXT NOT NULL,
    "subscriptionplanId" TEXT NOT NULL,
    "featuredPlanId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Subscriptions_status_idx" ON "Subscriptions"("status");

-- CreateIndex
CREATE INDEX "Subscriptions_expiryDate_idx" ON "Subscriptions"("expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_serviceProviderId_feesId_key" ON "Subscriptions"("serviceProviderId", "feesId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_serviceProviderId_subscriptionplanId_key" ON "Subscriptions"("serviceProviderId", "subscriptionplanId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_serviceProviderId_featuredPlanId_key" ON "Subscriptions"("serviceProviderId", "featuredPlanId");

-- CreateIndex
CREATE INDEX "Invoice_userId_idx" ON "Invoice"("userId");

-- CreateIndex
CREATE INDEX "Invoice_bookingId_idx" ON "Invoice"("bookingId");

-- CreateIndex
CREATE INDEX "Invoice_subscriptionId_idx" ON "Invoice"("subscriptionId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_currency_idx" ON "Invoice"("currency");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_feesId_fkey" FOREIGN KEY ("feesId") REFERENCES "Fees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_subscriptionplanId_fkey" FOREIGN KEY ("subscriptionplanId") REFERENCES "SubscriptionPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_featuredPlanId_fkey" FOREIGN KEY ("featuredPlanId") REFERENCES "FeaturedPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
