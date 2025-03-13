/*
  Warnings:

  - You are about to drop the column `type` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `Personality` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `energyLevel` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingLevel` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personality" DROP CONSTRAINT "Personality_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "type",
ADD COLUMN     "energyLevel" "EnergyLevel" NOT NULL,
ADD COLUMN     "personality" TEXT[],
ADD COLUMN     "specialTraits" TEXT,
ADD COLUMN     "strangerBehavior" TEXT,
ADD COLUMN     "trainingLevel" "TrainingLevel" NOT NULL;

-- DropTable
DROP TABLE "Personality";
