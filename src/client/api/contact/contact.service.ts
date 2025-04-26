import { sendMail } from "@utils";

interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const handleContactMessage = async ({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}: ContactMessage) => {
  await sendMail({
    to: "ronisha.shrestha03@gmail.com",
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>Contact Message</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};
