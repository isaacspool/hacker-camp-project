/*
  Warnings:

  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "creatorId" INTEGER NOT NULL,
ALTER COLUMN "minParticipants" DROP NOT NULL,
ALTER COLUMN "minParticipants" DROP DEFAULT,
ALTER COLUMN "maxParticipants" DROP NOT NULL,
ALTER COLUMN "maxParticipants" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "years" INTEGER[];

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "years" INTEGER[];

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
