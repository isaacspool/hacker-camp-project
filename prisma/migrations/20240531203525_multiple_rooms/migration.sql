/*
  Warnings:

  - You are about to drop the column `roomId` on the `ScheduledProject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledProject" DROP CONSTRAINT "ScheduledProject_roomId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ScheduledProject" DROP COLUMN "roomId";

-- CreateTable
CREATE TABLE "_RoomToScheduledProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToScheduledProject_AB_unique" ON "_RoomToScheduledProject"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToScheduledProject_B_index" ON "_RoomToScheduledProject"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToScheduledProject" ADD CONSTRAINT "_RoomToScheduledProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToScheduledProject" ADD CONSTRAINT "_RoomToScheduledProject_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduledProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
