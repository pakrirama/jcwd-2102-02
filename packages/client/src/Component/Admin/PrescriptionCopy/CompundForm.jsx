import {
  Button,
  Flex,
  Box,
  Input,
  Text,
  Center,
  Divider,
  InputGroup,
  Spacer,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { axiosInstance } from '../../../lib/api';
import { BiTrash } from 'react-icons/bi';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

export const CompoundForm = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState();
  const [renderState, setRenderState] = useState(false);
  const initForm = [
    {
      label: '',
      id: '',
      productName: '',
      primaryPrice: 0,
      primaryUnit: '',
      secondaryUnit: '',
      secondaryPrice: 0,
      quantity: 0,
    },
  ];

  const formSelector = useSelector((state) => state.prescriptionFormReducer);
  const [arrForm, setArrForm] = useState(formSelector.compound);

  const fetchProductData = async () => {
    const res = await axiosInstance.get('/product/name');
    const data = res.data.arrProduct;
    setProductName(data);
    console.log(data);
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    renderForm();
    dispatch({
      type: 'SET_PRESCRIPTION_FORM',
      payload: {
        ...formSelector,
        compound: [...arrForm],
      },
    });
  }, [renderState]);

  const renderForm = () => {
    return formSelector.compound?.map((val, idx) => {
      return (
        <Box mb="1rem" key={idx}>
          <Divider my="0.5rem" />

          <Flex gap={2}>
            <Box>
              <Text>
                Product Name
                {val.label}
              </Text>
              <Box minW={'15rem'}>
                <Select
                  fontSize="sm"
                  options={productName}
                  placeholder="Search Product"
                  defaultInputValue={val.label}
                  focusBorderColor="teal.400"
                  colorScheme="purple"
                  onChange={(v) => {
                    arrForm.splice(idx, 1, {
                      ...v,
                      quantity: 1,
                      tipe: 'Chemical Raw',
                    });
                    setRenderState(!renderState);
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Flex>
                <Text>Price {val.secondaryPrice}</Text>
                <Spacer />
                <Button
                  colorScheme={'red'}
                  variant="link"
                  size="sm"
                  onClick={() => {
                    arrForm.splice(idx, 1);
                    setRenderState(!renderState);
                  }}
                >
                  <BiTrash />
                </Button>
              </Flex>
              <Input
                readOnly
                focusBorderColor="teal.500"
                value={
                  val.quantity
                    ? 'Rp ' +
                      (val.secondaryPrice * val.quantity).toLocaleString(
                        'id-ID',
                      )
                    : ''
                }
              />
            </Box>
          </Flex>
          {/* AMMOUNT INPUT */}
          <Flex my="1rem">
            <Box textAlign={'center'}>
              <Text>QTY</Text>
              <InputGroup>
                <Button
                  ml="1rem"
                  size="sm"
                  isDisabled={val.quantity <= 1 ? true : false}
                  onClick={() => {
                    arrForm.splice(idx, 1, {
                      ...val,
                      quantity: val.quantity - 1,
                    });
                    setRenderState(!renderState);
                  }}
                >
                  -
                </Button>

                <Input
                  mx="0.5rem"
                  w="8.5rem"
                  focusBorderColor="teal.500"
                  textAlign={'center'}
                  value={val.quantity}
                  type="number"
                  onChange={(v) => {
                    arrForm.splice(idx, 1, {
                      ...val,
                      quantity: parseInt(v.target.value),
                    });
                    setRenderState(!renderState);
                  }}
                />

                <Button
                  mr="1rem"
                  size="sm"
                  onClick={() => {
                    arrForm.splice(idx, 1, {
                      ...val,
                      quantity: val.quantity + 1,
                    });
                    setRenderState(!renderState);
                  }}
                >
                  +
                </Button>
              </InputGroup>
            </Box>

            <Box>
              <Text>Unit</Text>
              <Input
                readOnly
                focusBorderColor="teal.500"
                value={val.secondaryUnit}
              ></Input>
            </Box>
          </Flex>
        </Box>
      );
    });
  };

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
              setRenderState(!renderState);
            }}
          >
            <AddIcon />
            Add Compound
          </Button>
          <Divider />
        </Center>
        {/* AMMOUNT INPUT */}
        <Button
          onClick={() => {
            console.log(formSelector.compound);
          }}
        >
          Cek form
        </Button>
        <Button
          onClick={() => {
            console.log(arrForm);
          }}
        >
          Cek arr
        </Button>
      </Box>
    </>
  );
};
