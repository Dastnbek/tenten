import { Flex, Heading } from "@radix-ui/themes";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { BookMarkIcon, ReportIcon, ShareIcon } from "@/app/assets";

const TopListPage = () => {
  return (
    <Flex justify="center" mt="8" direction="column">
      <Flex justify="center">
        <CaretLeftIcon
          cursor="pointer"
          width="30"
          height="30"
          style={{ marginRight: "16px" }}
        />
        <Heading>The best 10 laptops to buy in 2024</Heading>
      </Flex>
      <Flex justify="center">
        <Flex gap="3">
          <div
            className="flex justify-center items-center w-8 h-8"
            style={{
              background: "var(--BW-700, #414650)",
              padding: "4px",
              borderRadius: "8px",
            }}
          >
            <BookMarkIcon />
          </div>
          <div
            className="flex justify-center items-center w-8 h-8"
            style={{
              background: "var(--BW-700, #414650)",
              padding: "4px",
              borderRadius: "8px",
            }}
          >
            <ShareIcon />
          </div>
          <div
            className="flex justify-center items-center w-8 h-8"
            style={{
              background: "var(--BW-700, #414650)",
              padding: "4px",
              borderRadius: "8px",
            }}
          >
            <ReportIcon />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TopListPage;
