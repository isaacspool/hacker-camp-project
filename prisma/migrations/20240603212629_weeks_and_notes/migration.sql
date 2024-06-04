/*
  Warnings:

  - You are about to drop the column `week` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Day` table. All the data in the column will be lost.
  - Added the required column `weekId` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Day_day_idx";

-- DropIndex
DROP INDEX "Day_week_idx";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "week",
DROP COLUMN "year",
ADD COLUMN     "weekId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Week" (
    "id" SERIAL NOT NULL,
    "notes" TEXT,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
