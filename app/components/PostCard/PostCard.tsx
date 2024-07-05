import { Card, Text, Inset, Strong, Flex, Avatar } from "@radix-ui/themes";
import {
  DotsVerticalIcon,
  ChatBubbleIcon,
  HeartIcon,
} from "@radix-ui/react-icons";

export const PostCard = ({ post }) => {
  return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={post.img}
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <div>
        <Flex gap="4" justify="between" mb="4">
          <Strong
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              maxWidth: "250px",
              height: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineClamp: "2",
            }}
          >
            {post.title}
          </Strong>
          <DotsVerticalIcon />
        </Flex>
        <Flex style={{ alignItems: "center" }}>
          <Avatar
            size="2"
            mr="2"
            radius="full"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
          />
          <Text as="span" size="1" style={{ color: "var(--BW-300, #81889F)" }}>
            {post.author.name} - {post.date}{" "}
          </Text>
        </Flex>
        <Flex
          gap="4"
          mt="5"
          style={{ color: " var(--BW-300, #81889F)", fontSize: "16px" }}
        >
          <Flex style={{ alignItems: "center" }}>
            <HeartIcon style={{ marginRight: "5px" }} /> {post.likes}
          </Flex>
          <Flex style={{ alignItems: "center" }}>
            <ChatBubbleIcon style={{ marginRight: "5px" }} /> {post.comments}
          </Flex>
        </Flex>
      </div>
    </Card>
  );
};
