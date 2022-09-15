import React, { useState } from 'react';
import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

export const TransactionHeader = () => {
  const dispatch = useDispatch();

  const transactionSelector = useSelector((state) => state.transactionReducer);

  const handleClick = (params) => {
    dispatch({
      type: 'SET_TRANSACTION_TAB',
      payload: {
        tab: params,
      },
    });
  };

  return (
    <Box px={4} align="center" bg="white">
      <SimpleGrid
        px={'30px'}
        sx={{
          maxW: '1440px',
          height: '75px',
          left: '0px',
          top: '0px',
        }}
        display="flex"
        columns={{ base: 1, md: 3, lg: 5 }}
      >
        {/* ON Going */}
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="18px"
          fontWeight={'bold'}
          w="300px"
          style={
            transactionSelector.tab == 'ongoing'
              ? {
                  textDecoration: 'none',
                  borderBottomWidth: '4px',
                  borderBottomColor: 'teal',
                }
              : { textDecoration: 'none' }
          }
          _hover={{
            borderBottomWidth: '4px',
            borderBottomColor: 'teal',
          }}
          onClick={() => {
            handleClick('ongoing');
          }}
        >
          On Going
        </Button>

        {/* History */}
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="18px"
          fontWeight={'bold'}
          w="300px"
          style={
            transactionSelector.tab == 'history'
              ? {
                  textDecoration: 'none',
                  borderBottomWidth: '4px',
                  borderBottomColor: 'teal',
                }
              : { textDecoration: 'none' }
          }
          _hover={{
            borderBottomWidth: '4px',
            borderBottomColor: 'teal',
          }}
          onClick={() => {
            handleClick('history');
          }}
        >
          History
        </Button>
      </SimpleGrid>
    </Box>
  );
};
