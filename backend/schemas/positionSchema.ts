import { z } from "zod";

export const PositionSchema = z.object({
  position: z.string().min(1, "Position is required"),
  organization: z.string().min(1, "Organization is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .optional()
    .refine((date) => (date ? !isNaN(Date.parse(date)) : true), "Invalid end date"),
  description: z.string().optional(),
});