/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_reference_key" ON "Invoice"("reference");
