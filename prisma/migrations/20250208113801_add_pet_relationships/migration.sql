/*
  Warnings:

  - You are about to drop the column `videos` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "videos";

-- CreateTable
CREATE TABLE "Personality" (
    "id" TEXT NOT NULL,
    "energyLevel" TEXT NOT NULL,
    "temperament" TEXT NOT NULL,
    "training" TEXT NOT NULL,
    "strangerBehavior" TEXT NOT NULL,
    "petBehavior" TEXT NOT NULL,
    "specialTraits" TEXT,
    "petId" TEXT NOT NULL,

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionInfo" (
    "id" TEXT NOT NULL,
    "idealHome" TEXT,
    "children" BOOLEAN NOT NULL,
    "otherPets" BOOLEAN NOT NULL,
    "experienceLevel" TEXT,
    "specialNeeds" TEXT,
    "petId" TEXT NOT NULL,

    CONSTRAINT "AdoptionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personality_petId_key" ON "Personality"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionInfo_petId_key" ON "AdoptionInfo"("petId");

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionInfo" ADD CONSTRAINT "AdoptionInfo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
