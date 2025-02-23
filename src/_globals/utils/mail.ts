import crypto from "crypto";
import nodemailer from "nodemailer";
import { db } from "../db";

export const sendOtpEmail = async (email: string) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expirationTime = Date.now() + 15 * 60 * 1000;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found.");

  await db.user.update({
    where: { email },
    data: { otp, otpExpiration: new Date(expirationTime) },
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "billy.donnelly@ethereal.email",
      pass: "s3hPaCDHUCYvNxbMG4",
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Email Verification OTP",
    html: `<p>Your OTP is: ${otp}</p><p>This OTP will expire in 15 minutes.</p>`,
  });
};
