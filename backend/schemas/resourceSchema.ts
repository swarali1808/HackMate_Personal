import { z } from "zod";

export const ResourceSchema = z.object({
  title: z.string().min(1, "Resource title is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL"),
  category: z.string().min(1, "Category is required"),
});