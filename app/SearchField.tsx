"use client";

import React, { useRef, useEffect, useState } from "react";
import { Flex, TextField, Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SearchFieldProps {
  setSearchValue: (value: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

const SearchField = ({
  className,
  setSearchValue,
  value,
  placeholder,
}: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showClear, setShowClear] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchValue = inputRef.current?.value;

      if (searchValue && searchValue.length > 3) setSearchValue(searchValue);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchValue("");
    }
  };

  return (
    <Flex className={className} width="80%" direction="column" gap="2">
      <TextField.Root
        size="3"
        radius="full"
        ref={inputRef}
        style={{ height: "60px" }}
        placeholder={placeholder}
        onKeyDown={handleSearch}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        {value && value.length > 3 && (
          <Button onClick={handleClick} mt="1" size="4">
            Clear
          </Button>
        )}
      </TextField.Root>
    </Flex>
  );
};

export default SearchField;
