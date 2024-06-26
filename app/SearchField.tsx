"use client";

import React, { useRef } from "react";
import { Flex, TextField, Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SearchFieldProps {
  setSearchValue: (value: string) => void;
}

const SearchField = ({ setSearchValue }: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchValue = inputRef.current?.value;

      if (searchValue && searchValue.length > 3) setSearchValue(searchValue);
    }
  };

  return (
    <Flex width="80%" direction="column" gap="2">
      <TextField.Root
        size="3"
        radius="full"
        ref={inputRef}
        style={{ height: "60px" }}
        placeholder="Search for best..."
        onKeyDown={handleSearch}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default SearchField;
