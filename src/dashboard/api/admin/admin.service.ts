import { AppError } from "@exceptions";
import jwt from "jsonwebtoken";
import { AdminLoginInput } from "./admin.schema";

const ADMIN = {
  email: "admin@gmail.com",
  password: "admin123",
};

export const loginAdmin = async (data: AdminLoginInput) => {
  if (data.email !== ADMIN.email) {
    throw new AppError("Invalid email or password", 401, true);
  }

  if (data.password !== ADMIN.password) {
    throw new AppError("Invalid email or password", 401, true);
  }

  const token = jwt.sign(
    { email: ADMIN.email, role: "admin" },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  return { token, admin: { email: ADMIN.email } };
};
