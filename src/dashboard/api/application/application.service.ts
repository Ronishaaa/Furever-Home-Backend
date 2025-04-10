import { PrismaClient } from "@prisma/client";
import { ApplicationInput } from "./application.schema";

export const getAllApplicationsService = async (db: PrismaClient) => {
  const [data, total] = await db.$transaction([
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            images: true,
            breed: true,
          },
        },
      },
    }),
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
    include: {
      pet: {
        select: {
          id: true,
          name: true,
          images: true,
          breed: true,
          age: true,
          gender: true,
        },
      },
    },
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

export const updateApplicationService = async (
  db: PrismaClient,
  id: number,
  applicationData: ApplicationInput
) => {
  const updatedApplication = await db.application.update({
    where: { id },
    data: applicationData,
    include: {
      pet: {
        select: {
          id: true,
          name: true,
          images: true,
          breed: true,
          age: true,
          gender: true,
        },
      },
    },
  });

  return updatedApplication;
};
