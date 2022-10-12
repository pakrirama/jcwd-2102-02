import { Flex, Spacer, Text, Box } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';

export const TransactionPaymentDetail = ({ data }) => {
  return (
    <Box minH="220px">
      {data ? (
        <>
          <Text fontSize={'20px'} mb="1rem">
            BCA Bank Transfer
          </Text>
          <Flex>
            <Text minW="200px">Bank Account Number </Text>:
            <Spacer />
            <Text textAlign={'end'}>80254236423 </Text>
          </Flex>
          <Flex>
            <Text minW="200px">Price to Pay </Text>:
            <Spacer />
            <Text textAlign={'end'}>
              Rp.{data.total_payment?.toLocaleString('id-ID')}
            </Text>
          </Flex>
          <Flex>
            <Text minW="200px">Payment Deadline </Text>:
            <Spacer />
            <Text textAlign={'end'}>
              {data.prescription
                ? ''
                : moment(data.createdAt).add(1, 'hours').format('LLL')}
            </Text>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
