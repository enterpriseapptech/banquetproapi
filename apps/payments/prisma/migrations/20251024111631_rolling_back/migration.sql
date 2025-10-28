/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paidAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentReference` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentMethodId",
ADD COLUMN     "paidAt" TEXT NOT NULL,
ADD COLUMN     "paymentReference" TEXT NOT NULL;

-- DropTable
DROP TABLE "PaymentMethod";
