/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `Booking` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "cancelledAt",
ADD COLUMN     "canceledAt" TIMESTAMP(3);

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

-- CreateIndex
CREATE UNIQUE INDEX "CateringBooking_booking_id_key" ON "CateringBooking"("booking_id");

-- CreateIndex
CREATE INDEX "CateringBooking_booking_id_cateringId_eventName_cuisine_dis_idx" ON "CateringBooking"("booking_id", "cateringId", "eventName", "cuisine", "dishTypes", "eventType");

-- AddForeignKey
ALTER TABLE "CateringBooking" ADD CONSTRAINT "CateringBooking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
