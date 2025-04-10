import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { TaskSchema } from "../schemas/taskSchema";

const prisma = new PrismaClient();

export const taskService = {
  async createTask(teamId: string, data: z.infer<typeof TaskSchema>) {
    return await prisma.task.create({
      data: { ...data, teamId },
    });
  },

  async getTasks(teamId: string) {
    return await prisma.task.findMany({
      where: { teamId },
      orderBy: { dueDate: "asc" }, // Sort tasks by due date
    });
  },

  async updateTask(id: string, data: Partial<z.infer<typeof TaskSchema>>) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  },

  async deleteTask(id: string) {
    return await prisma.task.delete({
      where: { id },
    });
  },
};