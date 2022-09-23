import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import banner from '../public/Assets/image/banner_1.png';
import step1 from '../public/Assets/image/step1.png';
import step2 from '../public/Assets/image/step2.png';
import step3 from '../public/Assets/image/step3.png';
import Image from 'next/image';

export const Banner = () => {
  return (
    <Box align="center">
      <Box maxW={'1440px'}>
        <Image src={banner} layout="responsive" />
        <Text fontSize={'3xl'} fontWeight={600} my={12}>
          Order Prescription in 3 Steps
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }}>
          <Box>
            <Box maxW="175px">
              <Image src={step1} layout="responsive" />
            </Box>
            <Text py={10}>
              Upload your prescription item(s) and sign up to register your
              personal details if you don't have an account
            </Text>
          </Box>
          <Box>
            <Box maxW="175px">
              <Image src={step2} layout="responsive" />
            </Box>
            <Text py={10}>
              Our pharmacists will check and validate your uploaded prescription
            </Text>
          </Box>
          <Box>
            <Box maxW="175px">
              <Image src={step3} layout="responsive" />
            </Box>
            <Text py={10}>
              We will let you know when it's ready or on the way - ot's that
              easy
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
