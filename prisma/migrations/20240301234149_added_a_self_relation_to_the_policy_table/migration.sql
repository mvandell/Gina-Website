/*
  Warnings:

  - You are about to drop the column `content` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Policy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "content",
DROP COLUMN "heading",
ADD COLUMN     "headingId" INTEGER;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_headingId_fkey" FOREIGN KEY ("headingId") REFERENCES "Policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
