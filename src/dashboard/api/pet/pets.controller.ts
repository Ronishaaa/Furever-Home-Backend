import { AppError } from "@exceptions";
import cloudinary from "_globals/utils/cloudinary";
import { optimizeImage } from "_globals/utils/sharpOptimize";
import { Context } from "koa";
import { PetSchema } from "./pets.schema";
import {
  addPetService,
  deletePetService,
  getAllPetsService,
  getPetByIdService,
  updatePetService,
} from "./pets.service";

export const storeImages = async (ctx: Context) => {
  if (!ctx.request.files || !Array.isArray(ctx.request.files)) {
    throw new AppError("No files uploaded", 400, true);
  }

  const uploadResults = await Promise.all(
    ctx.request.files.map(async (file) => {
      const optimizedFile = await optimizeImage(file.buffer, file.mimetype);
      return await cloudinary(optimizedFile, "pets");
    })
  );

  const response = uploadResults.map(({ secure_url, created_at }) => ({
    uri: secure_url,
    createdAt: created_at,
  }));

  ctx.status = 201;
  ctx.body = { images: response };
};

export const addPet = async (ctx: Context) => {
  try {
    const petData = PetSchema.parse(ctx.request.body);

    const pet = await addPetService(petData);

    ctx.status = 201;
    ctx.body = { pet };
  } catch (error: any) {
    console.error("Error adding pet:", error.message || error);
    ctx.throw(400, error.message || "Invalid input data");
  }
};

export const deletePet = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const response = await deletePetService(id);
    ctx.status = 200;
    ctx.body = response;
  } catch (error: any) {
    console.error("Error deleting pet:", error.message || error);
    ctx.throw(400, error.message || "Failed to delete pet");
  }
};

export const updatePet = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const petData = PetSchema.parse(ctx.request.body);

    const updatedPet = await updatePetService(id, petData);

    ctx.status = 200;
    ctx.body = { pet: updatedPet };
  } catch (error: any) {
    console.error("Error updating pet:", error.message || error);
    ctx.throw(400, error.message || "Failed to update pet");
  }
};

export const getAllPets = async (ctx: Context) => {
  try {
    const data = await getAllPetsService();

    ctx.status = 200;
    ctx.body = { data };
  } catch (error: any) {
    console.error("Error fetching pets:", error.message || error);
    ctx.throw(500, "Failed to fetch pets");
  }
};

export const getPetById = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const pet = await getPetByIdService(id);

    if (!pet) {
      ctx.throw(404, "Pet not found");
    }

    ctx.status = 200;
    ctx.body = { pet };
  } catch (error: any) {
    console.error("Error fetching pet:", error.message || error);
    ctx.throw(500, "Failed to fetch pet");
  }
};
