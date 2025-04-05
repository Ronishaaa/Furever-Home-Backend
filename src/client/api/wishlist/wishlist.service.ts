import { EnergyLevel, Prisma, PrismaClient } from "@prisma/client";
import { WishlistInput } from "./wishlist.schema";

export const addOrUpdateWishlist = async (
  db: PrismaClient,
  data: WishlistInput
) => {
  const existingWishlist = await db.wishlist.findUnique({
    where: { userId: data.userId },
    include: { MatchedPets: true },
  });

  let wishlist;
  if (existingWishlist) {
    wishlist = await db.wishlist.update({
      where: { userId: data.userId },
      data: {
        breed: data.breed,
        ageMax: data.ageMax,
        ageMin: data.ageMin,
        energyLevel: data.energyLevel,
        gender: data.gender,
      },
      include: { MatchedPets: true },
    });

    await db.matchedPets.deleteMany({
      where: { wishlistId: wishlist.id },
    });
  } else {
    wishlist = await db.wishlist.create({
      data: {
        userId: data.userId,
        breed: data.breed,
        ageMax: data.ageMax,
        ageMin: data.ageMin,
        energyLevel: data.energyLevel,
        gender: data.gender,
      },
      include: { MatchedPets: true },
    });
  }

  const matchingPets = await findMatchingPets(db, {
    ageMax: data.ageMax,
    ageMin: data.ageMin,
    breed: data.breed,
    energyLevel: data.energyLevel as EnergyLevel,
    gender: data.gender,
  });

  if (matchingPets.length > 0) {
    await db.matchedPets.createMany({
      data: matchingPets.map((pet) => ({
        wishlistId: wishlist.id,
        petId: pet.id,
      })),
      skipDuplicates: true,
    });
  }

  return { ...wishlist, pets: matchingPets };
};

export const getWishlist = async (db: PrismaClient, userId: number) => {
  return await db.wishlist.findFirst({
    where: { userId },
    include: {
      MatchedPets: { include: { pet: true } },
    },
  });
};

export interface FILTERS {
  ageMin?: number | null;
  ageMax?: number | null;
  breed?: string | null;
  energyLevel?: EnergyLevel | null;
  gender?: string;
}

export const findMatchingPets = async (
  db: PrismaClient,
  { ageMax, ageMin, breed, energyLevel, gender }: FILTERS
) => {
  const conditions: Prisma.PetWhereInput[] = [];

  if (ageMin) {
    conditions.push({ age: { gte: Number(ageMin) } });
  }

  if (ageMax) {
    conditions.push({ age: { lte: Number(ageMax) } });
  }

  if (breed) conditions.push({ breed });
  if (energyLevel) conditions.push({ energyLevel });
  if (gender) conditions.push({ gender });

  return await db.pet.findMany({
    where: { AND: conditions },
    select: {
      id: true,
      name: true,
      images: true,
      breed: true,
      age: true,
      gender: true,
      energyLevel: true,
      adoptionStatus: true,
    },
  });
};
