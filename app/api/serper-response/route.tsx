import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { SerperResponseProps } from "@/app/types";

// NOTE: This is config for Vercel. If you are using another platform, you can remove it.
export const maxDuration = 300;

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

const getFilteredLinks = (data: SerperResponseProps[]) => {
  const filteredLinks = data.filter((data, idx) => {
    const domain = new URL(data.link).hostname;

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
      "tripadvisor",
    ];
    if (excludeList.some((site) => domain.includes(site))) return false;
    return true;
  });

  return filteredLinks;
};

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  const sourceCount = 3;
  try {
    const serperResponse = await useSerperAPI(query);
    const filteredDataBasedOnLinks = getFilteredLinks(
      serperResponse.data.organic
    );

    const finalData = filteredDataBasedOnLinks.slice(0, sourceCount);

    return NextResponse.json({ sources: finalData }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
