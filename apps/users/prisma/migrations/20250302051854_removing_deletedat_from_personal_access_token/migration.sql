/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `PersonalAccessTokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "historyOfServiceProviders" TEXT[];

-- AlterTable
ALTER TABLE "PersonalAccessTokens" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "ServiceProvider" ADD COLUMN     "workingHours" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" TEXT;
