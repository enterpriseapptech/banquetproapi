/*
  Warnings:

  - The `currency` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currency` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD', 'GHS', 'ZAR', 'KES', 'XOF');

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" DEFAULT 'NGN';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'NGN';

-- CreateIndex
CREATE INDEX "Invoice_currency_idx" ON "Invoice"("currency");
