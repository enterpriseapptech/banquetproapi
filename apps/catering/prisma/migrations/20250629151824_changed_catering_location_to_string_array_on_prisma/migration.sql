/*
  Warnings:

  - The `location` column on the `Catering` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Catering" DROP COLUMN "location",
ADD COLUMN     "location" TEXT[];

-- CreateIndex
CREATE INDEX "Catering_location_idx" ON "Catering"("location");
