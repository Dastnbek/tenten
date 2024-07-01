import { Card, Box, Text, Link } from "@radix-ui/themes";
import { SerperResponseProps } from "@/app/types";

interface SourceCardProps {
  source: SerperResponseProps;
}

const SourceCard = ({ source }: SourceCardProps) => {
  return (
    <Card size="2">
      <Box>
        <Text as="div" size="2" weight="bold">
          {source.title}
        </Text>
        <Text as="div" size="2" color="gray">
          {source.snippet}
        </Text>
        <Link target="_blank" href={source.link}>
          Read more
        </Link>
      </Box>
    </Card>
  );
};

export default SourceCard;
