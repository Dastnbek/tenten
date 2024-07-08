import { Flex, Container, Grid, Card, Box, Text } from "@radix-ui/themes";
import { PostContent, Header, SubHeader, Divider } from "./components";
import { SINGLE_POST, SINGLE_POST_SOURCES } from "@/app/constants";

const TopListPage = () => {
  return (
    <Container size="2">
      <Flex justify="center" mt="8" direction="column">
        <Header />
        <SubHeader showAuthor={true} />
        <Divider />
        <PostContent SINGLE_POST={SINGLE_POST} />
        <Divider />
        <SubHeader showAuthor={false} />
        <Flex direction="column" mb="6" gap="2">
          <Text size="5" mb="3" weight="bold">
            Sources used to create this list
          </Text>
          <Grid gap="3" columns="2">
            {SINGLE_POST_SOURCES.slice(0, 2).map((source) => (
              <Card key={source.id}>
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {source.title}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {source.source}
                  </Text>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid gap="3" columns="3">
            {SINGLE_POST_SOURCES.slice(2, SINGLE_POST_SOURCES.length).map(
              (source) => (
                <Card key={source.id}>
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {source.title}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {source.source}
                    </Text>
                  </Box>
                </Card>
              )
            )}
          </Grid>
        </Flex>
      </Flex>
    </Container>
  );
};

export default TopListPage;
