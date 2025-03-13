import { PrismaClient } from "@prisma/client";

export const getSuccessStories = async (db: PrismaClient) => {
  return await db.successStory.findMany({ orderBy: { createdAt: "desc" } });
};

export const getSuccessStoryById = async (db: PrismaClient, id: number) => {
  return await db.successStory.findUnique({ where: { id } });
};
