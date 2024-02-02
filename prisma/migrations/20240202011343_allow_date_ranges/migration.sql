/*
  Warnings:

  - You are about to drop the column `date` on the `Dates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dates" DROP COLUMN "date",
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3);
