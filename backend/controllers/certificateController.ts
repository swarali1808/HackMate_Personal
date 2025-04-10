import { Request, Response, NextFunction } from "express";
import { certificateService } from "../services/certificateService";
import { z } from "zod";
import { CertificateSchema } from "../schemas/certificateSchema";

export const certificateController = {
  async createCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Authenticated user ID
      const input = CertificateSchema.parse(req.body); // Validate input
      const certificate = await certificateService.createCertificate(userId, input);
      res.status(201).json({
        success: true,
        data: certificate,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async getCertificates(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const certificates = await certificateService.getCertificates(userId);
      res.status(200).json({
        success: true,
        data: certificates,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input = CertificateSchema.partial().parse(req.body); // Partial update
      const certificate = await certificateService.updateCertificate(id, input);
      res.status(200).json({
        success: true,
        data: certificate,
        error: null,
        metadata: { timestamp: new Date().toISOString(), version: "1.0.0" },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await certificateService.deleteCertificate(id);
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