import { Request, Response, NextFunction } from "express";
import { badgeService } from "../services/badgeService";
import { BadgeSchema } from "../schemas/badgeSchema";

export const badgeController = {
  async createBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const input = BadgeSchema.parse(req.body); // Validate input
      const badge = await badgeService.createBadge(input);
      res.status(201).json({
        success: true,
        data: badge,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const badges = await badgeService.getBadges();
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