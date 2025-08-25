-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "BookingSource" AS ENUM ('WEB', 'MOBILE');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CATERING', 'EVENTCENTER');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'SENT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'RESERVED', 'POSTPONED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'FULLY_PAID', 'PARTIALLY_PAID');

-- CreateEnum
CREATE TYPE "SpecialRequirement" AS ENUM ('WHEELCHAIRACCESS', 'TEMPERATUREADJUSTMENT');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "requestQuoteId" TEXT,
    "customerId" TEXT NOT NULL,
    "confirmedBy" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "servicebookingId" TEXT,
    "serviceId" TEXT NOT NULL,
    "serviceProvider" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "subTotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "invoice" TEXT[],
    "paymentStatus" "PaymentStatus" NOT NULL,
    "status" "BookingStatus" NOT NULL,
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
    "canceledAt" TIMESTAMP(3),
    "cancelationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestQuote" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceProvider" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "budget" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "quoteReference" TEXT NOT NULL,
    "isTermsAccepted" BOOLEAN NOT NULL,
    "isCancellationPolicyAccepted" BOOLEAN NOT NULL,
    "isLiabilityWaiverSigned" BOOLEAN NOT NULL,
    "source" "BookingSource" NOT NULL,
    "customerNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "billingDetails" JSONB NOT NULL,

    CONSTRAINT "RequestQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableLocations" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT,
    "status" "LocationStatus" NOT NULL,

    CONSTRAINT "AvailableLocations_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "CateringBooking" (
    "id" TEXT NOT NULL,
    "cateringId" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "eventName" TEXT,
    "eventType" TEXT,
    "dishTypes" TEXT[],
    "cuisine" TEXT[],
    "description" TEXT,
    "noOfGuest" INTEGER,
    "specialRequirements" "SpecialRequirement"[],
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "CateringBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RequestedTimeSlots" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RequestedTimeSlots_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RequestQuoteToTimeSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RequestQuoteToTimeSlot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_requestQuoteId_key" ON "Booking"("requestQuoteId");

-- CreateIndex
CREATE INDEX "Booking_bookingReference_idx" ON "Booking"("bookingReference");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_serviceId_idx" ON "Booking"("serviceId");

-- CreateIndex
CREATE INDEX "Booking_serviceType_idx" ON "Booking"("serviceType");

-- CreateIndex
CREATE INDEX "Booking_paymentStatus_idx" ON "Booking"("paymentStatus");

-- CreateIndex
CREATE INDEX "Booking_serviceProvider_idx" ON "Booking"("serviceProvider");

-- CreateIndex
CREATE INDEX "RequestQuote_customerId_idx" ON "RequestQuote"("customerId");

-- CreateIndex
CREATE INDEX "RequestQuote_serviceId_idx" ON "RequestQuote"("serviceId");

-- CreateIndex
CREATE INDEX "RequestQuote_serviceType_idx" ON "RequestQuote"("serviceType");

-- CreateIndex
CREATE INDEX "RequestQuote_serviceProvider_idx" ON "RequestQuote"("serviceProvider");

-- CreateIndex
CREATE INDEX "TimeSlot_serviceId_idx" ON "TimeSlot"("serviceId");

-- CreateIndex
CREATE INDEX "TimeSlot_bookingId_idx" ON "TimeSlot"("bookingId");

-- CreateIndex
CREATE INDEX "TimeSlot_startTime_endTime_idx" ON "TimeSlot"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "TimeSlot_isAvailable_idx" ON "TimeSlot"("isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "EventCenterBooking_booking_id_key" ON "EventCenterBooking"("booking_id");

-- CreateIndex
CREATE INDEX "EventCenterBooking_booking_id_eventcenterId_eventName_event_idx" ON "EventCenterBooking"("booking_id", "eventcenterId", "eventName", "eventTheme", "eventType");

-- CreateIndex
CREATE UNIQUE INDEX "CateringBooking_booking_id_key" ON "CateringBooking"("booking_id");

-- CreateIndex
CREATE INDEX "CateringBooking_booking_id_idx" ON "CateringBooking"("booking_id");

-- CreateIndex
CREATE INDEX "CateringBooking_cateringId_idx" ON "CateringBooking"("cateringId");

-- CreateIndex
CREATE INDEX "CateringBooking_cuisine_idx" ON "CateringBooking"("cuisine");

-- CreateIndex
CREATE INDEX "CateringBooking_dishTypes_idx" ON "CateringBooking"("dishTypes");

-- CreateIndex
CREATE INDEX "_RequestedTimeSlots_B_index" ON "_RequestedTimeSlots"("B");

-- CreateIndex
CREATE INDEX "_RequestQuoteToTimeSlot_B_index" ON "_RequestQuoteToTimeSlot"("B");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_requestQuoteId_fkey" FOREIGN KEY ("requestQuoteId") REFERENCES "RequestQuote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCenterBooking" ADD CONSTRAINT "EventCenterBooking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringBooking" ADD CONSTRAINT "CateringBooking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestedTimeSlots" ADD CONSTRAINT "_RequestedTimeSlots_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestedTimeSlots" ADD CONSTRAINT "_RequestedTimeSlots_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestQuoteToTimeSlot" ADD CONSTRAINT "_RequestQuoteToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "RequestQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestQuoteToTimeSlot" ADD CONSTRAINT "_RequestQuoteToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
