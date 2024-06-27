import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
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

const getSourceLinks = (sources: Source[], limit: number) => {
  const links = sources.map((source) => source.link);

  return links.slice(0, limit);
};

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  const sourceCount = 5;
  try {
    const serperResponse = await useSerperAPI(query);
    const links = getSourceLinks(serperResponse.data.organic, sourceCount);
    const { JSDOM } = jsdom;

    const sources = (await Promise.all(
      links.map(async (link) => {
        const response = await fetch(link);
        const html = await response.text();

        // const dom = new JSDOM(html);
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

          return { url: link, text: sourceText, title };
        }
      })
    )) as { url: string; text: string }[];

    const filteredSources = sources.filter((source) => source !== undefined);

    for (const source of filteredSources) {
      source.text = source.text.slice(0, 2000);
    }

    console.log("filtered sources", filteredSources);

    return NextResponse.json([], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
