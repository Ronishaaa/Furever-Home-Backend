import { AppError } from "@exceptions";
import { hashPassword } from "@utils";
import { db } from "_globals/db";
import { sendOtpEmail } from "_globals/utils/mail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginInput, RegisterInput } from "./users.schema";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("Email already exist", 400, true);
  }
  const passwordHash = await hashPassword(data.password);
  const user = await db.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: passwordHash,
    },
  });

  await sendOtpEmail(data.email);
  return user;
};

export const loginUser = async (data: LoginInput) => {
  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new AppError("Email or password invalid", 401, true);
  }

  const isPasswordMatched = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError("Email or password invalid", 401, true);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    }
  );
  if (!user.verified) {
    throw new AppError("User is not verified", 400, true);
  }
  return { token, user };
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("User not found", 404, true);
  }

  if (user.otpExpiration && Date.now() > user.otpExpiration.getTime()) {
    throw new AppError("OTP expired", 400, true);
  }

  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", 400, true);
  }

  await db.user.update({
    where: { email },
    data: { verified: true, otp: null, otpExpiration: null }, // Mark as verified and clear OTP
  });

  return { message: "Email verified successfully" };
};
