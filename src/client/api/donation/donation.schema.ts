import { z } from "zod";

export const DonationSchema = z.object({
  amount: z.number().min(10, { message: "Minimum donation is 10." }),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  message: z.string().optional(),
  userId: z.number().int().optional(),
});

export const DonationVerificationSchema = z.object({
  pidx: z.string().min(1, { message: "PIDX is required." }),
});

export type DonationInput = z.infer<typeof DonationSchema>;
export type DonationVerificationInput = z.infer<
  typeof DonationVerificationSchema
>;
