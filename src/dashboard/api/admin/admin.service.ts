import { UnauthenticatedError } from "@exceptions";
import { db } from "_globals/db";
import { generateJwt } from "_globals/utils/generatejwt";
import { compare } from "bcrypt";
import { AdminLoginInput } from "./admin.schema";

export const loginAdmin = async (data: AdminLoginInput) => {
  const admin = await db.admin.findFirstOrThrow({
    where: { email: data.email },
    select: { id: true, email: true, password: true },
  });

  const passwordMatch = await compare(data.password, admin.password);

  if (!passwordMatch) throw new UnauthenticatedError({});

  return { ...generateJwt(admin.id, "1d") };
};
