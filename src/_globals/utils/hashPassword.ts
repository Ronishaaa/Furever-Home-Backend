import bcrypt from "bcrypt";
import { AppError } from "../exceptions";

export const hashPassword = async (password: string): Promise<string> => {
  const SALT_WORK_FACTOR = 10;

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // hash the password with salt
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new AppError("Password hashing failed", 400, true);
  }
};
