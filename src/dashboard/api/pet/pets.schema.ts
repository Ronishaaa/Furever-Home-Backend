import {
  AdoptionStatus,
  EnergyLevel,
  ExperienceLevel,
  TrainingLevel,
} from "@prisma/client";
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
  images: z.array(z.string()).optional(),
  energyLevel: z.nativeEnum(EnergyLevel),
  trainingLevel: z.nativeEnum(TrainingLevel),
  strangerBehavior: z.string().optional(),
  specialTraits: z.string().optional(),
  personality: z.array(z.string()),
  adoptionInfo: z
    .object({
      idealHome: z.string().optional(),
      childrenFriendly: z.boolean(),
      otherPetsFriendly: z.boolean(),
      experienceLevel: z.nativeEnum(ExperienceLevel),
      specialNeeds: z.string().optional(),
    })
    .optional(),
});

export type PetInput = z.infer<typeof PetSchema>;
