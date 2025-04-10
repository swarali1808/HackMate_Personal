import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid due date"),
  assignedTo: z.string().optional(), // User ID of the assignee
});