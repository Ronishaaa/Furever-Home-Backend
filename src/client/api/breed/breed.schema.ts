import { z } from "zod";

export const DogInputSchema = z.object({
  max_height: z.number(),
  grooming_frequency_value: z.number(),
  shedding_value: z.number(),
  energy_level_value: z.number(),
  trainability_value: z.number(),
});

export type DogInput = z.infer<typeof DogInputSchema>;
