import { Request, Response, NextFunction } from "express";
import { userBadgeService } from "../services/userBadgeService";

export const userBadgeController = {
  async assignBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, badgeId } = req.body;
      const userBadge = await userBadgeService.assignBadge(userId, badgeId);
      res.status(201).json({
        success: true,
        data: userBadge,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const badges = await userBadgeService.getUserBadges(userId);
      res.status(200).json({
        success: true,
        data: badges,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },
};