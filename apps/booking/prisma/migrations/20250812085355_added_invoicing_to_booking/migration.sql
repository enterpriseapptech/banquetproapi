/*
  Warnings:

  - You are about to drop the column `bookingDates` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalAfterDiscount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalBeforeDiscount` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `discount` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `subTotal` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `discount` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'SENT');

-- DropIndex
DROP INDEX "Booking_customerId_status_paymentStatus_serviceType_idx";

-- DropIndex
DROP INDEX "CateringBooking_booking_id_cateringId_eventName_cuisine_dis_idx";

-- DropIndex
DROP INDEX "TimeSlot_serviceId_bookingId_startTime_endTime_isAvailable_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingDates",
DROP COLUMN "totalAfterDiscount",
DROP COLUMN "totalBeforeDiscount",
ADD COLUMN     "invoice" TEXT[],
ADD COLUMN     "subTotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "total" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "bookingsRequested" TEXT[],
ADD COLUMN     "quotesRequested" TEXT[];

-- CreateTable
CREATE TABLE "RequestQuote" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bookingId" TEXT,
    "serviceId" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "budget" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL,
    "isTermsAccepted" BOOLEAN NOT NULL,
    "isCancellationPolicyAccepted" BOOLEAN NOT NULL,
    "isLiabilityWaiverSigned" BOOLEAN NOT NULL,
    "source" "BookingSource" NOT NULL,
    "customerNotes" TEXT,
    "previousDates" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "billingDetails" JSONB NOT NULL,

    CONSTRAINT "RequestQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RequestQuoteToTimeSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RequestQuoteToTimeSlot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestQuote_bookingId_key" ON "RequestQuote"("bookingId");

-- CreateIndex
CREATE INDEX "RequestQuote_customerId_idx" ON "RequestQuote"("customerId");

-- CreateIndex
CREATE INDEX "RequestQuote_serviceId_idx" ON "RequestQuote"("serviceId");

-- CreateIndex
CREATE INDEX "RequestQuote_serviceType_idx" ON "RequestQuote"("serviceType");

-- CreateIndex
CREATE INDEX "_RequestQuoteToTimeSlot_B_index" ON "_RequestQuoteToTimeSlot"("B");

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
CREATE INDEX "CateringBooking_booking_id_idx" ON "CateringBooking"("booking_id");

-- CreateIndex
CREATE INDEX "CateringBooking_cateringId_idx" ON "CateringBooking"("cateringId");

-- CreateIndex
CREATE INDEX "CateringBooking_cuisine_idx" ON "CateringBooking"("cuisine");

-- CreateIndex
CREATE INDEX "CateringBooking_dishTypes_idx" ON "CateringBooking"("dishTypes");

-- CreateIndex
CREATE INDEX "TimeSlot_serviceId_idx" ON "TimeSlot"("serviceId");

-- CreateIndex
CREATE INDEX "TimeSlot_bookingId_idx" ON "TimeSlot"("bookingId");

-- CreateIndex
CREATE INDEX "TimeSlot_startTime_endTime_idx" ON "TimeSlot"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "TimeSlot_isAvailable_idx" ON "TimeSlot"("isAvailable");

-- AddForeignKey
ALTER TABLE "RequestQuote" ADD CONSTRAINT "RequestQuote_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestQuoteToTimeSlot" ADD CONSTRAINT "_RequestQuoteToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "RequestQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestQuoteToTimeSlot" ADD CONSTRAINT "_RequestQuoteToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
