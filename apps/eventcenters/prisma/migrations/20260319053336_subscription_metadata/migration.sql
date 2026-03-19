-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "EventCenter" ADD COLUMN     "subscriptionExpiry" TIMESTAMP(3),
ADD COLUMN     "subscriptionPlanId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus";
