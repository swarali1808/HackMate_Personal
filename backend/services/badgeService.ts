import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { BadgeSchema } from "../schemas/badgeSchema";

const prisma = new PrismaClient();

export const badgeService = {
  async createBadge(data: z.infer<typeof BadgeSchema>) {
    const badgeData = {
      ...data,
      color: data.color || "#FFFFFF", // Default color
      image: data.image || "default-badge.png", // Default image
    };

    return await prisma.badge.create({
      data: badgeData,
    });
  },

  async getBadges() {
    return await prisma.badge.findMany();
  },
};