-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "waterFrequency" INTEGER NOT NULL,
    "sunlight" TEXT,
    "notes" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WateringLog" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "wateredAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "WateringLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthTracking" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "trackedAt" TIMESTAMP(3) NOT NULL,
    "height" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "milestone" TEXT,
    "notes" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "GrowthTracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WateringLog" ADD CONSTRAINT "WateringLog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthTracking" ADD CONSTRAINT "GrowthTracking_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
