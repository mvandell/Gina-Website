/*
  Warnings:

  - A unique constraint covering the columns `[instrument]` on the table `Policy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Policy_instrument_key" ON "Policy"("instrument");
