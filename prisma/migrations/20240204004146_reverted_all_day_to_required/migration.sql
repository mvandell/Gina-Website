/*
  Warnings:

  - Made the column `allDay` on table `Dates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dates" ALTER COLUMN "allDay" SET NOT NULL;
