/*
  Warnings:

  - You are about to drop the column `slug` on the `resources` table. All the data in the column will be lost.
  - Added the required column `category` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "resources_slug_key";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "slug",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
