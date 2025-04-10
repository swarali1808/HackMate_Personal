import { Request, Response, NextFunction } from "express";
import { hackathonPreferenceService } from "../services/hackathonPreferenceService";
import { HackathonPreferenceSchema } from "../schemas/hackathonPreferenceSchema";

export const hackathonPreferenceController = {
  async createOrUpdatePreference(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Assuming user ID is available in the request
      const input = HackathonPreferenceSchema.parse(req.body); // Validate input
      const preference = await hackathonPreferenceService.createOrUpdatePreference(userId, input);
      res.status(200).json({
        success: true,
        data: preference,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getPreference(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Assuming user ID is available in the request
      const preference = await hackathonPreferenceService.getPreference(userId);
      res.status(200).json({
        success: true,
        data: preference,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },
};