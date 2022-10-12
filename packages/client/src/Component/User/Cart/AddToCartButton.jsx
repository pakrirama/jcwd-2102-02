import { Button, useToast, useDisclosure, Modal } from '@chakra-ui/react';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../lib/api';
import SwitchForm from '../Authentication/SwitchForm';

export const AddToCartButton = ({ id_product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cartSelector = useSelector((state) => state.cartReducer);
  const authSelector = useSelector((state) => state.authReducer);

  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const handleAdd = async (id_product) => {
    try {
      const res = await axiosInstance.post(
        `cart/${authSelector.id}/${id_product}`,
      );
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
    <>
      {authSelector.id ? (
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
      ) : (
        <>
          <Button
            colorScheme={'teal'}
            w="70%"
            gap={2}
            fontSize="lg"
            onClick={onOpenSignup}
          >
            <FiShoppingCart />
            Add To Cart
          </Button>
          <Modal
            isOpen={isOpenSignup}
            onClose={onCloseSignup}
            size="sm"
            bg="transparent"
          >
            <SwitchForm />
          </Modal>
        </>
      )}
    </>
  );
};
