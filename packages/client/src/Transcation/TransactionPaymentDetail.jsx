import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';

export const TransactionPaymentDetail = ({ data }) => {
  return (
    <>
      {data ? (
        <>
          <Text fontSize={'20px'} mb="1rem">
            BCA Bank Transfer
          </Text>
          <Flex>
            <Text minW="200px">Bank Account Number </Text>:
            <Spacer />
            <Text textAlign={'end'}>Order Number </Text>
          </Flex>
          <Flex>
            <Text minW="200px">Price to Pay </Text>:
            <Spacer />
            <Text textAlign={'end'}>Order Number </Text>
          </Flex>
          <Flex>
            <Text minW="200px">Payment Deadline </Text>:
            <Spacer />
            <Text textAlign={'end'}>
              {moment(data.createdAt).add(1, 'hours').format('LLL')}
            </Text>
          </Flex>
          <Flex direction={'column'} align="center" gap="1rem" mt="2rem">
            <Button colorScheme={'teal'}>Order Received</Button>
            <Text
              color={'teal'}
              _hover={{ color: 'teal.700' }}
              cursor="pointer"
            >
              See Payment Status
            </Text>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
