import {
  Box,
  Grid,
  GridItem,
  Heading,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BankList } from '../Component/User/Checkout/BankList/BankList';
import { DeliveryDetail } from '../Component/User/Checkout/DeliveryDetail/DeliveryDetail';
import { ChekcoutList } from '../Component/User/Checkout/OrderList/CheckoutList';
import { OrderSummary } from '../Component/User/Checkout/OrderSummary/OrderSummary';
import { Layout } from '../Layout';
import { axiosInstance } from '../lib/api';

const checkout = () => {
  const [cartData, setCartData] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const cartSelector = useSelector((state) => state.cartReducer);
  const authSelector = useSelector((state) => state.authReducer);

  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`/cart/user/${authSelector.id}`);
      const data = res.data.result;
      console.log(data);
      if (!data.Product_Carts.length) {
        toast({
          title: 'No Item in Cart',
          status: 'error',
          isClosable: true,
        });
        router.push(`/cart`);
        return;
      }
      setCartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [cartSelector.render]);
  return (
    <Layout>
      <Box align="center" bg="gray.100">
        <Box w="1440px" spacing={'2rem'} px="2rem">
          <Heading textAlign={'start'} pt="2rem" pb="1rem" fontSize={'32px'}>
            Chekout
          </Heading>
          <Grid
            w="100%"
            minH="100vh"
            templateColumns="repeat(7, 1fr)"
            pb="2rem"
          >
            <GridItem colSpan={5} textAlign={'start'} rounded="lg">
              <DeliveryDetail userData={cartData.User} />
              <BankList />
              <ChekcoutList cartData={cartData.Product_Carts} />
            </GridItem>
            <GridItem colSpan={2}>
              <OrderSummary cartData={cartData} />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default checkout;
