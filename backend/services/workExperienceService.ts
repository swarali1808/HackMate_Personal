import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { WorkExperienceSchema } from "../schemas/workExperienceSchema";

const prisma = new PrismaClient();

export const workExperienceService = {
  async createWorkExperience(userId: string, data: z.infer<typeof WorkExperienceSchema>) {
    return await prisma.workExperience.create({
      data: { ...data, userId }, // Ensure all required fields are included
    });
  },

  async getWorkExperience(userId: string) {
    return await prisma.workExperience.findMany({
      where: { userId },
    });
  },

  async updateWorkExperience(id: string, data: Partial<z.infer<typeof WorkExperienceSchema>>) {
    return await prisma.workExperience.update({
      where: { id },
      data,
    });
  },

  async deleteWorkExperience(id: string) {
    return await prisma.workExperience.delete({
      where: { id },
    });
  },
};