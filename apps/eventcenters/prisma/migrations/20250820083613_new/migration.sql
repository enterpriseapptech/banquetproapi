-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Amenities" AS ENUM ('WIFI', 'PACKINGSPACE', 'SECURITY');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'CONFERENCE', 'SEMINAR', 'CONCERT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateTable
CREATE TABLE "EventCenter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventTypes" TEXT[],
    "serviceProviderId" TEXT NOT NULL,
    "discountPercentage" INTEGER,
    "depositAmount" INTEGER NOT NULL,
    "description" TEXT,
    "pricingPerSlot" DECIMAL(10,2) NOT NULL,
    "sittingCapacity" INTEGER NOT NULL,
    "venueLayout" TEXT,
    "amenities" "Amenities"[],
    "images" TEXT[],
    "termsOfUse" TEXT NOT NULL,
    "cancellationPolicy" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "streetAddress2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "paymentRequired" BOOLEAN DEFAULT false,
    "rating" DECIMAL(65,30),
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "EventCenter_pkey" PRIMARY KEY ("id")
);

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
