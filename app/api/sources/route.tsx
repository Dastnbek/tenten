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

const fetchURLsWithAxios = async (urls: string[]) => {
  let list = [];
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
      list.push({
        text: response.data.text.slice(0, 2500),
        title: response.data.metadata.title,
        url: response.data.metadata["og:url"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return list;
};

export async function POST(request: NextRequest) {
  const { sourceLinks } = await request.json();
  try {
    const sources = await fetchURLsWithAxios(sourceLinks);
    // const sources = await fetchUrls(sourceLinks);

    // const filteredSources = sources.filter((source) => source !== undefined);

    // for (const source of filteredSources) {
    //   source.text = source.text.slice(0, 2500);
    // }
    console.log("sources", sources);

    return NextResponse.json({ sources: sources }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
