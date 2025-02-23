import { z } from "zod";

export const SuccessStorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .array(z.string().min(1))
    .nonempty("At least one paragraph is required"),
  images: z.array(z.string()).optional(),
  adoptionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type SuccessStoryInput = z.infer<typeof SuccessStorySchema>;
