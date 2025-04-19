import { PrismaClient } from "@prisma/client";
import { SuccessStoryInput } from "./successStories.schema";

export const addSuccessStory = async (
  db: PrismaClient,
  data: SuccessStoryInput
) => {
  return await db.successStory.create({ data });
};

export const getSuccessStories = async (
  db: PrismaClient,
  {
    skip,
    limit,
  }: {
    skip: number;
    limit: number;
  }
) => {
  const [data, total] = await db.$transaction([
    db.successStory.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.successStory.count(),
  ]);

  return { data, meta: { skip, limit, total } };
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
