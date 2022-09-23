import { Box, Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';

export const NumberInput = ({ quantity, id_product }) => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cartReducer);
  const authSelector = useSelector((state) => state.authReducer);

  const editQuantity = async () => {
    try {
      await axiosInstance.patch(`cart/${authSelector.id}/${id_product}`, {
        quantity: input.value,
      });

      dispatch({
        type: 'SET_CART',
        payload: {
          ...cartSelector,
          render: !cartSelector.render,
        },
      });
    } catch (error) {
      console.log(error);
      console.log('gagal');
    }
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: parseInt(quantity),
      min: 1,
      max: 1000,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    editQuantity();

    console.log(input.value);
  }, [input.value]);

  return (
    <HStack>
      <Button {...dec}>-</Button>
      <Input
        {...input}
        w="4rem"
        value={quantity}
        focusBorderColor="teal.500"
        textAlign={'center'}
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
};
