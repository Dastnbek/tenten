import { Flex, Heading, Text, Container } from "@radix-ui/themes";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Header = () => {
  return (
    <Flex justify="start">
      <Link href="/">
        <CaretLeftIcon
          cursor="pointer"
          width="30"
          height="30"
          style={{ marginRight: "16px" }}
        />
      </Link>
      <Heading>The best 10 laptops to buy in 2024</Heading>
    </Flex>
  );
};
