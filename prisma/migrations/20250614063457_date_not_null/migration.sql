/*
  Warnings:

  - Made the column `date` on table `Pushup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pushup" ALTER COLUMN "date" SET NOT NULL;
