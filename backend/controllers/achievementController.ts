import { Request, Response, NextFunction } from "express";
import { achievementService } from "../services/achievementService";
import { z } from "zod";
import { AchievementSchema } from "../schemas/achievementSchema";

export const achievementController = {
  async createAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = AchievementSchema.parse(req.body); // Validate input
      const achievement = await achievementService.createAchievement(userId, input);
      res.status(201).json({
        success: true,
        data: achievement,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getAchievements(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const achievements = await achievementService.getAchievements(userId);
      res.status(200).json({
        success: true,
        data: achievements,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = AchievementSchema.partial().parse(req.body); // Partial update
      const achievement = await achievementService.updateAchievement(id, input);
      res.status(200).json({
        success: true,
        data: achievement,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteAchievement(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await achievementService.deleteAchievement(id);
      res.status(204).json({
        success: true,
        data: null,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },
};