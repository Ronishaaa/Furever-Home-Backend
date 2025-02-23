import { PrismaClient } from "@prisma/client";
import { RescueStoryInput } from "./rescueStories.schema";

export const addRescueStory = async (
  db: PrismaClient,
  data: RescueStoryInput
) => {
  return await db.rescueStory.create({ data });
};

export const getRescueStories = async (db: PrismaClient) => {
  return await db.rescueStory.findMany({ orderBy: { createdAt: "desc" } });
};

export const getRescueStoryById = async (db: PrismaClient, id: number) => {
  return await db.rescueStory.findUnique({ where: { id } });
};

export const updateRescueStory = async (
  db: PrismaClient,
  id: number,
  data: RescueStoryInput
) => {
  return await db.rescueStory.update({ where: { id }, data });
};

export const deleteRescueStory = async (db: PrismaClient, id: number) => {
  return await db.rescueStory.delete({ where: { id } });
};
