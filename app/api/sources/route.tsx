import { NextRequest, NextResponse } from "next/server";
import jsdom from "jsdom";
import { Readability } from "@mozilla/readability";
import axios from "axios";

const cleanSourceText = (text: string) => {
  return text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");
};

const useSerperAPI = async (query: string) => {
  const searchQuery = JSON.stringify({
    q: query,
    num: 20,
  });

  let config = {
    method: "post",
    url: "https://google.serper.dev/search",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    data: searchQuery,
  };

  return axios(config);
};

interface Source {
  title: string;
  link: string;
  snippet: string;
  position: number;
}

const getSourceLinks = (sources: Source[]) => {
  const links = sources.map((source) => source.link);

  return links;
};

const getFilteredLinks = (links: string[]) => {
  const filteredLinks = links.filter((link, idx) => {
    const domain = new URL(link).hostname;

    const excludeList = [
      "google",
      "facebook",
      "twitter",
      "instagram",
      "youtube",
      "tiktok",
      "pinterest",
      "linkedin",
      "reddit",
    ];
    if (excludeList.some((site) => domain.includes(site))) return false;

    return links.findIndex((link) => new URL(link).hostname === domain) === idx;
  });

  return filteredLinks;
};

export const maxDuration = 300;

const fetchUrls = async (urls: string[]) => {
  const { JSDOM } = jsdom;
  const contents: { url: string; text: string }[] = [];

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
        let sourceText = cleanSourceText(parsed.textContent);
        let title = parsed.title;

        contents.push({ url: url, text: sourceText, title });
      }
    } catch (error) {
      console.error(error);
      // throw new Error("Failed to fetch one or more URLs");
    }
  }
  return contents;
};

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  const sourceCount = 3;
  try {
    const serperResponse = await useSerperAPI(query);
    console.log("search response", serperResponse.data.organic);
    const links = getSourceLinks(serperResponse.data.organic);
    const filteredLinks = getFilteredLinks(links);
    const finalLinks = filteredLinks.slice(0, sourceCount);

    const sources = await fetchUrls(finalLinks);

    console.log("my sources", sources);

    const filteredSources = sources.filter((source) => source !== undefined);

    for (const source of filteredSources) {
      source.text = source.text.slice(0, 1500);
    }

    return NextResponse.json({ sources: filteredSources }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
