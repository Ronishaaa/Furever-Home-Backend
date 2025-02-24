import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const ApplicationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  address: z.string().min(1, { message: "Address is required." }),
  householdMembers: z
    .string()
    .min(1, { message: "Please specify household members." }),

  homeOwnership: z.boolean({
    invalid_type_error: "Home ownership must be a boolean.",
  }),
  petAllowed: z.boolean({
    invalid_type_error: "Pet allowed must be a boolean.",
  }),
  outdoorArea: z.boolean({
    invalid_type_error: "Outdoor area must be a boolean.",
  }),

  aloneHours: z
    .number({ invalid_type_error: "Alone hours must be a number." })
    .min(0, { message: "Hours cannot be negative." })
    .max(24, { message: "Hours cannot exceed 24." }),

  otherPetsInfo: z
    .string()
    .min(1, { message: "Please specify if you have other pets." }),
  neuteredPets: z.boolean({
    invalid_type_error: "Neutered pets must be a boolean.",
  }),
  upcomingEvents: z.string().optional(),
  applicationStatus: z.nativeEnum(ApplicationStatus).default("Pending"),
  userId: z.number().int({ message: "User ID must be an integer." }),
  petId: z.number().int({ message: "Pet ID must be an integer." }),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
