import {
  Button,
  Flex,
  Box,
  Input,
  Text,
  Center,
  Divider,
  useNumberInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { axiosInstance } from '../../../lib/api';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export const MedicineForm = () => {
  const [productName, setProductName] = useState();
  const [renderState, setRenderState] = useState(false);
  const initForm = {
    label: '',
    productName: '',
    productPrice: 0,
    primaryUnit: '',
    secondaryUnit: '',
  };
  const [arrForm, setArrForm] = useState([initForm]);

  const fetchProductData = async () => {
    const res = await axiosInstance.get('/product/name');
    const data = res.data.arrProduct;
    setProductName(data);
    console.log(data);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 1000,
    });

  const handleChange = (v, i) => {
    // setArrForm(arrForm.splice(i, 1, v));
    arrForm.splice(i, 1, v);
    console.log(v);
    console.log(i);
    console.log(arrForm);
    setRenderState(!renderState);
  };

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const renderForm = () => {
    return arrForm.map((val, idx) => {
      return (
        <Box mb="1rem">
          <Divider my="0.5rem" />
          <Flex gap={2}>
            <Box>
              <Text>Product Name</Text>
              <Box minW={'15rem'}>
                <Select
                  fontSize="sm"
                  options={productName}
                  placeholder="Search Product"
                  focusBorderColor="teal.400"
                  colorScheme="purple"
                  onChange={(v) => {
                    handleChange(v, idx);
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Text>Price</Text>
              <Input
                readOnly
                focusBorderColor="teal.500"
                value={'Rp ' + val.productPrice?.toLocaleString('id-ID')}
              />
            </Box>
          </Flex>
          {/* AMMOUNT INPUT */}
          <Flex my="1rem">
            <Box textAlign={'center'}>
              <Text>QTY</Text>
              <InputGroup>
                <Button {...dec} ml="1rem" size="sm">
                  -
                </Button>

                <Input
                  {...input}
                  mx="0.5rem"
                  w="8.5rem"
                  focusBorderColor="teal.500"
                  textAlign={'center'}
                />

                <Button {...inc} mr="1rem" size="sm">
                  +
                </Button>
              </InputGroup>
            </Box>

            <Box>
              <Text>Unit</Text>
              <Input
                readOnly
                focusBorderColor="teal.500"
                value={val.primaryUnit}
              ></Input>
            </Box>
          </Flex>
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    renderForm();
  }, [renderState]);
  return (
    <>
      <Box
        fontSize="sm"
        fontWeight={'bold'}
        p="1rem"
        rounded={'lg'}
        shadow="md"
        bg="white"
      >
        {renderForm()}
        <Center>
          <Divider />
          <Button
            colorScheme={'teal'}
            variant="link"
            size="sm"
            onClick={() => {
              setArrForm([...arrForm, initForm]);
            }}
          >
            <AddIcon />
            Add Medicine
          </Button>
          <Divider />
          <Divider />
          <Button
            colorScheme={'teal'}
            variant="link"
            size="sm"
            onClick={() => {
              setArrForm(arrForm.slice(1));
            }}
          >
            <MinusIcon />
            Delete Medicine
          </Button>
          <Divider />
        </Center>

        {/* AMMOUNT INPUT */}
      </Box>
    </>
  );
};
