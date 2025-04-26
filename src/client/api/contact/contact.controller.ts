import { Context } from "koa";
import { ContactForm } from "./contact.schema";
import * as Service from "./contact.service";

export const contactController = async (ctx: Context) => {
  const { firstName, lastName, email, phone, subject, message } = <ContactForm>(
    ctx.request.body
  );

  await Service.handleContactMessage({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  ctx.status = 200;
  ctx.body = { success: true, message: "Message sent successfully." };
};
