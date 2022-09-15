import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Spacer,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const OrderDetail = ({ data }) => {
  return (
    <>
      {data ? (
        <>
          <Flex direction="column" mx="4rem" my="2rem">
            <Text fontSize={'24px'} fontWeight={'bold'} mb="2rem">
              Order Detail
            </Text>
            <Flex textAlign={'center'} fontSize="20px" fontWeight={'bold'}>
              <Flex w="40%">
                <Text w="40%">Item</Text>
              </Flex>
              <Text w="20%">Price</Text>
              <Text w="20%">Qty</Text>
              <Text w="20%">Total Price</Text>
            </Flex>
            {data.Product_Orders ? (
              data.Product_Orders.map((val, id) => {
                return (
                  <div key={id}>
                    <Grid
                      rounded="lg"
                      border="1px"
                      borderColor={'gray.400'}
                      templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(6, 1fr)',
                      }}
                      gap={6}
                      p="1rem"
                      mb="1rem"
                    >
                      <GridItem colSpan={{ base: 1, md: 3 }} display="flex">
                        <Image
                          src="/assets/image/step1.png"
                          border={'1px'}
                          borderColor="gray.400"
                          rounded="lg"
                        />
                        <Text my={'1rem'} mx="0.5rem" fontWeight={'700'}>
                          {val.Product.name}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        Rp.{val.Product.price.toLocaleString('id-ID')}
                      </GridItem>
                      <GridItem colSpan={1}>{val.quantity}</GridItem>
                      <GridItem colSpan={1}>
                        Rp.
                        {(val.Product.price * val.quantity).toLocaleString(
                          'id-ID',
                        )}
                      </GridItem>
                    </Grid>
                  </div>
                );
              })
            ) : (
              <>
                <Spinner />
              </>
            )}
          </Flex>

          <Flex mx="4rem" my="2rem">
            <Stack
              border="1px"
              borderColor={'gray.400'}
              rounded="lg"
              marginLeft={'auto'}
              w="300px"
              p="1rem"
              spacing={'1rem'}
            >
              <Flex align="center" h="50%">
                <Text> Subtotal</Text>
                <Spacer />
                <Text>Rp. {data.total_price.toLocaleString('id-ID')}</Text>
              </Flex>
              <Flex
                h="50%"
                align="center"
                borderBottom={'4px'}
                borderColor="gray.200"
              >
                <Text> Delivery Fee</Text>
                <Spacer />
                <Text>Rp. {data.shipping_cost.toLocaleString('id-ID')}</Text>
              </Flex>
              <Flex align="center" h="50%">
                <Text> Grand Total</Text>
                <Spacer />
                <Text>Rp. {data.total_payment.toLocaleString('id-ID')}</Text>
              </Flex>
            </Stack>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
