-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_headingId_fkey";

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_headingId_fkey" FOREIGN KEY ("headingId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
