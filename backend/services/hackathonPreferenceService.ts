import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { HackathonPreferenceSchema } from "../schemas/hackathonPreferenceSchema";

const prisma = new PrismaClient();

export const hackathonPreferenceService = {
  async createOrUpdatePreference(userId: string, data: z.infer<typeof HackathonPreferenceSchema>) {
    return await prisma.hackathonPreference.upsert({
      where: { userId },
      update: data,
      create: { ...data, userId },
    });
  },

  async getPreference(userId: string) {
    return await prisma.hackathonPreference.findUnique({
      where: { userId },
    });
  },
};