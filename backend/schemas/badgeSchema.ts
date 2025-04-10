import { z } from "zod";

export const BadgeSchema = z.object({
  name: z.string().min(1, "Badge name is required"),
  description: z.string().min(1, "Badge description is required"),
  icon: z.string().url("Invalid icon URL"),
  category: z.string().optional(),
  rarity: z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY"]),
  color: z.string().optional(), // Add color as an optional field
  image: z.string().optional(), // Add image as an optional field
});