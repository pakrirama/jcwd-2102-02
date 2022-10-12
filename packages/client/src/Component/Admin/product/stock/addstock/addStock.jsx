import React from 'react';

import {
  chakra,
  Box,
  Text,
  SimpleGrid,
  VisuallyHidden,
  GridItem,
  Button,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  useDisclosure,
  Menu,
  MenuItem,
  Icon,
  Divider,
  Modal,
  ModalContent,
  useToast,
  Checkbox,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useState, UseEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../../../../lib/api';

export default function App(props) {
  const { id } = props;
  const toast = useToast();
  const userSelector = useSelector((state) => state.authReducer);
  const {
    isOpen: isOpenStock,
    onOpen: onOpenStock,
    onClose: onCloseStock,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      capital_price: '',
      profit: '',
      selling_price: '',
      sold_qty: '',
      primary_stock: '',
      primary_unit: '',
      secondary_stock: '',
      secondary_unit: '',
      unit_convertion: '',
      secondary_price: '',
    },
    onSubmit: async () => {
      const { capital_price, profit, selling_price, sold_qty, stock } =
        formik.values;

      try {
        await axiosInstance
          .post('/product_stock/create', { ...formik.values, id: id })
          .then(() => {
            toast({
              title: 'Product  stock has been added',
              status: 'success',
              isClosable: true,
            });
          });
        onCloseStock();
      } catch (err) {
        console.log(err);

        toast({
          title: 'Error',
          status: 'error',
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <Menu>
        <MenuItem onClick={onOpenStock}>
          <Text>stock</Text>
        </MenuItem>
        <Modal isOpen={isOpenStock} onClose={onCloseStock} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <Box
                bg="transparent"
                _dark={{
                  bg: '#111',
                }}
                p={10}
              >
                <Box>
                  <SimpleGrid
                    display={{
                      base: 'initial',
                      md: 'grid',
                    }}
                    columns={{
                      md: 3,
                    }}
                    spacing={{
                      md: 6,
                    }}
                  >
                    <GridItem
                      colSpan={{
                        md: 1,
                      }}
                    >
                      <Box px={[4, 0]}>
                        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                          New Product Stock
                        </Heading>
                      </Box>
                    </GridItem>
                    <GridItem
                      mt={[5, null, 0]}
                      colSpan={{
                        md: 2,
                      }}
                    >
                      <chakra.form
                        method="POST"
                        shadow="base"
                        rounded={[null, 'md']}
                        overflow={{
                          sm: 'hidden',
                        }}
                      >
                        <Stack
                          px={4}
                          py={5}
                          bg="white"
                          _dark={{
                            bg: '#141517',
                          }}
                          spacing={6}
                          p={{
                            sm: 6,
                          }}
                        >
                          <SimpleGrid columns={3} spacing={6}>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                {id} {formik.values.id}
                              </FormLabel>

                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                capital price
                              </FormLabel>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  bg="gray.50"
                                  _dark={{
                                    bg: 'gray.800',
                                  }}
                                  color="gray.500"
                                  rounded="md"
                                >
                                  RP
                                </InputLeftAddon>
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'capital_price',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                profit
                              </FormLabel>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  bg="gray.50"
                                  _dark={{
                                    bg: 'gray.800',
                                  }}
                                  color="gray.500"
                                  rounded="md"
                                >
                                  RP
                                </InputLeftAddon>
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'profit',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                selling_price
                              </FormLabel>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  bg="gray.50"
                                  _dark={{
                                    bg: 'gray.800',
                                  }}
                                  color="gray.500"
                                  rounded="md"
                                >
                                  RP
                                </InputLeftAddon>
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'selling_price',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                secondary price
                              </FormLabel>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  bg="gray.50"
                                  _dark={{
                                    bg: 'gray.800',
                                  }}
                                  color="gray.500"
                                  rounded="md"
                                >
                                  RP
                                </InputLeftAddon>
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'secondary_price',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                sold quantity
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'sold_qty',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                primary stock
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'primary_stock',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                primary unit
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="text"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'primary_unit',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                secondary stock
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'secondary_stock',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                secondary unit
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="text"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'secondary_unit',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                unit convertion
                              </FormLabel>
                              <InputGroup size="sm">
                                <Input
                                  type="number"
                                  placeholder="123.900"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'unit_convertion',
                                      e.target.value,
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormControl>
                          </SimpleGrid>
                        </Stack>
                        <Box
                          px={{
                            base: 4,
                            sm: 6,
                          }}
                          py={3}
                          bg="gray.50"
                          _dark={{
                            bg: '#121212',
                          }}
                          textAlign="right"
                        >
                          <Button
                            type="submit"
                            colorScheme="twitter"
                            _focus={{
                              shadow: '',
                            }}
                            fontWeight="md"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </Button>
                        </Box>
                      </chakra.form>
                    </GridItem>
                  </SimpleGrid>
                </Box>

                <Divider
                  my="5"
                  borderColor="gray.300"
                  _dark={{
                    borderColor: 'whiteAlpha.300',
                  }}
                  visibility={{
                    base: 'hidden',
                    sm: 'visible',
                  }}
                />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Menu>
    </>
  );
}
