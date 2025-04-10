import { Request, Response, NextFunction } from "express";
import { hackathonTimelineService } from "../services/hackathonTimelineService";
import { HackathonTimelineSchema } from "../schemas/hackathonTimelineSchema";

export const hackathonTimelineController = {
  async addTimelineEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { hackathonId } = req.params;
      const input = HackathonTimelineSchema.parse(req.body); // Validate input
      const timelineEvent = await hackathonTimelineService.addTimelineEvent(hackathonId, input);
      res.status(201).json({
        success: true,
        data: timelineEvent,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getTimeline(req: Request, res: Response, next: NextFunction) {
    try {
      const { hackathonId } = req.params;
      const timeline = await hackathonTimelineService.getTimeline(hackathonId);
      res.status(200).json({
        success: true,
        data: timeline,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTimelineEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = HackathonTimelineSchema.partial().parse(req.body); // Partial update
      const updatedEvent = await hackathonTimelineService.updateTimelineEvent(id, input);
      res.status(200).json({
        success: true,
        data: updatedEvent,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteTimelineEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await hackathonTimelineService.deleteTimelineEvent(id);
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