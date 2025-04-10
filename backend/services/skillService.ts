import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { SkillSchema } from "../schemas/skillSchema";

const prisma = new PrismaClient();

export const skillService = {
  async createSkill(data: z.infer<typeof SkillSchema>) {
    return await prisma.skill.create({
      data,
    });
  },

  async getSkills() {
    return await prisma.skill.findMany();
  },

  async deleteSkill(id: string) {
    return await prisma.skill.delete({
      where: { id },
    });
  },
};