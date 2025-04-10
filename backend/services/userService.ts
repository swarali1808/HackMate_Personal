// src/services/userService.ts
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { UserSchema } from "../schemas/userSchema";

const prisma = new PrismaClient();

export const userService = {
  async createUser(data: z.infer<typeof UserSchema>) {
    return await prisma.user.create({
      data,
    });
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { teams: true, tasksAssigned: true, hackathons: true }, // Include related data
    });
  },

  async getUsers() {
    return await prisma.user.findMany({
      include: { teams: true, hackathons: true }, // Include related data
    });
  },

  async updateUser(id: string, data: Partial<z.infer<typeof UserSchema>>) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};