import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Heading, TextField, Tabs, Text, Box } from "@radix-ui/themes";
import { TopTabs } from "@/app/components";

export const MainPage = () => {
  return (
    <Flex direction="column">
      <div className="flex flex-col justify-center w-full pt-[47px] pb-[61px] items-center">
        <Heading weight="medium" size="8">
          Find the best 10 of anything{" "}
        </Heading>
        <Flex width="60%" mt="8">
          <TextField.Root
            style={{ height: "60px", width: "100%", borderRadius: "16px" }}
            size="3"
            placeholder="Find a list, author, category"
            color="gray"
            variant="soft"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </div>
      <TopTabs />
    </Flex>
  );
};
