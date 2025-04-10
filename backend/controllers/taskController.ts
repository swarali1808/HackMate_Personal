import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { TaskSchema } from "../schemas/taskSchema";

export const taskController = {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId } = req.params; // Team ID is passed as a parameter
      const input = TaskSchema.parse(req.body); // Validate input
      const task = await taskService.createTask(teamId, input);
      res.status(201).json({
        success: true,
        data: task,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId } = req.params; // Team ID is passed as a parameter
      const tasks = await taskService.getTasks(teamId);
      res.status(200).json({
        success: true,
        data: tasks,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Task ID is passed as a parameter
      const input = TaskSchema.partial().parse(req.body); // Partial update
      const task = await taskService.updateTask(id, input);
      res.status(200).json({
        success: true,
        data: task,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Task ID is passed as a parameter
      await taskService.deleteTask(id);
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