import { Flex, Code, Text, Box } from "@radix-ui/themes";
import { AiResposneProps } from "../types";

interface AiResponse {
  aiResponse: AiResposneProps;
}

const AIResposne = ({ aiResponse }: AiResponse) => {
  console.log("aires", aiResponse);
  return (
    <>
      <h3>Searched for: {<Code>{aiResponse.title}</Code>}</h3>
      <Flex direction="column" gap="3" justify="start">
        {aiResponse.list.map((item, idx) => (
          <Flex key={idx} direction="column" gap="1">
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
  );
};

export default AIResposne;
