"use client";

import { Button, Code, Flex, Text } from "@radix-ui/themes";
import { NAV_ITEMS } from "@/app/constants";
import { NavItemProps } from "@/app/types";
import Link from "next/link";
import { EditIcon } from "./components/EditIcon";

export const Navbar = () => {
  return (
    <div className="grid grid-cols-3 border-b-[0.5px] border-b-[#414650]">
      <div className="self-center pl-16 py-6">
        <Code size="7">10x10</Code>
      </div>
      <div className="flex justify-self-center self-stretch">
        {NAV_ITEMS.map((item: NavItemProps, idx: number) => (
          <Link className="m-2 self-center" key={idx} href={item.route}>
            <Text size="2">{item.name}</Text>
          </Link>
        ))}
      </div>
      <div className="justify-self-end self-center pr-16 py-6">
        <Flex gap="4">
          <Button mr="3" color="gray" variant="surface" highContrast>
            <EditIcon />
            <Text size="2">Write a list</Text>
          </Button>
          <Button>
            <Text size="2">Login</Text>
          </Button>
          <Button color="gray" variant="surface" highContrast>
            <Text size="2">Sign up</Text>
          </Button>
        </Flex>
      </div>
    </div>
  );
};
