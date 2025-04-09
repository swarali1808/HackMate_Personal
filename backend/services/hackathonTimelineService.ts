import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { HackathonTimelineSchema } from "../schemas/hackathonTimelineSchema";

const prisma = new PrismaClient();

export const hackathonTimelineService = {
  async addTimelineEvent(hackathonId: string, data: z.infer<typeof HackathonTimelineSchema>) {
    return await prisma.hackathonTimeline.create({
      data: { ...data, hackathonId },
    });
  },

  async getTimeline(hackathonId: string) {
    return await prisma.hackathonTimeline.findMany({
      where: { hackathonId },
      orderBy: { eventTime: "asc" },
    });
  },

  async updateTimelineEvent(id: string, data: Partial<z.infer<typeof HackathonTimelineSchema>>) {
    return await prisma.hackathonTimeline.update({
      where: { id },
      data,
    });
  },

  async deleteTimelineEvent(id: string) {
    return await prisma.hackathonTimeline.delete({
      where: { id },
    });
  },
};