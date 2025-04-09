import { z } from "zod";

export const HackathonPreferenceSchema = z.object({
  rolePreferences: z.array(z.string()).min(1, "At least one role preference is required"),
  domainInterests: z.array(z.string()).min(1, "At least one domain interest is required"),
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  teamSize: z.number().optional(),
  workStyle: z.enum(["COLLABORATIVE", "INDEPENDENT", "FLEXIBLE"]),
});