-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Catering" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "eventTypes" TEXT[],
    "serviceProviderId" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "depositAmount" INTEGER NOT NULL,
    "discountPercentage" INTEGER DEFAULT 0,
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
    "location" TEXT[],
    "postal" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "featureExpiringAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "rating" DECIMAL(65,30),
    "paymentRequired" BOOLEAN DEFAULT false,
    "contact" TEXT,

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
CREATE INDEX "Catering_serviceProviderId_idx" ON "Catering"("serviceProviderId");

-- CreateIndex
CREATE INDEX "Catering_status_idx" ON "Catering"("status");

-- CreateIndex
CREATE INDEX "Catering_name_idx" ON "Catering"("name");

-- CreateIndex
CREATE INDEX "Catering_rating_idx" ON "Catering"("rating");

-- CreateIndex
CREATE INDEX "Catering_location_idx" ON "Catering"("location");

-- CreateIndex
CREATE INDEX "Catering_cuisine_idx" ON "Catering"("cuisine");

-- CreateIndex
CREATE INDEX "Catering_startPrice_idx" ON "Catering"("startPrice");

-- CreateIndex
CREATE INDEX "Menu_description_idx" ON "Menu"("description");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_cateringId_fkey" FOREIGN KEY ("cateringId") REFERENCES "Catering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
