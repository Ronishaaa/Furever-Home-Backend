-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('Available', 'Pending', 'Adopted');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "Temperament" AS ENUM ('Friendly', 'Shy', 'Aggressive', 'Calm', 'Playful');

-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('None', 'Basic', 'Advanced');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('FirstTimeOwner', 'ExperiencedOwner', 'Both');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" INTEGER,
    "address" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otpExpiration" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "color" TEXT,
    "healthCondition" TEXT,
    "vaccination" BOOLEAN NOT NULL,
    "adoptionStatus" "AdoptionStatus" NOT NULL,
    "type" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personality" (
    "id" SERIAL NOT NULL,
    "energyLevel" "EnergyLevel" NOT NULL,
    "temperament" "Temperament" NOT NULL,
    "training" "TrainingLevel" NOT NULL,
    "strangerBehavior" TEXT,
    "petBehavior" TEXT,
    "specialTraits" TEXT,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionInfo" (
    "id" SERIAL NOT NULL,
    "idealHome" TEXT,
    "childrenFriendly" BOOLEAN NOT NULL,
    "otherPetsFriendly" BOOLEAN NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "specialNeeds" TEXT,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "AdoptionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personality_petId_key" ON "Personality"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionInfo_petId_key" ON "AdoptionInfo"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionInfo" ADD CONSTRAINT "AdoptionInfo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
