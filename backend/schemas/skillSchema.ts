import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"), // Skill name must be provided
  category: z.string().optional(), // Category is optional
});