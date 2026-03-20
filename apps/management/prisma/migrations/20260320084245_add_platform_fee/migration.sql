/*
  Warnings:

  - Added the required column `createdBy` to the `AppSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceCharge` to the `AppSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AppSettings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KycMethod" AS ENUM ('Manual', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "AppSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "kycMethod" "KycMethod" NOT NULL DEFAULT 'Manual',
ADD COLUMN     "serviceCharge" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT;

-- DropEnum
DROP TYPE "FeesType";

-- CreateTable
CREATE TABLE "AppSettingLogs" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" "KycMethod" NOT NULL DEFAULT 'Manual',
    "appSettingId" TEXT NOT NULL,

    CONSTRAINT "AppSettingLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppSettingLogs" ADD CONSTRAINT "AppSettingLogs_appSettingId_fkey" FOREIGN KEY ("appSettingId") REFERENCES "AppSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
