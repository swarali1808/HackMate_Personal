import { Request, Response, NextFunction } from "express";
import { workExperienceService } from "../services/workExperienceService";
import { z } from "zod";
import { WorkExperienceSchema } from "../schemas/workExperienceSchema";

export const workExperienceController = {
  async createWorkExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = WorkExperienceSchema.parse(req.body); // Validate input
      const workExperience = await workExperienceService.createWorkExperience(userId, input);
      res.status(201).json({
        success: true,
        data: workExperience,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getWorkExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const workExperience = await workExperienceService.getWorkExperience(userId);
      res.status(200).json({
        success: true,
        data: workExperience,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateWorkExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = WorkExperienceSchema.partial().parse(req.body); // Partial update
      const workExperience = await workExperienceService.updateWorkExperience(id, input);
      res.status(200).json({
        success: true,
        data: workExperience,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteWorkExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await workExperienceService.deleteWorkExperience(id);
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