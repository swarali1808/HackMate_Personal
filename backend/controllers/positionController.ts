import { Request, Response, NextFunction } from "express";
import { positionService } from "../services/positionService";
import { z } from "zod";
import { PositionSchema } from "../schemas/positionSchema";

export const positionController = {
  async createPosition(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = PositionSchema.parse(req.body); // Validate input
      const position = await positionService.createPosition(userId, input);
      res.status(201).json({
        success: true,
        data: position,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getPositions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const positions = await positionService.getPositions(userId);
      res.status(200).json({
        success: true,
        data: positions,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePosition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = PositionSchema.partial().parse(req.body); // Partial update
      const position = await positionService.updatePosition(id, input);
      res.status(200).json({
        success: true,
        data: position,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deletePosition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await positionService.deletePosition(id);
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