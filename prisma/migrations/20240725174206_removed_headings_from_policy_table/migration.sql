/*
  Warnings:

  - You are about to drop the column `heading` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `headingId` on the `Policy` table. All the data in the column will be lost.
  - Made the column `content` on table `Policy` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_headingId_fkey";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "heading",
DROP COLUMN "headingId",
ALTER COLUMN "content" SET NOT NULL;
