import { z } from "zod";

export const DogInputSchema = z.object({
  grooming: z.number().min(1).max(5),
  shedding: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  trainability: z.number().min(1).max(5),
  lifestyle: z.enum(["active", "moderate", "sedentary"]),
  home_type: z.enum(["apartment", "townhouse", "house", "farm"]),
  experience_level: z.enum(["first-time", "experienced"]),
});

export type DogInput = z.infer<typeof DogInputSchema>;
