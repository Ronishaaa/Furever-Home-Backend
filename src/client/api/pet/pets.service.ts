import {
  EnergyLevel,
  ExperienceLevel,
  Prisma,
  PrismaClient,
  TrainingLevel,
} from "@prisma/client";

export interface FILTERS {
  searchTerm: string;
  ageMin?: number;
  ageMax?: number;
  gender?: string;
  energyLevels?: EnergyLevel[];
  personality?: string[];
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
    personality,
    trainingLevels,
    experienceLevels,
    skip,
    limit,
    sortBy,
    sortOrder,
  }: FILTERS
) => {
  const conditions: Prisma.PetWhereInput[] = [];

  conditions.push({
    adoptionStatus: { not: "Adopted" },
  });

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
    conditions.push({ energyLevel: { in: energyLevels } });
  }

  // Apply temperament filter
  if (personality) {
    conditions.push({ personality: { hasSome: personality } });
  }

  // Apply training level filter
  if (trainingLevels) {
    conditions.push({ trainingLevel: { in: trainingLevels } });
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
      include: { adoptionInfo: true },
    }),
    db.pet.count({ where: { AND: conditions } }),
  ]);

  return { data, meta: { skip, limit, total } };
};

export const getPetByIdService = async (db: PrismaClient, id: number) => {
  return await db.pet.findUniqueOrThrow({
    where: { id },
    include: {
      adoptionInfo: true,
    },
  });
};

export const getSimilarPetsService = async (
  db: PrismaClient,
  petId: number
) => {
  const pet = await db.pet.findUnique({
    where: { id: petId },
    include: { adoptionInfo: true },
  });

  if (!pet) {
    throw new Error("Pet not found");
  }

  const conditions: Prisma.PetWhereInput = {
    id: { not: petId },
    AND: [
      {
        OR: [
          { breed: pet.breed },
          { personality: { hasSome: pet.personality } },
        ],
      },
    ],
  };

  const similarPets = await db.pet.findMany({
    where: conditions,
    take: 4,
    include: { adoptionInfo: true },
  });

  return similarPets;
};
