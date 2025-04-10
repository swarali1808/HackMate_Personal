import { z } from "zod";

export const EducationSchema = z.object({
  type: z.enum(["SCHOOL", "COLLEGE"]),
  instituteName: z.string().min(1, "Institute name is required"),
  fieldOfStudy: z.string().optional(),
  degree: z.string().optional(),
  grade: z.number().optional(),
  startYear: z.number().min(1900).max(new Date().getFullYear()),
  endYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
});