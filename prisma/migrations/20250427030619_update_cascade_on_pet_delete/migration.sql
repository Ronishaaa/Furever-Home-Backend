-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_petId_fkey";

-- DropForeignKey
ALTER TABLE "MatchedPets" DROP CONSTRAINT "MatchedPets_petId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_petId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchedPets" ADD CONSTRAINT "MatchedPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
