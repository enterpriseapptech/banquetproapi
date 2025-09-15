/*
  Warnings:

  - You are about to drop the column `discount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "discount",
DROP COLUMN "subTotal",
DROP COLUMN "total";
