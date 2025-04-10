/*
  Warnings:

  - Added the required column `type` to the `achievements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
