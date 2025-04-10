import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { CertificateSchema } from "../schemas/certificateSchema";

const prisma = new PrismaClient();

export const certificateService = {
  async createCertificate(userId: string, data: z.infer<typeof CertificateSchema>) {
    return await prisma.certificate.create({
      data: { ...data, userId },
    });
  },

  async getCertificates(userId: string) {
    return await prisma.certificate.findMany({
      where: { userId },
    });
  },

  async updateCertificate(id: string, data: Partial<z.infer<typeof CertificateSchema>>) {
    return await prisma.certificate.update({
      where: { id },
      data,
    });
  },

  async deleteCertificate(id: string) {
    return await prisma.certificate.delete({
      where: { id },
    });
  },
};