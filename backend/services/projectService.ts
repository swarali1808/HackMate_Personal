import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ProjectSchema } from "../schemas/projectSchema";

const prisma = new PrismaClient();

export const projectService = {
  async createProject(data: z.infer<typeof ProjectSchema>) {
    if (!data.teamId) {
      throw new Error("The 'teamId' field is required to create a project.");
    }

    if (!data.technologyStack) {
      throw new Error("The 'technologyStack' field is required to create a project.");
    }

    if (!data.psDomain) {
      throw new Error("The 'psDomain' field is required to create a project.");
    }

    return await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        teamId: data.teamId,
        hackathonId: data.hackathonId,
        repositoryUrl: data.repositoryUrl,
        submissionUrl: data.submissionUrl,
        technologyStack: data.technologyStack,
        problemStatement: data.problemStatement,
        solutionOverview: data.solutionOverview,
        psDomain: data.psDomain,
      },
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