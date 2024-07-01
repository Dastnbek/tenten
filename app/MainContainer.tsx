"use client";

import React, { useState, useEffect } from "react";
import { Code, Flex, Heading, Spinner } from "@radix-ui/themes";
import SearchField from "./SearchField";
import SourceCard from "@/app/components/SourceCard";
import AIResponse from "./components/AIResponse";
import {
  fetchSerperData,
  fetchEachSourceData,
  fetchAIResponse,
} from "@/app/services";

const MainContainer = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [dataSources, setDataSources] = useState([]);
  const [eachDataSource, setEachDataSource] = useState([]);
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue.length > 3) {
      setDataSources([]);
      setAiResponse("");
      setLinks([]);
      const fetchedDataSourse = async () => {
        try {
          setLoading(true);

          const { sources } = await fetchSerperData(searchValue);
          const sourceLinks = sources.map((source) => source.link);

          setLinks(sourceLinks);
          setDataSources(sources);
        } catch (error) {
          setLoading(false);
        }
      };

      fetchedDataSourse();
    } else {
      setDataSources([]);
      setEachDataSource([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const getEachDataSource = async () => {
      if (links.length > 0) {
        try {
          const { sources } = await fetchEachSourceData(links);
          setEachDataSource(sources);
          setLoading(false);
        } catch (error) {
          console.log("error", error);
          setLoading(false);
        }
      }
    };

    getEachDataSource();
  }, [links]);

  useEffect(() => {
    if (searchPrompt.length > 3 && eachDataSource.length > 0) {
      const getAIResponse = async () => {
        setLoading(true);
        setAiResponse("");
        try {
          const resonse = await fetchAIResponse(eachDataSource, searchPrompt);
          setAiResponse(JSON.parse(resonse.message.content));
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };

      getAIResponse();
    }
  }, [searchPrompt, eachDataSource]);

  return (
    <Flex direction="column" align="center" mt="9" justify="center">
      <Flex my="5">
        <Heading weight="bold" mb="5" size="9">
          <Code>10x10</Code>
        </Heading>
      </Flex>

      <SearchField
        value={searchValue}
        setSearchValue={setSearchValue}
        placeholder="Search"
      />
      <span className="w-full my-4" style={{ height: 50 + "px" }}></span>

      {eachDataSource.length > 0 && (
        <SearchField
          value={searchPrompt}
          setSearchValue={setSearchPrompt}
          placeholder="Prompt"
        />
      )}

      <span className="w-full my-4" style={{ height: 50 + "px" }}></span>

      {dataSources.length > 0 && searchValue.length > 3 && (
        <Flex mt="3" direction="row" gap="2">
          {dataSources.map((source, idx) => (
            <SourceCard source={source} key={idx} />
          ))}
        </Flex>
      )}

      {loading && <Spinner mt="9" size="3" />}
      {aiResponse && searchValue.length > 3 && searchPrompt.length > 0 && (
        <AIResponse aiResponse={aiResponse} />
      )}
    </Flex>
  );
};

export default MainContainer;
