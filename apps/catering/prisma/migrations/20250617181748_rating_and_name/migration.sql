/*
  Warnings:

  - You are about to drop the column `country` on the `Catering` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Catering` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Catering_serviceProviderId_startPrice_city_state_country_st_idx";

-- AlterTable
ALTER TABLE "Catering" DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "eventTypes" TEXT[],
ADD COLUMN     "name" TEXT,
ADD COLUMN     "rating" DECIMAL(65,30);

-- CreateIndex
CREATE INDEX "Catering_serviceProviderId_idx" ON "Catering"("serviceProviderId");

-- CreateIndex
CREATE INDEX "Catering_status_idx" ON "Catering"("status");

-- CreateIndex
CREATE INDEX "Catering_name_idx" ON "Catering"("name");

-- CreateIndex
CREATE INDEX "Catering_rating_idx" ON "Catering"("rating");

-- CreateIndex
CREATE INDEX "Catering_location_idx" ON "Catering"("location");

-- CreateIndex
CREATE INDEX "Catering_cuisine_idx" ON "Catering"("cuisine");

-- CreateIndex
CREATE INDEX "Catering_startPrice_idx" ON "Catering"("startPrice");
