import { NextRequest, NextResponse } from "next/server";
import jsdom from "jsdom";
import { Readability } from "@mozilla/readability";
import axios from "axios";

export const maxDuration = 300;

const cleanSourceText = (text: string) => {
  return text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");
};
// Custom scrapper
const fetchUrls = async (urls: string[]) => {
  const { JSDOM } = jsdom;
  const scrappedContents: { url: string; text: string }[] = [];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const virtualConsole = new jsdom.VirtualConsole();
      virtualConsole.on("error", () => {
        // No-op to skip console errors.
      });
      const dom = new JSDOM(html, { virtualConsole });
      const doc = dom.window.document;
      const parsed = new Readability(doc).parse();

      if (parsed) {
        const text = cleanSourceText(parsed.textContent);

        scrappedContents.push({ url, text });
      }
    } catch (error) {
      console.error(error);
      // throw new Error("Failed to fetch one or more URLs");
    }
  }
  return scrappedContents;
};

// Serper scrapper
const scrapeLinksWithSerperDev = async (urls: string[]) => {
  const scrappedContents = [];
  for (const url of urls) {
    let data = JSON.stringify({
      url: url,
    });

    let config = {
      method: "post",
      url: "https://scrape.serper.dev",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      const response = await axios(config);
      scrappedContents.push({
        text: response.data.text,
        title: response.data.metadata.title,
        url: response.data.metadata["og:url"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return scrappedContents;
};

// Jina Reader API [Scrapper]
const scrapeLinksWithJinaReader = async (urls: string[]) => {
  const scrappedContents: { url: string; text: string }[] = [];
  // Did not move the API key to .env for the sake of simplicity and it is free API key
  try {
    for (const url of urls) {
      const response = await fetch(`https://r.jina.ai/${url}`, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer jina_b9b9ccd6f14b4ebb97bf83333a307e30KM_eyNAR8A3XApNMkx2wpRsc_DWQ",
        },
      });

      if (response.status === 200) {
        const text = await response.text();
        scrappedContents.push({ url, text });
      }
    }

    return scrappedContents;
  } catch (error) {
    console.log("error", error);
  }
};

export async function POST(request: NextRequest) {
  const { sourceLinks } = await request.json();
  try {
    const sources = await scrapeLinksWithJinaReader(sourceLinks);
    // const sources = await scrapeLinksWithSerperDev(sourceLinks);
    // const sources = await fetchUrls(sourceLinks);

    // Filter out sources with no text or text length less than 500
    const filteredSources = sources.filter(
      (source) => source !== undefined || source?.length > 500
    );

    for (const source of filteredSources) {
      source.text = source.text.slice(0, 4000);
    }

    return NextResponse.json({ sources: filteredSources }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
