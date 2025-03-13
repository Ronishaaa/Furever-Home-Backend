/*
  Warnings:

  - The `imageUrl` column on the `RescueStory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imageUrl` column on the `SuccessStory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RescueStory" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];

-- AlterTable
ALTER TABLE "SuccessStory" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];
