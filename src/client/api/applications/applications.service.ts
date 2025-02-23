import { PrismaClient } from "@prisma/client";
import { ApplicationInput } from "./applications.schema";

export const addApplication = async (
  db: PrismaClient,
  data: ApplicationInput
) => {
  return await db.application.create({
    data,
  });
};
