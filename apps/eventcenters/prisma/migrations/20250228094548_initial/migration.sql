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
    "serviceProviderId" TEXT NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "pricingPerSlot" DOUBLE PRECISION NOT NULL,
    "sittingCapacity" INTEGER NOT NULL,
    "venueLayout" TEXT,
    "amenities" "Amenities"[],
    "images" TEXT[],
    "termsOfUse" TEXT NOT NULL,
    "cancellationPolicy" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "streetAddress2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "EventCenter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventCenter_serviceProviderId_city_state_country_status_idx" ON "EventCenter"("serviceProviderId", "city", "state", "country", "status");
