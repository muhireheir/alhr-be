import { z } from 'zod';

export const jobPostSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    requirements: z.array(z.string()).min(1),
    responsibilities: z.array(z.string()).min(1),
    location: z.string(),
    employmentType: z.string(),
    applicationDeadline: z.string(),
  })
});