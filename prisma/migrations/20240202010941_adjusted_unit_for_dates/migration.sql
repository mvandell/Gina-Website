/*
  Warnings:

  - You are about to drop the column `day` on the `Dates` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Dates` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Dates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dates" DROP COLUMN "day",
DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "date" TIMESTAMP(3);
