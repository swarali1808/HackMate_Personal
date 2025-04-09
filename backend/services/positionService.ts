import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { PositionSchema } from "../schemas/positionSchema";

const prisma = new PrismaClient();

export const positionService = {
  async createPosition(userId: string, data: z.infer<typeof PositionSchema>) {
    return await prisma.position.create({
      data: { ...data, userId },
    });
  },

  async getPositions(userId: string) {
    return await prisma.position.findMany({
      where: { userId },
    });
  },

  async updatePosition(id: string, data: Partial<z.infer<typeof PositionSchema>>) {
    return await prisma.position.update({
      where: { id },
      data,
    });
  },

  async deletePosition(id: string) {
    return await prisma.position.delete({
      where: { id },
    });
  },
};