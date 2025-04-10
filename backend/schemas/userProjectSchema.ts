import { z } from "zod";

export const UserProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  technologiesUsed: z.array(z.string()).min(1, "At least one technology is required"),
  deployedUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .optional()
    .refine((date) => (date ? !isNaN(Date.parse(date)) : true), "Invalid end date"),
});