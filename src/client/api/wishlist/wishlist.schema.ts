import { z } from "zod";

export const WishlistSchema = z.object({
  breed: z.string().min(1, "Breed is required").optional(),
  age: z.number().int().positive("Age must be a positive integer").optional(),
  energyLevel: z.string().min(1, "Energy level is required").optional(),
  gender: z.string().min(1, "Gender is required"),
  userId: z.number().int({ message: "User ID must be an integer." }),
});

export type WishlistInput = z.infer<typeof WishlistSchema>;
