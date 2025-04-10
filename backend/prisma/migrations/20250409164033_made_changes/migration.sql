/*
  Warnings:

  - Added the required column `role` to the `work_experiences` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `employmentType` on the `work_experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "work_experiences" ADD COLUMN     "role" TEXT NOT NULL,
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
