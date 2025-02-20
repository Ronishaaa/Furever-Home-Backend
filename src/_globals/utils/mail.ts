import crypto from "crypto";
import nodemailer from "nodemailer";
import { db } from "../db";

export const sendOtpEmail = async (email: string) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expirationTime = Date.now() + 15 * 60 * 1000; // OTP expiration time set to 15 minutes

  await db.user.update({
    where: { email },
    data: {
      otp,
      otpExpiration: new Date(expirationTime),
    },
  });

  // Set up email transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "wendy.mclaughlin@ethereal.email",
      pass: "kUz5emCa5aM4spuHwm",
    },
  });

  // Send email
  await transporter.sendMail({
    to: email,
    subject: "Email Verification OTP",
    html: `
    <p>Your OTP is: ${otp}</p>
    <p>This OTP will expire in 15 minutes.</p>
  `,
  });
};
