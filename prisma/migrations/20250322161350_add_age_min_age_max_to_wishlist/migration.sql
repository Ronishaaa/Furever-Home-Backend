/*
  Warnings:

  - You are about to drop the column `age` on the `Wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "age",
ADD COLUMN     "ageMax" INTEGER,
ADD COLUMN     "ageMin" INTEGER;

-- CreateTable
CREATE TABLE "MatchedPets" (
    "wishlistId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchedPets_pkey" PRIMARY KEY ("wishlistId","petId")
);

-- AddForeignKey
ALTER TABLE "MatchedPets" ADD CONSTRAINT "MatchedPets_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchedPets" ADD CONSTRAINT "MatchedPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
