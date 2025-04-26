import { AppError } from "@exceptions";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@utils";
import { db } from "_globals/db";
import { sendOtpEmail } from "_globals/utils/otp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  LoginInput,
  RegisterInput,
  UpdateSocketInput,
  UpdateUserInput,
} from "./users.schema";

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

  if (!user.verified) {
    throw new AppError("User not verified", 403, true);
  }

  await db.user.update({
    where: { id: user.id },
    data: { socketId: data.socketId },
  });

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

export const updateSocket = async (userId: number, data: UpdateSocketInput) => {
  return db.user.update({
    where: { id: userId },
    data: { socketId: data.socketId },
    select: { id: true, socketId: true },
  });
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
    data: { verified: true, otp: null, otpExpiration: null },
  });

  return { message: "Email verified successfully" };
};

export const verifyToken = async (token: string) => {
  if (!token) {
    throw new AppError("No token provided", 401, true);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: number;
      email: string;
    };

    const user = await db.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      throw new AppError("User not found", 404, true);
    }

    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        address: user.address,
        verified: user.verified,
        otp: user.otp,
        otpExpiration: user.otpExpiration,
        socketId: user.socketId,
      },
    };
  } catch (error) {
    throw new AppError("Invalid token", 401, true);
  }
};

export const resendVerificationEmail = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });

  await sendOtpEmail(email);

  return { message: "Verification email resent successfully" };
};

export const getUser = async (db: PrismaClient, id: number) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      application: {
        select: {
          id: true,
          pet: true,
          applicationStatus: true,
          createdAt: true,
        },
      },
    },
  });
};

export const updateUser = async (
  db: PrismaClient,
  id: number,
  userData: UpdateUserInput
) => {
  const updatedUser = await db.user.update({
    where: { id },
    data: userData,
  });

  return updatedUser;
};
