import { Request, Response } from "express";
import { scrapeDevfolioPage } from "../services/scraperService";
import { extractHackathonData } from "../services/geminiService";
import { hackathonService } from "../services/hackathonService";

export const hackathonController = {
  async handleScrapeAndStore(req: Request, res: Response) {
    const { url } = req.body;

    try {
      // Scrape all relevant pages
      const htmlContents = await scrapeDevfolioPage(url);

      let combinedData: any = {};
      let combinedTimeline: any[] = []; // To store all timeline events

      for (const [pageUrl, html] of Object.entries(htmlContents)) {
        const data = await extractHackathonData(html);

        // Merge data from all pages
        combinedData = {
          ...combinedData,
          ...data,
          // Combine timeline data
          timeline: [
            ...(combinedData.timeline || []),
            ...(data.timeline || []),
          ],
        };
      }

      if (!combinedData.name) {
        return res.status(400).json({ error: "Failed to extract data" });
      }

      // Store the combined hackathon data
      const stored = await hackathonService.storeHackathonData(combinedData);
      res.json({ message: "Hackathon saved", stored });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Error" });
    }
  },

  async getHackathonDetails(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const hackathon = await hackathonService.getHackathonById(id);
      res.json(hackathon);
    } catch (error: any) {
      console.error("Error in getHackathonDetails:", error.message);
      res.status(404).json({ error: error.message || "Hackathon not found" });
    }
  },

  async getUserHackathons(req: Request, res: Response) {
    const { userId } = req.user.id; // Assuming userId is passed in the request body

    try {
      const hackathons = await hackathonService.getHackathonsByUserId(userId);
      res.json(hackathons);
    } catch (error: any) {
      console.error("Error in getUserHackathons:", error.message);
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch hackathons." });
    }
  },

  // Get ongoing hackathons
  async getOngoingHackathons(req: Request, res: Response) {
    try {
      const hackathons = await hackathonService.getOngoingHackathons();
      res.json(hackathons);
    } catch (error: any) {
      console.error("Error fetching ongoing hackathons:", error.message);
      res.status(500).json({ error: "Failed to fetch ongoing hackathons." });
    }
  },

  // Get past hackathons
  async getPastHackathons(req: Request, res: Response) {
    try {
      const hackathons = await hackathonService.getPastHackathons();
      res.json(hackathons);
    } catch (error: any) {
      console.error("Error fetching past hackathons:", error.message);
      res.status(500).json({ error: "Failed to fetch past hackathons." });
    }
  },

  // Get upcoming hackathons
  async getUpcomingHackathons(req: Request, res: Response) {
    try {
      const hackathons = await hackathonService.getUpcomingHackathons();
      res.json(hackathons);
    } catch (error: any) {
      console.error("Error fetching upcoming hackathons:", error.message);
      res.status(500).json({ error: "Failed to fetch upcoming hackathons." });
    }
  },
};
