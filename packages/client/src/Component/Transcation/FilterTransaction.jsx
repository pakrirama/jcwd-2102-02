import React, { useState } from 'react';
import { Box, Button, Flex, Input, Spacer, Text } from '@chakra-ui/react';

import { Select } from 'chakra-react-select';
import { useDispatch, useSelector } from 'react-redux';
import { transactionOption } from '../../Lib/transactionFilter';

export const FilterTransaction = () => {
  const dispatch = useDispatch();
  const transactionSelector = useSelector((state) => state.transactionReducer);

  const handleFilter = (v) => {
    dispatch({
      type: 'SET_TRANSACTION_FILTER',
      payload: {
        ...transactionSelector,
        ...v,
      },
    });
  };

  return (
    <>
      <Flex
        p="1rem"
        align={'center'}
        gap={4}
        borderTop="4px"
        borderColor={'gray.200'}
        wrap="wrap"
      >
        <Box minW={'12rem'} shadow="md">
          <Select
            options={transactionOption.sort}
            placeholder="Sort By"
            focusBorderColor="teal.400"
            colorScheme="purple"
            onChange={(v) => {
              handleFilter(v);
            }}
          />
        </Box>
        {/* <Text>From :</Text> */}
        <Input
          shadow="md"
          maxW={'10rem'}
          _placeholder={{ color: 'gray.500' }}
          type="date"
          onChange={(e) => {
            handleFilter({ datefrom: e.target.value });
          }}
        />
        <Text>To</Text>
        <Input
          shadow="md"
          maxW={'10rem'}
          _placeholder={{ color: 'gray.500' }}
          type="date"
          onChange={(e) => {
            handleFilter({ dateto: e.target.value });
          }}
        />
        {/* <Text>Invoice :</Text> */}
        <Input
          shadow="md"
          maxW={'10rem'}
          _placeholder={{ color: 'gray.500' }}
          placeholder="Invoice"
          type="text"
          onChange={(e) => {
            handleFilter({ no_invoice: e.target.value });
            console.log(e.target.value);
          }}
        />
        <Spacer />
      </Flex>
      {/* <Text>status :{transactionSelector.status}</Text>
      <Text>invoice :{transactionSelector.no_invoice}</Text>
      <Text>order :{transactionSelector.order}</Text>
      <Text>orderby :{transactionSelector.orderby}</Text>
      <Text>datefrom :{transactionSelector.datefrom}</Text>
      <Text>dateto :{transactionSelector.dateto}</Text> */}
    </>
  );
};
