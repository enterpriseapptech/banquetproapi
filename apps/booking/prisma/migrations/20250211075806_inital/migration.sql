-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CATERING', 'EVENTCENTER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SCHEDULED', 'POSTPONED', 'CANCELED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "confirmed_by" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "servicebooking_id" TEXT,
    "serviceType" "ServiceType" NOT NULL,
    "balanceDue" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "bookingDates" TEXT[],
    "isTermsAccepted" BOOLEAN NOT NULL,
    "iscancellationPolicyAccepted" BOOLEAN NOT NULL,
    "isLiabilityWaiverSigned" BOOLEAN NOT NULL,
    "canceled_by" TEXT,
    "canceledAt" TIMESTAMP(3),
    "cancelationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_customer_id_status_paymentStatus_serviceType_idx" ON "Booking"("customer_id", "status", "paymentStatus", "serviceType");
