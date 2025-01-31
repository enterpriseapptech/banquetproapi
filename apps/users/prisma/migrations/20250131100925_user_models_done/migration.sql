/*
  Warnings:

  - You are about to drop the column `role` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `shiftSchedule` on the `Staff` table. All the data in the column will be lost.
  - Changed the type of `serviceType` on the `ServiceProvider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('EVENTCENTERS', 'CATERING');

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "preferences" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceProvider" ADD COLUMN     "additionalInformation" TEXT,
ADD COLUMN     "regulations" TEXT,
DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "ServiceType" NOT NULL,
ALTER COLUMN "pricingInfo" DROP NOT NULL,
ALTER COLUMN "pricingInfo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "role",
DROP COLUMN "shiftSchedule";
