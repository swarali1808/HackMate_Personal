import { Request, Response, NextFunction } from "express";
import { educationService } from "../services/educationService";
import { z } from "zod";
import { EducationSchema } from "../schemas/educationSchema";

export const educationController = {
  async createEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = EducationSchema.parse(req.body); // Validate input
      const education = await educationService.createEducation(userId, input);
      res.status(201).json({
        success: true,
        data: education,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const education = await educationService.getEducation(userId);
      res.status(200).json({
        success: true,
        data: education,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = EducationSchema.partial().parse(req.body); // Partial update
      const education = await educationService.updateEducation(id, input);
      res.status(200).json({
        success: true,
        data: education,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await educationService.deleteEducation(id);
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