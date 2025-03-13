import { EnergyLevel, Prisma, PrismaClient } from "@prisma/client";
import { WishlistInput } from "./wishlist.schema";

export const addOrUpdateWishlist = async (
  db: PrismaClient,
  data: WishlistInput
) => {
  const existingWishlist = await db.wishlist.findUnique({
    where: { userId: data.userId },
  });

  let wishlist;
  if (existingWishlist) {
    wishlist = await db.wishlist.update({
      where: { userId: data.userId },
      data,
    });
  } else {
    wishlist = await db.wishlist.create({ data });
  }

  const matchingPets = await findMatchingPets(db, {
    age: wishlist.age ?? undefined,
    breed: wishlist.breed ?? undefined,
    energyLevel: (wishlist.energyLevel as EnergyLevel) ?? undefined,
    gender: wishlist.gender ?? undefined,
  });

  return { wishlist, matchingPets };
};

export const getWishlist = async (db: PrismaClient, userId: number) => {
  return await db.wishlist.findUnique({ where: { userId } });
};

export const deleteWishlist = async (db: PrismaClient, userId: number) => {
  return await db.wishlist.delete({
    where: { userId },
  });
};

export interface FILTERS {
  age?: number | null;
  breed?: string | null;
  energyLevel?: EnergyLevel | null;
  gender?: string;
}
export const findMatchingPets = async (
  db: PrismaClient,
  { age, breed, energyLevel, gender }: FILTERS
) => {
  const conditions: Prisma.PetWhereInput[] = [];

  if (age) conditions.push({ age });
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
