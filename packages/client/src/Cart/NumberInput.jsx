import { Box, Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../Lib/api';

export const NumberInput = ({ quantity, id_product }) => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cartReducer);
  const [message, setMessage] = useState(0);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const editQuantity = async () => {
    try {
      await axiosInstance.patch(`cart/3/${id_product}`, {
        quantity: input.value,
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

  const handleClick = () => {
    dispatch({
      type: 'SET_CART',
      payload: {
        ...cartSelector,
        render: !cartSelector.render,
      },
    });

    console.log(cartSelector.render);
  };

  useEffect(() => {
    handleClick();
    editQuantity();
    console.log('input');
  }, [input.value]);

  return (
    <HStack>
      <Button {...dec}>-</Button>
      <Input
        w="4rem"
        {...input}
        focusBorderColor="teal.500"
        textAlign={'center'}
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
};
