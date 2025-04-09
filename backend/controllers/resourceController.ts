import { Request, Response, NextFunction } from "express";
import { resourceService } from "../services/resourceService";
import { ResourceSchema } from "../schemas/resourceSchema";

export const resourceController = {
  async createResource(req: Request, res: Response, next: NextFunction) {
    try {
      const input = ResourceSchema.parse(req.body); // Validate input
      const resource = await resourceService.createResource(input);
      res.status(201).json({
        success: true,
        data: resource,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, category } = req.query;
      const resources = await resourceService.getResources({
        page: Number(page),
        limit: Number(limit),
        category: category ? String(category) : undefined,
      });
      res.status(200).json({
        success: true,
        data: resources.data,
        error: null,
        metadata: {
          timestamp: new Date().toISOString(),
          version: "1.0.0",
          pagination: resources.pagination,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = ResourceSchema.partial().parse(req.body); // Partial update
      const resource = await resourceService.updateResource(id, input);
      res.status(200).json({
        success: true,
        data: resource,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await resourceService.deleteResource(id);
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