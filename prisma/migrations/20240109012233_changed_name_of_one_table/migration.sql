/*
  Warnings:

  - You are about to drop the `CM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CM";

-- CreateTable
CREATE TABLE "Merit" (
    "id" SERIAL NOT NULL,
    "goals" TEXT NOT NULL,
    "evals" TEXT NOT NULL,
    "awards" TEXT NOT NULL,

    CONSTRAINT "Merit_pkey" PRIMARY KEY ("id")
);
