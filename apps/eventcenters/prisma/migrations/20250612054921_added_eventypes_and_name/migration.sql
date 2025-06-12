/*
  Warnings:

  - You are about to drop the column `country` on the `EventCenter` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `EventCenter` table. All the data in the column will be lost.
  - Added the required column `location` to the `EventCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EventCenter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EventCenter_serviceProviderId_city_state_country_status_idx";

-- AlterTable
ALTER TABLE "EventCenter" DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "eventTypes" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER;

-- CreateIndex
CREATE INDEX "EventCenter_serviceProviderId_idx" ON "EventCenter"("serviceProviderId");

-- CreateIndex
CREATE INDEX "EventCenter_status_idx" ON "EventCenter"("status");

-- CreateIndex
CREATE INDEX "EventCenter_name_idx" ON "EventCenter"("name");

-- CreateIndex
CREATE INDEX "EventCenter_rating_idx" ON "EventCenter"("rating");

-- CreateIndex
CREATE INDEX "EventCenter_location_idx" ON "EventCenter"("location");

-- CreateIndex
CREATE INDEX "EventCenter_amenities_idx" ON "EventCenter"("amenities");

-- CreateIndex
CREATE INDEX "EventCenter_eventTypes_idx" ON "EventCenter"("eventTypes");
