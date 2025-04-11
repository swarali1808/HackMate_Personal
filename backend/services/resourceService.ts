import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ResourceSchema } from "../schemas/resourceSchema";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const resourceService = {
  async createResource(data: z.infer<typeof ResourceSchema>) {
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-"); // Generate slug if not provided
    return await prisma.resource.create({
      data: {
        ...data,
        slug,
      },
    });
  },

  async getResources(options: { page: number; limit: number; category?: string }) {
    const { page, limit, category } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
      prisma.resource.findMany({
        where: category ? { category } : undefined,
        skip,
        take: limit,
      }),
      prisma.resource.count({
        where: category ? { category } : undefined,
      }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getResourceBySlug(slug: string) {
    return await prisma.resource.findUnique({
      where: { slug },
    });
  },

  async updateResource(id: string, data: Partial<z.infer<typeof ResourceSchema>>) {
    if (data.title && !data.slug) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, "-"); // Update slug if title changes
    }
    return await prisma.resource.update({
      where: { id },
      data,
    });
  },

  async deleteResource(id: string) {
    return await prisma.resource.delete({
      where: { id },
    });
  },
};