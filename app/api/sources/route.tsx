import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const cleanSourceText = (text: string) => {
  return text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");
};

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  const sourceCount = 5;
  try {
    const sourceQuery = `https://www.google.com/search?q=${query}`;
    console.log("sourceQuery", sourceQuery);
    const responseFromSources = await fetch(sourceQuery);
    const html = await responseFromSources.text();

    const $ = cheerio.load(html);
    const linkTags = $("a");
    let links: string[] = [];
    console.log("link tags", linkTags);

    linkTags.each((i, link) => {
      const href = $(link).attr("href");

      if (href && href.startsWith("/url?q=")) {
        const cleanedHref = href.replace("/url?q=", "").split("&")[0];

        if (!links.includes(cleanedHref)) {
          links.push(cleanedHref);
        }
      }
    });

    const filteredLinks = links.filter((link, idx) => {
      const domain = new URL(link).hostname;

      const excludeList = [
        "google",
        "facebook",
        "twitter",
        "instagram",
        "youtube",
        "tiktok",
      ];
      if (excludeList.some((site) => domain.includes(site))) return false;

      return (
        links.findIndex((link) => new URL(link).hostname === domain) === idx
      );
    });

    const finalLinks = filteredLinks.slice(0, sourceCount);

    const sources = (await Promise.all(
      finalLinks.map(async (link) => {
        const response = await fetch(link);
        const html = await response.text();

        const dom = new JSDOM(html);
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
      source.text = source.text.slice(0, 1500);
    }

    return NextResponse.json(filteredSources, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
