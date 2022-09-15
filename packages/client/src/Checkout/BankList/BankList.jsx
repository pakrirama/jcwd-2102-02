import { Heading, Image, Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export const BankList = () => {
  return (
    <>
      <Box bg="white" rounded={'xl'} my={'2rem'} pb="2rem">
        <Heading textAlign={'start'} p="1rem" fontSize={'24px'}>
          Bank Transfer
        </Heading>
        <Box display="flex" gap={2} align="center">
          <SimpleGrid
            justifyContent={'space-evenly'}
            columns={3}
            m="auto"
            py="2rem"
            w="full"
          >
            <Image
              src="/assets/image/bca.png"
              rounded={'lg'}
              border="2px"
              borderColor={'gray.200'}
            />
            <Image
              src="/assets/image/bni.png"
              rounded={'lg'}
              border="2px"
              borderColor={'gray.200'}
            />
            <Image
              src="/assets/image/mandiri.png"
              rounded={'lg'}
              border="2px"
              borderColor={'gray.200'}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};
