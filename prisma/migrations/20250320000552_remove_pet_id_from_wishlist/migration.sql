/*
  Warnings:

  - You are about to drop the column `petId` on the `Wishlist` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Wishlist_petId_key";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "petId";
