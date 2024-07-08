import { Box, Text, Tabs } from "@radix-ui/themes";
import { PostCard } from "../PostCard";
import { DUMMY_DATA } from "@/app/constants";
import Link from "next/link";

export const TopTabs = () => {
  return (
    <div>
      <Tabs.Root defaultValue="trendingList">
        <Tabs.List style={{ paddingLeft: "64px", paddingRight: "64px" }}>
          <Tabs.Trigger value="trendingList">Trending list</Tabs.Trigger>
          <Tabs.Trigger value="mostViewed">Most viewed this month</Tabs.Trigger>
          <Tabs.Trigger value="travel">Travel</Tabs.Trigger>
          <Tabs.Trigger value="food">Food</Tabs.Trigger>
          <Tabs.Trigger value="cars">Cars</Tabs.Trigger>
          <Tabs.Trigger value="education">Education</Tabs.Trigger>
        </Tabs.List>

        <Box
          pt="3"
          style={{
            paddingLeft: "64px",
            paddingRight: "64px",
            paddingBottom: "15px",
          }}
        >
          <Tabs.Content value="trendingList">
            <div className="grid grid-cols-4 gap-6">
              {DUMMY_DATA.map((post) => (
                <Link key={post.id} href={`/top-list/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="mostViewed">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="travel">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
};
