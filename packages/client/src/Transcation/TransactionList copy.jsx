import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { ProgressStep } from './ProgressStep';
import { TransactionOrderDetail } from './TransactionOrderDetail';
import { TransactionPaymentDetail } from './TransactionPaymentDetail';

export const TransactionList = ({ data }) => {
  return (
    <>
      {data ? (
        data.map((val, idx) => {
          return (
            <div key={idx}>
              <Flex>
                <Flex gap="1rem" direction={'column'} maxW="600px">
                  {val.Product_Orders.map((v, i) => {
                    return (
                      <div key={i}>
                        <Box
                          p="1rem"
                          border="1px"
                          borderColor={'gray.300'}
                          rounded="lg"
                        >
                          <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
                            <GridItem colSpan={1}>
                              <Image src="/assets/image/step1.png" />
                            </GridItem>
                            <GridItem colSpan={3}>
                              <Flex direction={'column'} ml="1rem">
                                <Text fontWeight={'700'}>{v.Product.name}</Text>
                                <Text>
                                  Rp.{v.Product.price.toLocaleString('id-ID')}
                                </Text>
                                <Text>{v.quantity} items</Text>
                                <Text fontWeight={'700'}>
                                  Total : Rp.
                                  {(
                                    v.Product.price * v.quantity
                                  ).toLocaleString('id-ID')}
                                </Text>
                              </Flex>
                            </GridItem>
                          </Grid>
                        </Box>
                      </div>
                    );
                  })}
                </Flex>
                <Box w="full" px="1rem">
                  <Text fontSize={'20px'} fontWeight={'700'} mb="1rem">
                    Order Detail
                  </Text>
                  <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
                    <GridItem colSpan={4}>
                      {/* STEP */}
                      <ProgressStep status={val.status} />
                    </GridItem>
                    <GridItem colSpan={2} p="1rem">
                      {/* Order Detail */}
                      <TransactionOrderDetail data={val} />
                    </GridItem>
                    <GridItem colSpan={2} p="1rem">
                      {/* Payment Detail */}
                      <TransactionPaymentDetail data={val} />
                    </GridItem>
                  </Grid>
                </Box>
              </Flex>
            </div>
          );
        })
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </>
  );
};
