/*
  Warnings:

  - You are about to drop the column `cm` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `rate30` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `rate45` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `summer` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Policy_instrument_key";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "cm",
DROP COLUMN "rate30",
DROP COLUMN "rate45",
DROP COLUMN "school",
DROP COLUMN "summer",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "heading" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "about";

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "paragraph" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "About_paragraph_key" ON "About"("paragraph");
