-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORDRESET', 'DELETEACCOUNT', 'VERIFYACCOUNT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginAttempts" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PasswordHistory" (
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordHistory_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "PersonalAccessTokens" (
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PersonalAccessTokens_pkey" PRIMARY KEY ("user_id")
);
