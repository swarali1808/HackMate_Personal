import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  avatarUrl: z.string().url("Invalid URL").optional(),
  interests: z.array(z.string()).optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional(),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional(),
});