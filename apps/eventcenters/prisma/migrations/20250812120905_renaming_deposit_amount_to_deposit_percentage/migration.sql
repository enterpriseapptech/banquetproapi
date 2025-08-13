/*
  Warnings:

  - You are about to alter the column `depositAmount` on the `EventCenter` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `pricingPerSlot` on the `EventCenter` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "EventCenter" ALTER COLUMN "depositAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "pricingPerSlot" SET DATA TYPE DECIMAL(10,2);
