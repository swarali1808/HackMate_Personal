import puppeteer from "puppeteer";
import { load } from "cheerio";

/**
 * Scrape a webpage and return its HTML content.
 */
export async function scrapeDevfolioPage(
  url: string
): Promise<{ [key: string]: string }> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  // Extract the HTML content of the main page
  const mainHtml = await page.content();

  // Use Cheerio to parse the HTML and extract the hackathon name
  const $ = load(mainHtml);
  const hackathonName = $("title").text().trim() || "Hackathon"; // Fallback to "Hackathon" if title is not found

  // Extract relevant links
  const keywords = ["schedule", "timeline", "agenda", "program"];
  const links: string[] = [];

  $("a").each((_, element) => {
    const href = $(element).attr("href");
    if (
      href &&
      keywords.some((keyword) => href.toLowerCase().includes(keyword)) &&
      href.startsWith("/") // Ensure it's a relative link
    ) {
      links.push(new URL(href, url).toString()); // Convert to absolute URL
    }
  });

  // Scrape each relevant page
  const htmlContents: { [key: string]: string } = {};
  for (const link of links) {
    try {
      await page.goto(link, { waitUntil: "networkidle0" });
      const content = await page.content();

      // Validate that the content belongs to the intended hackathon
      if (content.includes(hackathonName)) {
        htmlContents[link] = content;
      } else {
        console.warn(`⚠️ Skipping irrelevant page: ${link}`);
      }
    } catch (error) {
      console.error(`❌ Failed to scrape ${link}:`, error);
    }
  }

  await browser.close();

  // Include the main page content as well
  htmlContents[url] = mainHtml;

  return htmlContents;
}
