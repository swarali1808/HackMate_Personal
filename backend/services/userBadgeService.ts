import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userBadgeService = {
  async assignBadge(userId: string, badgeId: string) {
    return await prisma.userBadge.create({
      data: {
        userId,
        badgeId,
      },
    });
  },

  async getUserBadges(userId: string) {
    return await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    });
  },
};