import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { EducationSchema } from "../schemas/educationSchema"; // Adjust the path if necessary

const prisma = new PrismaClient();

export const educationService = {
  async createEducation(userId: string, data: z.infer<typeof EducationSchema>) {
    return await prisma.education.create({
      data: { ...data, userId },
    });
  },

  async getEducation(userId: string) {
    return await prisma.education.findMany({
      where: { userId },
    });
  },

  async updateEducation(id: string, data: Partial<z.infer<typeof EducationSchema>>) {
    return await prisma.education.update({
      where: { id },
      data,
    });
  },

  async deleteEducation(id: string) {
    return await prisma.education.delete({
      where: { id },
    });
  },
};