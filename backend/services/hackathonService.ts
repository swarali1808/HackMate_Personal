import { PrismaClient } from "@prisma/client";
import { HackathonInput } from "../types/hackathonTypes";
import { format } from "date-fns";

const prisma = new PrismaClient();

class HackathonService {
  // Method to store hackathon data
  async storeHackathonData(data: HackathonInput) {
    try {
      const formattedStartDate = format(new Date(data.startDate), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(data.endDate), "yyyy-MM-dd");

      const hackathon = await prisma.hackathon.create({
        data: {
          name: data.name,
          description: data.description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          location: data.location,
          rules: data.rules,
          prizeDetails: data.prizeDetails ?? {},
          domains: data.domains,
        },
      });

      if (data.timeline && data.timeline.length > 0) {
        await prisma.hackathonTimeline.createMany({
          data: data.timeline.map((event) => ({
            hackathonId: hackathon.id,
            eventName: event.eventName,
            eventTime: new Date(event.eventTime),
            description: event.description ?? null, // Ensure null values are preserved
          })),
        });
      }

      // Return the created Hackathon with its timeline
      const hackathonWithTimeline = await prisma.hackathon.findUnique({
        where: { id: hackathon.id },
        include: { timeline: true },
      });

      return hackathonWithTimeline;
    } catch (error: any) {
      console.error("❌ Error storing hackathon data:", error);
      throw new Error("Hackathon creation failed.");
    }
  }

  // Method to get hackathon details by ID
  async getHackathonById(id: string) {
    try {
      const hackathon = await prisma.hackathon.findUnique({
        where: { id },
        include: {
          timeline: true, // Include timeline events
          team: true, // Include associated team
          users: true, // Include associated users
        },
      });

      if (!hackathon) {
        throw new Error("Hackathon not found");
      }

      return hackathon;
    } catch (error: any) {
      console.error("❌ Error fetching hackathon by ID:", error);
      throw new Error("Failed to fetch hackathon details.");
    }
  }

  // Method to get hackathon of a particular user by their ID
  async getHackathonsByUserId(userId: string) {
    try {
      const hackathons = await prisma.hackathon.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          timeline: true, // Include timeline events
          team: true, // Include associated team
        },
      });

      return hackathons;
    } catch (error: any) {
      console.error("❌ Error fetching hackathons for user:", error);
      throw new Error("Failed to fetch hackathons for the user.");
    }
  }

  // Fetch ongoing hackathons
  async getOngoingHackathons() {
    const now = new Date().toISOString(); // Convert current date to ISO string

    return await prisma.$queryRaw`
      SELECT * FROM "Hackathon"
      WHERE "startDate" <= ${now} AND "endDate" >= ${now}
    `;
  }

  // Fetch past hackathons
  async getPastHackathons() {
    const now = new Date().toISOString(); // Convert current date to ISO string

    return await prisma.$queryRaw`
      SELECT * FROM "Hackathon"
      WHERE "endDate" < ${now}
    `;
  }

  // Fetch upcoming hackathons
  async getUpcomingHackathons() {
    const now = new Date().toISOString(); // Convert current date to ISO string

    return await prisma.$queryRaw`
      SELECT * FROM "Hackathon"
      WHERE "startDate" > ${now}
    `;
  }
}

export const hackathonService = new HackathonService();
