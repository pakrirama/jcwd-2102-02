import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartList } from '../Component/User/Cart/CartList';
import { CartSummary } from '../Component/User/Cart/CartSummary';
import { Layout } from '../layout';
import { axiosInstance } from '../lib/api';

const cart = () => {
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cartReducer);
  const authSelector = useSelector((state) => state.authReducer);
  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`/cart/user/${authSelector.id}`);
      const data = res.data.result;
      console.log(data);
      setCartData(data);

      dispatch({
        type: 'SET_CART',
        payload: {
          ...cartSelector,
          total_cart: data.total_item,
        },
      });
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
        <Box w="1440px" px="2rem">
          <Heading textAlign={'start'} pt="2rem" pb="1rem" fontSize={'32px'}>
            Shopping Cart
          </Heading>
          <Grid
            w="100%"
            minH="100vh"
            templateColumns="repeat(7, 1fr)"
            gap={4}
            pb="2rem"
          >
            <GridItem colSpan={5} textAlign={'start'} rounded="lg">
              <CartList cartData={cartData} />
            </GridItem>
            <GridItem colSpan={2}>
              <CartSummary cartData={cartData} />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default cart;
