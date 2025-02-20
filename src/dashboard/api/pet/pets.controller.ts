import { AppError } from "@exceptions";
import {
  EnergyLevel,
  ExperienceLevel,
  Temperament,
  TrainingLevel,
} from "@prisma/client";
import cloudinary from "_globals/utils/cloudinary";
import { optimizeImage } from "_globals/utils/sharpOptimize";
import { Context } from "koa";
import { PetInput } from "./pets.schema";
import * as PetService from "./pets.service";

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
  const pet = await PetService.addPetService(
    ctx.db,
    <PetInput>ctx.request.body
  );

  ctx.status = 201;
  ctx.body = { pet };
};

export const deletePet = async (ctx: Context) => {
  const { id } = ctx.params;
  const response = await PetService.deletePetService(ctx.db, id);
  ctx.status = 200;
  ctx.body = response;
};

export const updatePet = async (ctx: Context) => {
  const { id } = ctx.params;

  const updatedPet = await PetService.updatePetService(
    ctx.db,
    id,
    <PetInput>ctx.request.body
  );

  ctx.status = 200;
  ctx.body = { pet: updatedPet };
};

export const getAllPets = async (ctx: Context) => {
  const {
    searchTerm,
    ageMin,
    ageMax,
    gender,
    energyLevels,
    temperaments,
    type,
    trainingLevels,
    experienceLevels,
    skip = 0,
    limit,
    sortBy = "createdAt",
    sortOrder = "asc",
  } = ctx.query;

  const { data, meta } = await PetService.getAllPetsService(ctx.db, {
    searchTerm: searchTerm?.toString() ?? "",
    ageMin: ageMin ? Number(ageMin) : undefined,
    ageMax: ageMax ? Number(ageMax) : undefined,
    gender: gender?.toString() ?? "",
    energyLevels: energyLevels
      ? Array.isArray(energyLevels)
        ? (energyLevels as EnergyLevel[])
        : ([energyLevels] as EnergyLevel[])
      : undefined,
    temperaments: temperaments
      ? Array.isArray(temperaments)
        ? (temperaments as Temperament[])
        : ([temperaments] as Temperament[])
      : undefined,
    type: type ? (Array.isArray(type) ? type : [type]) : undefined,
    trainingLevels: trainingLevels
      ? Array.isArray(trainingLevels)
        ? (trainingLevels as TrainingLevel[])
        : ([trainingLevels] as TrainingLevel[])
      : undefined,
    experienceLevels: experienceLevels
      ? Array.isArray(experienceLevels)
        ? (experienceLevels as ExperienceLevel[])
        : ([experienceLevels] as ExperienceLevel[])
      : undefined,
    skip: Number(skip) || 0,
    limit: Number(limit) || 10,
    sortBy: sortBy?.toString() ?? "createdAt",
    sortOrder: sortOrder === "desc" ? "desc" : "asc",
  });

  // Return the response with the data and pagination metadata
  ctx.status = 200;
  ctx.body = { data, meta };
};

export const getPetById = async (ctx: Context) => {
  const { id } = ctx.params;
  const pet = await PetService.getPetByIdService(ctx.db, id);

  if (!pet) {
    ctx.throw(404, "Pet not found");
  }

  ctx.status = 200;
  ctx.body = { pet };
};
