import { PrismaClient } from "@prisma/client";
import { SuccessStoryInput } from "./successStories.schema";

export const addSuccessStory = async (
  db: PrismaClient,
  data: SuccessStoryInput
) => {
  return await db.successStory.create({ data });
};

export const getSuccessStories = async (db: PrismaClient) => {
  return await db.successStory.findMany({ orderBy: { createdAt: "desc" } });
};

export const getSuccessStoryById = async (db: PrismaClient, id: number) => {
  return await db.successStory.findUnique({ where: { id } });
};

export const updateSuccessStory = async (
  db: PrismaClient,
  id: number,
  data: SuccessStoryInput
) => {
  return await db.successStory.update({ where: { id }, data });
};

export const deleteSuccessStory = async (db: PrismaClient, id: number) => {
  return await db.successStory.delete({ where: { id } });
};
