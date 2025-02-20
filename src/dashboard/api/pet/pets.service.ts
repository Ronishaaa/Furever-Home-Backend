import {
  EnergyLevel,
  ExperienceLevel,
  Prisma,
  PrismaClient,
  Temperament,
  TrainingLevel,
} from "@prisma/client";
import { PetInput } from "./pets.schema";

export const addPetService = async (db: PrismaClient, petData: PetInput) => {
  const { personality, adoptionInfo, ...petRest } = petData;

  const data: Prisma.PetCreateInput = {
    ...petRest,
    personality: personality
      ? {
          create: personality,
        }
      : undefined,
    adoptionInfo: adoptionInfo
      ? {
          create: adoptionInfo,
        }
      : undefined,
  };

  const newPet = await db.pet.create({
    data,
    include: {
      personality: true,
      adoptionInfo: true,
    },
  });

  return newPet;
};

export interface FILTERS {
  searchTerm: string;
  ageMin?: number;
  ageMax?: number;
  gender?: string;
  energyLevels?: EnergyLevel[];
  temperaments?: Temperament[];
  type?: string[];
  trainingLevels?: TrainingLevel[];
  experienceLevels?: ExperienceLevel[];
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const getAllPetsService = async (
  db: PrismaClient,
  {
    searchTerm,
    ageMin,
    ageMax,
    gender,
    energyLevels,
    temperaments,
    type,
    trainingLevels,
    experienceLevels,
    skip,
    limit,
    sortBy,
    sortOrder,
  }: FILTERS
) => {
  const conditions: Prisma.PetWhereInput[] = [];

  // Apply searchTerm filter for name and breed
  if (searchTerm) {
    conditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { breed: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  // Apply age range filters
  if (ageMin) {
    conditions.push({ age: { gte: Number(ageMin) } });
  }

  if (ageMax) {
    conditions.push({ age: { lte: Number(ageMax) } });
  }

  // Apply gender filter
  if (gender) {
    conditions.push({ gender });
  }

  // Apply energy level filter
  if (energyLevels) {
    conditions.push({ personality: { energyLevel: { in: energyLevels } } });
  }

  // Apply temperament filter
  if (temperaments) {
    conditions.push({ personality: { temperament: { in: temperaments } } });
  }

  // Apply type filter
  if (type) {
    conditions.push({ type: { in: type } });
  }

  // Apply training level filter
  if (trainingLevels) {
    conditions.push({ personality: { training: { in: trainingLevels } } });
  }

  // Apply experience level filter
  if (experienceLevels) {
    conditions.push({
      adoptionInfo: { experienceLevel: { in: experienceLevels } },
    });
  }

  const [data, total] = await db.$transaction([
    db.pet.findMany({
      where: { AND: conditions },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
      include: { personality: true, adoptionInfo: true },
    }),
    db.pet.count({ where: { AND: conditions } }),
  ]);

  return { data, meta: { skip, limit, total } };
};

export const deletePetService = async (db: PrismaClient, id: string) => {
  try {
    await db.personality.deleteMany({
      where: { petId: id },
    });

    await db.adoptionInfo.deleteMany({
      where: { petId: id },
    });

    await db.pet.delete({
      where: { id },
    });

    return { message: "Successfully deleted" };
  } catch (error) {
    throw new Error("Error deleting pet");
  }
};

export const updatePetService = async (
  db: PrismaClient,
  id: string,
  petData: PetInput
) => {
  const { personality, adoptionInfo, ...petRest } = petData;

  const data: any = {
    ...petRest,
    personality: personality
      ? {
          update: personality,
        }
      : undefined,
    adoptionInfo: adoptionInfo
      ? {
          update: adoptionInfo,
        }
      : undefined,
  };

  const updatedData = await db.pet.update({
    where: { id },
    data,
    include: {
      personality: true,
      adoptionInfo: true,
    },
  });

  return updatedData;
};

export const getPetByIdService = async (db: PrismaClient, id: string) => {
  return await db.pet.findUnique({
    where: { id },
    include: {
      personality: true,
      adoptionInfo: true,
    },
  });
};
