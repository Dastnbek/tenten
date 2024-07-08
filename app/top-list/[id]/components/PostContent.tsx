import { Flex, Heading } from "@radix-ui/themes";
import LaptopImage from "@/app/assets/images/laptopPost.png";

export const PostContent = ({ SINGLE_POST }) => {
  return (
    <>
      <Flex mt="6">
        <img src={LaptopImage.src} alt="laptop" />
      </Flex>
      <Flex mt="6" direction="column">
        {SINGLE_POST.map((post) => (
          <Flex mb="6" key={post.id} direction="column" gap="3">
            <Flex align="center" gap="3">
              <Flex
                style={
                  post.id === 1
                    ? {
                        background: "#FFB300",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "50%",
                        fontSize: "24px",
                        fontWeight: "590",
                      }
                    : post.id === 2
                    ? {
                        background: "#C4C9CD",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "50%",
                        fontSize: "24px",
                        fontWeight: "590",
                      }
                    : post.id === 3
                    ? {
                        background: "#CE8946",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "50%",
                        fontSize: "24px",
                        fontWeight: "590",
                      }
                    : {
                        background: "var(--BW-500, #5F6577)",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "50%",
                        fontSize: "24px",
                        fontWeight: "590",
                      }
                }
                justify="center"
                align="center"
                height="40px"
                width="40px"
              >
                {post?.id}
              </Flex>
              <Heading>{post.title}</Heading>
            </Flex>
            <p>{post.description}</p>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
