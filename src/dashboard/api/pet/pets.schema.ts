import { AdoptionStatus } from "@prisma/client";
import { z } from "zod";

export const PetSchema = z.object({
  name: z.string().min(1, { message: "Pet name is required" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  age: z.number().min(0, { message: "Age must be a positive number" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  color: z.string().optional(),
  healthCondition: z.string().optional(),
  vaccination: z.boolean(),
  adoptionStatus: z.nativeEnum(AdoptionStatus, {
    message: "Invalid adoption status",
  }),
  type: z.string().trim().min(1, { message: "Pet type is required" }),
  images: z.array(z.string()).optional(),
});

export type PetInput = z.infer<typeof PetSchema>;
