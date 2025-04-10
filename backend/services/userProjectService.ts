import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { UserProjectSchema } from "../schemas/userProjectSchema";

const prisma = new PrismaClient();

export const userProjectService = {
  async createUserProject(userId: string, data: z.infer<typeof UserProjectSchema>) {
    return await prisma.userProject.create({
      data: { ...data, userId },
    });
  },

  async getUserProjects(userId: string) {
    return await prisma.userProject.findMany({
      where: { userId },
    });
  },

  async updateUserProject(id: string, data: Partial<z.infer<typeof UserProjectSchema>>) {
    return await prisma.userProject.update({
      where: { id },
      data,
    });
  },

  async deleteUserProject(id: string) {
    return await prisma.userProject.delete({
      where: { id },
    });
  },
};