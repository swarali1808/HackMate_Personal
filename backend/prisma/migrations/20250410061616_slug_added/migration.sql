/*
  Warnings:

  - Added the required column `psDomain` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hackathon" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "psDomain" TEXT NOT NULL;
