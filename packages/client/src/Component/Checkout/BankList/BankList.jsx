import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import BCALogo from '../../../public/Assets/image/bca.png';
import MandiriLogo from '../../../public/Assets/image/mandiri.png';
import BNILogo from '../../../public/Assets/image/bni.png';

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
            <Box maxW="200px">
              <Image src={BCALogo} layout="responsive" />
            </Box>
            <Box maxW="200px">
              <Image src={BNILogo} layout="responsive" />
            </Box>
            <Box maxW="200px">
              <Image src={MandiriLogo} layout="responsive" />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};
