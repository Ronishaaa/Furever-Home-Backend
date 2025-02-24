import { PrismaClient } from "@prisma/client";

export const getAllApplicationsService = async (db: PrismaClient) => {
  const [data, total] = await db.$transaction([
    db.application.findMany({ orderBy: { createdAt: "desc" } }),
    db.application.count(),
  ]);

  return { data, meta: { total } };
};

export const getApplicationByIdService = async (
  db: PrismaClient,
  id: number
) => {
  return await db.application.findUniqueOrThrow({
    where: { id },
  });
};

export const deleteApplicationService = async (
  db: PrismaClient,
  id: number
) => {
  await db.application.delete({
    where: { id },
  });

  return { message: "Successfully deleted application" };
};
