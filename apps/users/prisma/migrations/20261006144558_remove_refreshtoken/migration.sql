/*
  Warnings:

  - You are about to drop the column `serviceType` on the `ServiceProvider` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "serviceType";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken";
