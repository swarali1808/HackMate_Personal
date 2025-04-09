import { Request, Response, NextFunction } from "express";
import { userProjectService } from "../services/userProjectService";
import { z } from "zod";
import { UserProjectSchema } from "../schemas/userProjectSchema";

export const userProjectController = {
  async createUserProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = UserProjectSchema.parse(req.body); // Validate input
      const userProject = await userProjectService.createUserProject(userId, input);
      res.status(201).json({
        success: true,
        data: userProject,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const userProjects = await userProjectService.getUserProjects(userId);
      res.status(200).json({
        success: true,
        data: userProjects,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUserProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = UserProjectSchema.partial().parse(req.body); // Partial update
      const userProject = await userProjectService.updateUserProject(id, input);
      res.status(200).json({
        success: true,
        data: userProject,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUserProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userProjectService.deleteUserProject(id);
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