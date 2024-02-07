/*
  Warnings:

  - You are about to drop the column `about` on the `Dates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dates" DROP COLUMN "about",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
