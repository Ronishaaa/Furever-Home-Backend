import { PrismaClient } from "@prisma/client";

export const getRescueStories = async (db: PrismaClient) => {
  return await db.rescueStory.findMany({ orderBy: { createdAt: "desc" } });
};

export const getRescueStoryById = async (db: PrismaClient, id: number) => {
  return await db.rescueStory.findUniqueOrThrow({ where: { id } });
};
