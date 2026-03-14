-- DropIndex
DROP INDEX "Subscriptions_serviceId_key";

-- DropIndex
DROP INDEX "Subscriptions_serviceProviderId_key";

-- CreateIndex
CREATE INDEX "Subscriptions_serviceId_idx" ON "Subscriptions"("serviceId");

-- CreateIndex
CREATE INDEX "Subscriptions_serviceProviderId_idx" ON "Subscriptions"("serviceProviderId");
