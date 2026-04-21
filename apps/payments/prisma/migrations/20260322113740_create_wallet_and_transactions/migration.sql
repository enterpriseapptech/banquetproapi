/*
  Warnings:

  - You are about to drop the column `amount` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Refund` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refundId]` on the table `Dispute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference,paymentReference,transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundAmount` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundReason` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceProviderId` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('USER', 'PLATFORM');

-- CreateEnum
CREATE TYPE "WalletTxType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "WalletTxReason" AS ENUM ('TOPUP', 'INVOICE_PAYMENT', 'SERVICE_CHARGE', 'ESCROW_HOLD', 'ESCROW_RELEASE', 'REFUND', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "WithdrawalStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RefundStatus" ADD VALUE 'COMPLETED';
ALTER TYPE "RefundStatus" ADD VALUE 'FAILED';

-- DropIndex
DROP INDEX "Payment_invoiceId_reference_paymentReference_transactionId_key";

-- AlterTable
ALTER TABLE "Dispute" ADD COLUMN     "adminNote" TEXT,
ADD COLUMN     "refundId" TEXT,
ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "serviceRequestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "serviceChargeAmount" DECIMAL(10,2),
ADD COLUMN     "serviceProviderId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "amount",
DROP COLUMN "reason",
ADD COLUMN     "bookingId" TEXT,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deductionAmount" DECIMAL(10,2),
ADD COLUMN     "deductionPercentage" DECIMAL(5,2),
ADD COLUMN     "invoiceId" TEXT NOT NULL,
ADD COLUMN     "policySnapshot" JSONB,
ADD COLUMN     "processAt" TIMESTAMP(3),
ADD COLUMN     "refundAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "refundReason" TEXT NOT NULL,
ADD COLUMN     "serviceProviderId" TEXT NOT NULL,
ADD COLUMN     "walletTransactionId" TEXT;

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" "WalletType" NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'NGN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "WalletTxType" NOT NULL,
    "reason" "WalletTxReason" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "balanceBefore" DECIMAL(12,2) NOT NULL,
    "balanceAfter" DECIMAL(12,2) NOT NULL,
    "description" TEXT,
    "invoiceId" TEXT,
    "paymentId" TEXT,
    "refundId" TEXT,
    "withdrawalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'NGN',
    "bankDetails" JSONB NOT NULL,
    "status" "WithdrawalStatus" NOT NULL DEFAULT 'PENDING',
    "reference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_type_idx" ON "Wallet"("type");

-- CreateIndex
CREATE INDEX "WalletTransaction_walletId_idx" ON "WalletTransaction"("walletId");

-- CreateIndex
CREATE INDEX "WalletTransaction_reason_idx" ON "WalletTransaction"("reason");

-- CreateIndex
CREATE INDEX "WalletTransaction_invoiceId_idx" ON "WalletTransaction"("invoiceId");

-- CreateIndex
CREATE INDEX "WalletTransaction_paymentId_idx" ON "WalletTransaction"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Withdrawal_reference_key" ON "Withdrawal"("reference");

-- CreateIndex
CREATE INDEX "Withdrawal_userId_idx" ON "Withdrawal"("userId");

-- CreateIndex
CREATE INDEX "Withdrawal_status_idx" ON "Withdrawal"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_refundId_key" ON "Dispute"("refundId");

-- CreateIndex
CREATE INDEX "Invoice_serviceProviderId_idx" ON "Invoice"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_paymentReference_transactionId_key" ON "Payment"("reference", "paymentReference", "transactionId");

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
