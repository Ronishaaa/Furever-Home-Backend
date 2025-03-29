import { z } from "zod";

export const WishlistSchema = z.object({
  breed: z.string().optional(),
  ageMin: z
    .number()
    .int()
    .positive("Age must be a positive integer")
    .optional(),
  ageMax: z
    .number()
    .int()
    .positive("Age must be a positive integer")
    .optional(),
  energyLevel: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  userId: z.number().int({ message: "User ID must be an integer." }),
});

export type WishlistInput = z.infer<typeof WishlistSchema>;
