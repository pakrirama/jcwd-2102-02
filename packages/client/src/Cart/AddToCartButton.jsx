import { Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../Lib/api';

export const AddToCartButton = ({ id_product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cartSelector = useSelector((state) => state.cartReducer);

  const handleAdd = async (id_product) => {
    try {
      const res = await axiosInstance.post(`cart/3/${id_product}`);
      const message = res.data.message;

      // Stock Protection
      if (message === 'Not Enoguh Stock!') {
        toast({
          title: message,
          status: 'error',
          isClosable: true,
        });
        return;
      }
      dispatch({
        type: 'SET_CART',
        payload: {
          ...cartSelector,
          total_cart: cartSelector.total_cart + 1,
        },
      });

      toast({
        title: message,
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      colorScheme={'teal'}
      w="70%"
      gap={2}
      fontSize="lg"
      onClick={() => {
        handleAdd(id_product);
      }}
    >
      <FiShoppingCart />
      Add To Cart
    </Button>
  );
};
