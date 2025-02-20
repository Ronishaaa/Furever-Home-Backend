-- DropForeignKey
ALTER TABLE "AdoptionInfo" DROP CONSTRAINT "AdoptionInfo_petId_fkey";

-- DropForeignKey
ALTER TABLE "Personality" DROP CONSTRAINT "Personality_petId_fkey";

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionInfo" ADD CONSTRAINT "AdoptionInfo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
