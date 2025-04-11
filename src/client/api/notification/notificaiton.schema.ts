import { z } from "zod";

export const NotificationResponseSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.date(),
  pet: z.object({
    id: z.number(),
    name: z.string(),
    images: z.array(z.string()).optional(),
    breed: z.string().optional(),
  }),
  wishlist: z
    .object({
      id: z.number(),
      breed: z.string().optional(),
    })
    .optional(),
});

export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;
