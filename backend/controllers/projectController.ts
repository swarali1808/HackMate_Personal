import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/projectService";
import { ProjectSchema } from "../schemas/projectSchema";

export const projectController = {
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const input = ProjectSchema.parse(req.body); // Validate input
      const project = await projectService.createProject(input);
      res.status(201).json({
        success: true,
        data: project,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);
      res.status(200).json({
        success: true,
        data: project,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const { hackathonId } = req.query;
      const projects = await projectService.getProjects(hackathonId as string);
      res.status(200).json({
        success: true,
        data: projects,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = ProjectSchema.partial().parse(req.body); // Partial update
      const project = await projectService.updateProject(id, input);
      res.status(200).json({
        success: true,
        data: project,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
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