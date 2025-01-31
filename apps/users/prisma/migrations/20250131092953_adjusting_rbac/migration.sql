/*
  Warnings:

  - You are about to drop the column `permissions` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `User` table. All the data in the column will be lost.
  - Changed the type of `role` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPERADMIN', 'ADMIN', 'CUSTOMERSERVICE');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "permissions",
DROP COLUMN "role",
ADD COLUMN     "role" "AdminRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted_at",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT;

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "condition" JSONB,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);
