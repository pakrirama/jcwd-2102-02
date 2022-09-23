import {
  Heading,
  Image,
  Text,
  useToast,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';

import { CourierList } from './CourierList';

export const ChekcoutList = ({ cartData }) => {
  return (
    <>
      <Box bg="white" rounded={'xl'} my={'1rem'}>
        <Heading textAlign={'start'} p="1rem" fontSize={'24px'}>
          Your Order
        </Heading>
        <Box display="flex" gap={2} p={8}>
          <SimpleGrid spacing={5} columns={3}>
            {cartData ? (
              cartData.map((val, idx) => {
                return (
                  <Box key={idx}>
                    <Image
                      src="https://picsum.photos/200"
                      rounded={'lg'}
                      border="2px"
                      borderColor={'gray.200'}
                    />
                    <Text fontWeight={'bold'}>{val.Product.name}</Text>
                    <Text>{val.quantity} x</Text>
                    <Text>
                      {'Rp ' + val.Product.price.toLocaleString('id-ID')}
                    </Text>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </SimpleGrid>
          <Box w="50%">
            <CourierList />
          </Box>
        </Box>
      </Box>
    </>
  );
};
