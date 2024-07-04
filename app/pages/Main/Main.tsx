import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Heading, TextField } from "@radix-ui/themes";

export const MainPage = () => {
  return (
    <Flex>
      <div className="flex flex-col justify-center w-full py-[47px] items-center">
        <Heading>Find the best 10 of anything </Heading>
        <Flex width="65%" mt="9">
          <TextField.Root
            style={{ height: "60px", width: "100%", borderRadius: "16px" }}
            size="3"
            placeholder="Find a list, author, category"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </div>
    </Flex>
  );
};
