/*
  Warnings:

  - The `allDay` column on the `Dates` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Dates" DROP COLUMN "allDay",
ADD COLUMN     "allDay" BOOLEAN NOT NULL DEFAULT false;
