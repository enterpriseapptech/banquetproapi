/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId,reference,paymentReference,transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_invoiceId_key";

-- DropIndex
DROP INDEX "Payment_paymentReference_key";

-- DropIndex
DROP INDEX "Payment_reference_key";

-- DropIndex
DROP INDEX "Payment_transactionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_invoiceId_reference_paymentReference_transactionId_key" ON "Payment"("invoiceId", "reference", "paymentReference", "transactionId");
