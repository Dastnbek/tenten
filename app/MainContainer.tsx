"use client";

import React, { useState, useEffect } from "react";
import SearchField from "./SearchField";
import endent from "endent";
import {
  Card,
  Code,
  Flex,
  Heading,
  Spinner,
  Box,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

const MainContainer = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue.length > 3) {
      const fetchedDataSourse = async () => {
        setDataSources([]);
        setAiResponse("");
        setLoading(true);
        const dataSources = await fetchData();
        console.log("mine", dataSources);
        await fetchAIResponse(dataSources);
      };

      fetchedDataSourse();
    }
  }, [searchValue]);

  const fetchData = async () => {
    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchValue }),
    });

    const dataSources = await response.json();
    setDataSources(dataSources);
    return dataSources;
  };

  const fetchAIResponse = async (dataSources) => {
    const prompt = endent`Compare given resourses and provide a top 10 list of items and info like years, creators, location and more at least 500 characters about each item in one simple object in json format based on category which is specified in sources. Be original, concise, accurate, and helpful.
        ${dataSources
          .map((source, idx) => `Source [${idx + 1}]:\n${source.text}`)
          .join("\n\n")}
        `;

    const airesponse = await fetch("/api/ai-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const res = await airesponse.json();
    console.log("airesponse", JSON.parse(res.message.content));
    setAiResponse(JSON.parse(res.message.content));
    setLoading(false);
  };

  return (
    <Flex direction="column" align="center" mt="9" justify="center">
      <Flex my="5">
        <Heading weight="bold" mb="5" size="9">
          <Code>10x10</Code>
        </Heading>
      </Flex>
      <SearchField setSearchValue={setSearchValue} />
      {loading && <Spinner mt="9" size="3" />}
      <Flex mt="3" direction="row" gap="2">
        {dataSources.length > 0 &&
          dataSources.map((source, idx) => (
            <Card key={idx} size="2">
              <Box>
                <Text as="div" size="2" weight="bold">
                  {source.title}
                </Text>
                <Text as="div" size="2" color="gray">
                  {source.text.slice(0, 100)}
                </Text>
                <Link target="_blank" href={source.url}>
                  Read more
                </Link>
              </Box>
            </Card>
          ))}
      </Flex>
      {aiResponse && (
        <>
          <h3>Searched for: {<Code>{aiResponse.title}</Code>}</h3>
          <Flex direction="column" gap="3" justify="start">
            {aiResponse.list.map((item, idx) => (
              <Flex direction="column" gap="1">
                <Text weight="bold" size="5" mb="1" key={idx}>
                  {idx + 1}. {item.name || item.title}
                </Text>
                <Box pl="5">
                  <Text size="2">{item.info}</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default MainContainer;
