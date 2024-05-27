/*
  Warnings:

  - You are about to drop the `_DayToStaff` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `year` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScheduledProject" DROP CONSTRAINT "ScheduledProject_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_DayToStaff" DROP CONSTRAINT "_DayToStaff_A_fkey";

-- DropForeignKey
ALTER TABLE "_DayToStaff" DROP CONSTRAINT "_DayToStaff_B_fkey";

-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ScheduledProject" ALTER COLUMN "roomId" DROP NOT NULL,
ALTER COLUMN "roomId" DROP DEFAULT;

-- DropTable
DROP TABLE "_DayToStaff";

-- CreateTable
CREATE TABLE "_StaffRundown" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StaffSatellites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StaffOut" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StaffRundown_AB_unique" ON "_StaffRundown"("A", "B");

-- CreateIndex
CREATE INDEX "_StaffRundown_B_index" ON "_StaffRundown"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StaffSatellites_AB_unique" ON "_StaffSatellites"("A", "B");

-- CreateIndex
CREATE INDEX "_StaffSatellites_B_index" ON "_StaffSatellites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StaffOut_AB_unique" ON "_StaffOut"("A", "B");

-- CreateIndex
CREATE INDEX "_StaffOut_B_index" ON "_StaffOut"("B");

-- AddForeignKey
ALTER TABLE "ScheduledProject" ADD CONSTRAINT "ScheduledProject_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffRundown" ADD CONSTRAINT "_StaffRundown_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffRundown" ADD CONSTRAINT "_StaffRundown_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffSatellites" ADD CONSTRAINT "_StaffSatellites_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffSatellites" ADD CONSTRAINT "_StaffSatellites_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffOut" ADD CONSTRAINT "_StaffOut_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffOut" ADD CONSTRAINT "_StaffOut_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
