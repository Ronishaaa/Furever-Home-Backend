-- AlterEnum
ALTER TYPE "ExperienceLevel" ADD VALUE 'Both';

-- AlterTable
ALTER TABLE "Personality" ALTER COLUMN "strangerBehavior" DROP NOT NULL,
ALTER COLUMN "petBehavior" DROP NOT NULL;
