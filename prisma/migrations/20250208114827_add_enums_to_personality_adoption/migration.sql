/*
  Warnings:

  - Added the required column `experienceLevel` to the `AdoptionInfo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `energyLevel` on the `Personality` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `temperament` on the `Personality` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `training` on the `Personality` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "Temperament" AS ENUM ('Friendly', 'Shy', 'Aggressive', 'Calm', 'Playful');

-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('None', 'Basic', 'Advanced');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('FirstTimeOwner', 'ExperiencedOwner');

-- AlterTable
ALTER TABLE "AdoptionInfo" DROP COLUMN "experienceLevel",
ADD COLUMN     "experienceLevel" "ExperienceLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Personality" DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" "EnergyLevel" NOT NULL,
DROP COLUMN "temperament",
ADD COLUMN     "temperament" "Temperament" NOT NULL,
DROP COLUMN "training",
ADD COLUMN     "training" "TrainingLevel" NOT NULL;
