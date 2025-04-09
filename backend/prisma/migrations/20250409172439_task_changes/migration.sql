/*
  Warnings:

  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedTo" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL;
