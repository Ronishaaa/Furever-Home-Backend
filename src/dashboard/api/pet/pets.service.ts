import {
  EnergyLevel,
  ExperienceLevel,
  Prisma,
  PrismaClient,
  TrainingLevel,
} from "@prisma/client";
import { io } from "dashboard";
import { PetInput } from "./pets.schema";

export const addPetService = async (db: PrismaClient, petData: PetInput) => {
  const { adoptionInfo, ...petRest } = petData;

  const data: Prisma.PetCreateInput = {
    ...petRest,

    adoptionInfo: adoptionInfo
      ? {
          create: adoptionInfo,
        }
      : undefined,
  };

  const newPet = await db.pet.create({
    data,
    include: {
      adoptionInfo: true,
    },
  });

  const matchingWishlists = await findMatchingPets(db, newPet);

  if (matchingWishlists.length > 0) {
    matchingWishlists.forEach((wishlist) => {
      if (wishlist.user?.socketId) {
        io.to(wishlist.user.socketId).emit("newPetMatch", {
          message: "A new pet matches your wishlist!",
          pet: newPet,
        });
      }
    });

    if (matchingWishlists.length > 0) {
      await db.matchedPets.createMany({
        data: matchingWishlists.map((wishlist) => ({
          wishlistId: wishlist.id,
          petId: newPet.id,
        })),
        skipDuplicates: true,
      });

      await db.notification.createMany({
        data: matchingWishlists.map((wishlist) => ({
          userId: wishlist.userId,
          wishlistId: wishlist.id,
          petId: newPet.id,
          message: `A new pet ${newPet.name} matches your wishlist criteria!`,
        })),
      });
    }
  }

  return { newPet, matchingWishlists };
};

export interface WISHLIST {
  ageMin?: number;
  ageMax?: number;
  breed?: string;
  energyLevel?: EnergyLevel;
  gender: string;
}

export const findMatchingPets = async (
  db: PrismaClient,
  { ageMax, ageMin, breed, energyLevel, gender }: WISHLIST
) => {
  const conditions: Prisma.WishlistWhereInput[] = [];

  if (ageMin) {
    conditions.push({ ageMin: { gte: Number(ageMin) } });
  }

  if (ageMax) {
    conditions.push({ ageMax: { lte: Number(ageMax) } });
  }

  if (breed) conditions.push({ breed });
  if (energyLevel) conditions.push({ energyLevel });
  if (gender) conditions.push({ gender });

  return await db.wishlist.findMany({
    where: { OR: conditions },
    select: {
      id: true,
      breed: true,
      ageMin: true,
      ageMax: true,
      gender: true,
      energyLevel: true,
      userId: true,
      user: {
        select: {
          id: true,
          socketId: true,
        },
      },
    },
  });
};
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

export const deletePetService = async (db: PrismaClient, id: number) => {
  await db.adoptionInfo.deleteMany({
    where: { petId: id },
  });

  await db.pet.delete({
    where: { id },
  });

  return { message: "Successfully deleted" };
};

export const updatePetService = async (
  db: PrismaClient,
  id: number,
  petData: PetInput
) => {
  const { adoptionInfo, ...petRest } = petData;

  const data: any = {
    ...petRest,

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
      adoptionInfo: true,
    },
  });

  return updatedData;
};

export const getPetByIdService = async (db: PrismaClient, id: number) => {
  return await db.pet.findUniqueOrThrow({
    where: { id },
    include: {
      adoptionInfo: true,
    },
  });
};
