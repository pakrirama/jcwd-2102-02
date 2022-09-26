import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';
import { OrderDetail } from './OrderDetail';
import { OrderSummary } from './OrderSummary';
import { PaymentInstruction } from './PaymentInstruction';
import { Shipping } from './Shipping';

export const InvoiceContainer = () => {
  const [orderData, setOrderData] = useState();
  const userSelector = useSelector((state) => state.authReducer);
  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(`/order/MDCR3-181663117969893`);

      const data = res.data.result[0];
      console.log('invoice data');
      console.log(data);
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Box p="2rem">
      <Box maxW="1440px" mx="auto" p="2rem" shadow="lg">
        <Box>
          <Heading mb="5rem">
            <Image src="/Assets/image/MedicareHorizontalLogo.png" />
            <Box w="full" align="center">
              <Image src="/assets/image/checkmark.png" />
              <Text fontSize={'3xl'}>Thankyou,</Text>
              <Text fontSize={'3xl'}>Your Order Has Been Recived!</Text>
            </Box>
          </Heading>

          <OrderSummary data={orderData} />
          <PaymentInstruction />
          <Shipping data={orderData} />
          <OrderDetail data={orderData} />
        </Box>

        <HStack mx="auto" gap="2rem" w="70%" py="2rem">
          <Button
            w="full"
            colorScheme={'teal'}
            variant="outline"
            onClick={() => {
              console.log('Cancel');
            }}
          >
            Cancel Order
          </Button>
          <Button
            w="full"
            colorScheme={'teal'}
            onClick={() => {
              console.log('See Transaction');
              Router.push(`/transaction`);
            }}
          >
            See Transaction
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
