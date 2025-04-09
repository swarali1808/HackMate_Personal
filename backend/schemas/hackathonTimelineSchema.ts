import { z } from "zod";

export const HackathonTimelineSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventTime: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid event time"),
  description: z.string().optional(),
});