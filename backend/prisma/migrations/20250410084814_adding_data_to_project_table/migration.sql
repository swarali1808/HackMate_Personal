/*
  Warnings:

  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `problemStatement` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL,
ALTER COLUMN "totalCommits" DROP NOT NULL,
ALTER COLUMN "totalPRs" DROP NOT NULL,
ALTER COLUMN "totalIssues" DROP NOT NULL,
ALTER COLUMN "problemStatement" SET NOT NULL;
