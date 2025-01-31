import { z } from 'zod';

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  REMOTE = 'REMOTE',
  CONTRACT = 'CONTRACT',
}

export const jobInputSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  type: z.nativeEnum(JobType),
  description: z.string(),
  skills: z.array(z.string()),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  salary: z.string().optional(),
  applicationUrl: z.string().url().optional(),
});
