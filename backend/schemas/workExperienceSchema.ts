import { z } from "zod";

export const WorkExperienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  position: z.string().min(1, "Position is required"), // Added field
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN", "FREELANCE"]), // Added field
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .optional()
    .refine((date) => (date ? !isNaN(Date.parse(date)) : true), "Invalid end date"),
  description: z.string().optional(),
});