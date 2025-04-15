// utils/mail.ts
import { createTransport, getTestMessageUrl } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "raphael.konopelski@ethereal.email",
    pass: "UhpFSUdH6XKswtWM1u",
  },
});

interface SendMailParams {
  to: string | string[];
  subject: string;
  text?: string;
  html: string;
  from?: string;
}

export const sendMail = async ({
  to,
  subject,
  text = "HTML not supported",
  html,
  from = "pascale.keebler71@ethereal.email",
}: SendMailParams) => {
  try {
    await transporter.verify();

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log("Preview URL:", getTestMessageUrl(info));

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
