import endent from "endent";

export const fetchSerperData = async (searchValue: string) => {
  const response = await fetch("/api/serper-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: searchValue }),
  });

  const dataSources = await response.json();
  return dataSources;
};

export const fetchEachSourceData = async (sourceLinks: string[]) => {
  const response = await fetch("/api/sources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceLinks }),
  });

  return response.json();
};

export const fetchAIResponse = async (
  dataSources,
  searchPrompt,
  systemPrompt
) => {
  const temp = searchPrompt
    ? searchPrompt
    : "Analyze data Sources based on given data sources and return result in one simple object in json format. Be helpful.";
  const prompt = endent`${temp} in json format
      ${dataSources
        .map((source, idx) => `Source [${idx + 1}]:\n${source.text}`)
        .join("\n\n")}
      `;
  console.log("prompt", prompt);

  const response = await fetch("/api/ai-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, systemPrompt }),
  });
  return response.json();
};
