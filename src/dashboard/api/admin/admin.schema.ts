import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
