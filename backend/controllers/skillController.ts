import { Request, Response, NextFunction } from "express";
import { skillService } from "../services/skillService";
import { SkillSchema } from "../schemas/skillSchema";

export const skillController = {
  async createSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const input = SkillSchema.parse(req.body); // Validate input
      const skill = await skillService.createSkill(input);
      res.status(201).json({
        success: true,
        data: skill,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await skillService.getSkills();
      res.status(200).json({
        success: true,
        data: skills,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await skillService.deleteSkill(id);
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