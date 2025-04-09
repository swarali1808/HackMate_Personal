import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractHackathonData(html: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
  You are an AI that extracts structured data from hackathon HTML content.

  From the following HTML content, extract a JSON object with this exact structure:

  {
    "name": string,
    "description": string, // Include all relevant details about the hackathon from the main page
    "startDate": string (ISO 8601 format, e.g., "2025-03-08T03:30:00Z"),
    "endDate": string (ISO 8601 format, e.g., "2025-03-09T03:30:00Z"),
    "location": string,
    "rules": string,
    "prizeDetails": object,
    "domains": string[],
    "timeline": [
      {
        "eventName": string,
        "eventTime": string (ISO 8601 format, e.g., "2025-03-08T10:00:00Z"),
        "description": string | null
      }
    ]
  }

  Instructions:

  - Ensure the "description" field includes all relevant details about the hackathon, such as its purpose, theme, and any unique features.
  - Focus on extracting the "timeline" field from sections labeled with keywords like:
    - "Schedule"
    - "Timeline"
    - "Agenda"
    - "Program"
    - or any similar heading or section that lists events with their corresponding times.
  - Look for events listed in tables, lists, or divs. Extract the event name, time, and description. If the description is missing, set it to null.
  - Ensure all dates (e.g., "startDate," "endDate," and "eventTime") are in proper ISO 8601 format (e.g., "2025-03-08T03:30:00Z").
  - If the timeline is not explicitly provided, infer it from the content or return an empty array.
  - Exclude irrelevant data or generic content that does not belong to the specific hackathon.
  - The "domains" field should contain an array of the **tracks, domains, themes, focus areas, or challenge categories** of the hackathon.
    - These could be labeled in the HTML as:
      - "Tracks"
      - "Themes"
      - "Problem Statements"
      - "Domains"
      - "Focus Areas"
      - "Challenge Areas"
      - "What You Can Build"
      - "Categories"
      - or any heading or list that hints at areas of innovation or project directions.
  - Examples of valid values for "domains" include:
    "Web Development", "Artificial Intelligence", "Healthcare", "Sustainability", "Cybersecurity", "Blockchain", "Open Innovation", "Fintech", "IoT", "EdTech", etc.
  - Even if there is no direct label like "Tracks" or "Themes," infer them intelligently from context — especially if multiple similar phrases are grouped or listed.

  Your goal is to intelligently extract and format the data as described above.

  Only return pure JSON. No extra explanation, no markdown.
  `;

  try {
    const result = await model.generateContent([prompt + "\n\n" + html]);

    const text = result.response.text();
    try {
      const parsedData = JSON.parse(text);

      // Ensure the timeline field is preserved
      if (!Array.isArray(parsedData.timeline)) {
        parsedData.timeline = [];
      }

      return parsedData;
    } catch (error) {
      console.warn("⚠️ Raw JSON parsing failed. Trying to repair...");
      const fixed = jsonrepair(text);

      const repairedData = JSON.parse(fixed);

      // Ensure the timeline field is preserved
      if (!Array.isArray(repairedData.timeline)) {
        repairedData.timeline = [];
      }

      return repairedData;
    }
  } catch (err) {
    console.error("🚨 Gemini API failed:", err);
    throw new Error("Gemini output parsing failed.");
  }
}
