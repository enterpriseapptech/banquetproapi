-- CreateEnum
CREATE TYPE "BookingSource" AS ENUM ('WEB', 'MOBILE');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CATERING', 'EVENTCENTER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'BOOKED', 'RESERVED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'FULLY_PAID', 'PARTIALLY_PAID');

-- CreateEnum
CREATE TYPE "SpecialRequirement" AS ENUM ('WHEELCHAIRACCESS', 'TEMPERATUREADJUSTMENT');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "confirmedBy" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "servicebookingId" TEXT,
    "serviceType" "ServiceType" NOT NULL,
    "totalBeforeDiscount" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "totalAfterDiscount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "bookingDates" TEXT[],
    "isTermsAccepted" BOOLEAN NOT NULL,
    "isCancellationPolicyAccepted" BOOLEAN NOT NULL,
    "isLiabilityWaiverSigned" BOOLEAN NOT NULL,
    "bookingReference" TEXT NOT NULL,
    "source" "BookingSource" NOT NULL,
    "serviceNotes" TEXT,
    "customerNotes" TEXT,
    "rescheduledBy" TEXT,
    "rescheduledAt" TIMESTAMP(3),
    "previousDates" TEXT[],
    "cancelledBy" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "cancelationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "bookingId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "previousBookings" TEXT[],
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCenterBooking" (
    "id" TEXT NOT NULL,
    "eventcenterId" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
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
CREATE INDEX "Booking_customerId_status_paymentStatus_serviceType_idx" ON "Booking"("customerId", "status", "paymentStatus", "serviceType");

-- CreateIndex
CREATE INDEX "TimeSlot_serviceId_bookingId_startTime_endTime_isAvailable_idx" ON "TimeSlot"("serviceId", "bookingId", "startTime", "endTime", "isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "EventCenterBooking_booking_id_key" ON "EventCenterBooking"("booking_id");

-- CreateIndex
CREATE INDEX "EventCenterBooking_booking_id_eventcenterId_eventName_event_idx" ON "EventCenterBooking"("booking_id", "eventcenterId", "eventName", "eventTheme", "eventType");

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCenterBooking" ADD CONSTRAINT "EventCenterBooking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
