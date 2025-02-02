import { PrismaClient } from "@prisma/client";
import { PetInput } from "./pets.schema";

const prisma = new PrismaClient();

export const addPetService = async (petData: PetInput) => {
  return await prisma.pet.create({ data: petData });
};

export const getAllPetsService = async () => {
  return await prisma.pet.findMany();
};

export const deletePetService = async (id: string) => {
  await prisma.pet.delete({
    where: { id },
  });
  return { message: "successfully deleted" };
};

export const updatePetService = async (id: string, PetData: PetInput) => {
  const updatedData = await prisma.pet.update({
    where: { id },
    data: PetData,
  });
  return updatedData;
};

export const getPetByIdService = async (id: string) => {
  return await prisma.pet.findUnique({
    where: { id },
  });
};
