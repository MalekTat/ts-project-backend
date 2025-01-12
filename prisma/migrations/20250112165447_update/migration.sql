/*
  Warnings:

  - You are about to drop the column `milestone` on the `GrowthTracking` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `GrowthTracking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GrowthTracking" DROP COLUMN "milestone",
DROP COLUMN "width";
