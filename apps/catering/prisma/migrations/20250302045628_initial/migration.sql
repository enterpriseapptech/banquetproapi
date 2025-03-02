-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Catering" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "depositAmount" INTEGER NOT NULL,
    "startPrice" DOUBLE PRECISION NOT NULL,
    "minCapacity" INTEGER,
    "maxCapacity" INTEGER,
    "description" TEXT,
    "dishTypes" TEXT[],
    "cuisine" TEXT[],
    "images" TEXT[],
    "termsOfUse" TEXT NOT NULL,
    "cancellationPolicy" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "streetAddress2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "featureExpiringAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Catering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "cateringId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Catering_serviceProviderId_startPrice_city_state_country_st_idx" ON "Catering"("serviceProviderId", "startPrice", "city", "state", "country", "status", "cuisine");

-- CreateIndex
CREATE INDEX "Menu_description_idx" ON "Menu"("description");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_cateringId_fkey" FOREIGN KEY ("cateringId") REFERENCES "Catering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
