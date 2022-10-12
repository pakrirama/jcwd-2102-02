import {
  Flex,
    Button,
    Input,
    Icon,
    InputGroup,
    InputLeftElement,
    InputRightElement,
  } from "@chakra-ui/react";
  import React , { useState } from "react";
  import { FaSearch } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";

  export default function  SearchPro  () {
    const dispatch = useDispatch();
  const [state, setState] = useState();
  const filter = useSelector((state) => state.filterReducer);
    return (
      <>
      
      <InputGroup>
        <Input focusBorderColor="teal.400" 
        value={state}
       
        placeholder="Filter"
        onChange={(e) => {
          setState(e.target.value);
        }} />
        <InputRightElement
          width="4.5rem"
          px={2}
          color={"white"}
          onClick={() => {
            dispatch({
              type: "SET_FILTER",
              payload: {
                ...filter,
                filter: state,
                banner: false,
                offset: 0,
              },
            });
            setState("");
            console.log(state);
          }}
          bg="teal.400"
          _hover={{ bg:"teal.500" }}
          borderRightRadius="md"
        >
          <FaSearch />
        
       
          
        </InputRightElement>
      </InputGroup>
     
      </>
    );
  };
  