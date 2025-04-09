import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ProjectSchema } from "../schemas/projectSchema";

const prisma = new PrismaClient();

export const projectService = {
  async createProject(data: z.infer<typeof ProjectSchema>) {
    return await prisma.project.create({
      data,
    });
  },

  async getProjectById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
      include: { tasks: true, team: true, members: true }, // Include related data
    });
  },

  async getProjects(hackathonId: string) {
    return await prisma.project.findMany({
      where: { hackathonId },
      include: { tasks: true, team: true }, // Include related data
    });
  },

  async updateProject(id: string, data: Partial<z.infer<typeof ProjectSchema>>) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  },

  async deleteProject(id: string) {
    return await prisma.project.delete({
      where: { id },
    });
  },
};