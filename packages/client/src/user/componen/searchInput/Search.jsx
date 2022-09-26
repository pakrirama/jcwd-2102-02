import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
  } from "@chakra-ui/react";
  import React from "react";
  import { FaSearch } from "react-icons/fa";
  
  export const SearchInput = () => {
    return (
      <InputGroup>
        <InputLeftElement color="gray.400">
          <FaSearch />
        </InputLeftElement>
        <Input focusBorderColor="teal.400" placeholder="Search for medicine" />
        <InputRightElement
          width="4.5rem"
          px={2}
          color={"white"}
          onClick={() => {
            console.log("search");
          }}
          bg="teal.400"
          _hover={{ bg: "teal.500" }}
          borderRightRadius="md"
        >
          Search
        </InputRightElement>
      </InputGroup>
    );
  };
  