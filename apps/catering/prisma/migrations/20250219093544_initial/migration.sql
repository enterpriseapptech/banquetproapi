-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Amenities" AS ENUM ('WIFI', 'PACKINGSPACE', 'SECURITY');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('HOURLY', 'DAILY', 'NEGOTIATION');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'CONFERENCE', 'SEMINAR', 'CONCERT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "SpecialRequirement" AS ENUM ('WHEELCHAIRACCESS', 'TEMPERATUREADJUSTMENT');

-- CreateTable
CREATE TABLE "EventCenter" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "depositAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "description" TEXT,
    "pricingType" "PricingType" NOT NULL,
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

-- CreateTable
CREATE TABLE "EventCenterBooking" (
    "id" TEXT NOT NULL,
    "eventcenterId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "eventName" TEXT,
    "eventTheme" TEXT,
    "eventType" TEXT,
    "description" TEXT,
    "noOfGuest" INTEGER,
    "specialRequirements" "SpecialRequirement"[],
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "EventCenterBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventCenter_serviceProviderId_city_state_country_status_idx" ON "EventCenter"("serviceProviderId", "city", "state", "country", "status");

-- CreateIndex
CREATE INDEX "EventCenterBooking_bookingId_eventName_eventTheme_eventType_idx" ON "EventCenterBooking"("bookingId", "eventName", "eventTheme", "eventType");

-- AddForeignKey
ALTER TABLE "EventCenterBooking" ADD CONSTRAINT "EventCenterBooking_eventcenterId_fkey" FOREIGN KEY ("eventcenterId") REFERENCES "EventCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
