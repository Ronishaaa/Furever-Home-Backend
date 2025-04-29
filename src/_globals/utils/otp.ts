import { db } from "../db";
import { sendMail } from "./mail";

export const sendOtpEmail = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationTime = Date.now() + 15 * 60 * 1000;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found.");

  await db.user.update({
    where: { email },
    data: { otp, otpExpiration: new Date(expirationTime) },
  });

  const html = `
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>This OTP will expire in 15 minutes.</p>
  `;

  await sendMail({
    to: email,
    subject: "Email Verification OTP",
    html,
  });
};
