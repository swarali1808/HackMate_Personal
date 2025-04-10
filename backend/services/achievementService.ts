import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { AchievementSchema } from "../schemas/achievementSchema";

const prisma = new PrismaClient();

export const achievementService = {
  async createAchievement(userId: string, data: z.infer<typeof AchievementSchema>) {
    return await prisma.achievement.create({
      data: { ...data, userId }, // Ensure all required fields are included
    });
  },

  async getAchievements(userId: string) {
    return await prisma.achievement.findMany({
      where: { userId },
    });
  },

  async updateAchievement(id: string, data: Partial<z.infer<typeof AchievementSchema>>) {
    return await prisma.achievement.update({
      where: { id },
      data,
    });
  },

  async deleteAchievement(id: string) {
    return await prisma.achievement.delete({
      where: { id },
    });
  },
};