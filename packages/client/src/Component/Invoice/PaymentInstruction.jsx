import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const PaymentInstruction = () => {
  return (
    <Box>
      <Text fontSize={'24px'} fontWeight={'bold'} ml="4rem">
        Payment Instruction
      </Text>
      <Flex rounded="lg" mx="4rem" my="2rem">
        <Flex w="50%" py="2rem" direction="column" gap="1rem">
          <Text>Instruction for Bank Transfer</Text>
        </Flex>
        <Flex
          w="full"
          p="2rem"
          direction="column"
          gap="1rem"
          border={'1px'}
          rounded="xl"
          borderColor="gray.400"
        >
          <Text>
            1. Make payment via ATM / mobile banking / internet banking / SMS
            banking / to the nearest bank.
          </Text>
          <Text>
            2. Fill in the destination bank account number according to the
            information above.
          </Text>
          <Text>
            3. Enter the payment amount according to your billing amount,
            including the last 3 digits.
          </Text>
          <Text>
            4. After the payment has been made, please upload your proof in the
            payment confirmation page.
          </Text>
          <Text>
            5. We will check and verify your payment. Verification time is no
            later than 1 x 24 hours on the working days , and 2 x 24 hours on
            the weekends.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
