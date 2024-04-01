import { z } from 'zod';

export const addCandidateSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().min(12, { message: "Phone number is not valid" }),
    dateOfBirth: z.string(),
  })
});

export const updateCandidateSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(12, { message: "Phone number is not valid" }).optional(),
    dateOfBirth: z.string().optional(),
  }).optional(),
});
