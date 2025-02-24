/*
  Warnings:

  - The values [Both] on the enum `ExperienceLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `otherPets` on the `Application` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousPets` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousPetsInfo` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExperienceLevel_new" AS ENUM ('FirstTimeOwner', 'ExperiencedOwner');
ALTER TABLE "AdoptionInfo" ALTER COLUMN "experienceLevel" TYPE "ExperienceLevel_new" USING ("experienceLevel"::text::"ExperienceLevel_new");
ALTER TYPE "ExperienceLevel" RENAME TO "ExperienceLevel_old";
ALTER TYPE "ExperienceLevel_new" RENAME TO "ExperienceLevel";
DROP TYPE "ExperienceLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "otherPets",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "previousPets" BOOLEAN NOT NULL,
ADD COLUMN     "previousPetsInfo" TEXT NOT NULL;
