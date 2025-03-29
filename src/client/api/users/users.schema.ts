import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().trim().min(1, { message: "First name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be minimum 6 characters long" }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
  socketId: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const UpdateSocketSchema = z.object({
  socketId: z.string().min(1, { message: "Socket ID is required" }),
});

export type UpdateSocketInput = z.infer<typeof UpdateSocketSchema>;
