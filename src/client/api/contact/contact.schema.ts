import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message cannot be empty"),
});

export type ContactForm = z.infer<typeof contactSchema>;
