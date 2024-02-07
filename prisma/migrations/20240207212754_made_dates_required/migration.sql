/*
  Warnings:

  - Made the column `end` on table `Dates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `Dates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dates" ALTER COLUMN "end" SET NOT NULL,
ALTER COLUMN "start" SET NOT NULL;
