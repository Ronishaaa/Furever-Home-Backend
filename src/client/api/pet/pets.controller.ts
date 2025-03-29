import { EnergyLevel, ExperienceLevel, TrainingLevel } from "@prisma/client";
import { Context } from "koa";
import * as PetService from "./pets.service";

export const getAllPets = async (ctx: Context) => {
  const {
    searchTerm,
    ageMin,
    ageMax,
    gender,
    energyLevels,
    trainingLevels,
    experienceLevels,
    personality,
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
    personality: personality
      ? Array.isArray(personality)
        ? personality
        : [personality]
      : undefined,
    energyLevels: energyLevels
      ? Array.isArray(energyLevels)
        ? (energyLevels as EnergyLevel[])
        : ([energyLevels] as EnergyLevel[])
      : undefined,
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

  ctx.status = 200;
  ctx.body = { data, meta };
};

export const getPetById = async (ctx: Context) => {
  const { id } = ctx.params;
  const pet = await PetService.getPetByIdService(ctx.db, Number(id));

  if (!pet) {
    ctx.throw(404, "Pet not found");
  }

  ctx.status = 200;
  ctx.body = { pet };
};
