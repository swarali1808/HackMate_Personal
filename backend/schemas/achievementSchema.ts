import { z } from "zod";

export const AchievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  type: z.enum(["AWARD", "CERTIFICATION", "HONOR", "OTHER"]),
  issuingOrganization: z.string().min(1, "Issuing organization is required"), // Added field
});