-- DropForeignKey
ALTER TABLE "GrowthTracking" DROP CONSTRAINT "GrowthTracking_plantId_fkey";

-- DropForeignKey
ALTER TABLE "WateringLog" DROP CONSTRAINT "WateringLog_plantId_fkey";

-- AddForeignKey
ALTER TABLE "WateringLog" ADD CONSTRAINT "WateringLog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthTracking" ADD CONSTRAINT "GrowthTracking_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
