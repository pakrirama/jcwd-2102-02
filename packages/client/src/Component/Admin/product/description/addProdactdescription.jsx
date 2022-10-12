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
import { axiosInstance } from '../../../../lib/api';

export default function App(props) {
  const { val } = props;
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const {
    isOpen: isOpenStock,
    onOpen: onOpenStock,
    onClose: onCloseStock,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      id: val,
      indication: '',
      compotition: '',
      how_to_use: '',
      side_effects: '',
      caution: '',
      contradictory: '',
      how_to_save: '',
      packaging: '',
    },
    onSubmit: async () => {
      const {
        purpose,
        indication,
        compotition,
        how_to_use,
        side_effects,
        caution,
        contradictory,
        how_to_save,
        packaging,
      } = formik.values;

      try {
        await axiosInstance
          .post('/product_description/', { ...formik.values, id: val })
          .then(() => {
            toast({
              title: 'Product  description has been added',
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
          <Text>Description</Text>
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
                          New Product description {val} {formik.values.val}
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
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                Id {val} {formik.values.val}
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue('id', e.target.value);
                                }}
                              />
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                purpose
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'purpose',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                indication
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue('name', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                compotition
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'compotition',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                how_to_use
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'how_to_use',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                side_effects{' '}
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'side_effects',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                caution
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'caution',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                contradictory
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'contradictory',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                how_to_save
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'how_to_save',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 4]}>
                              <FormLabel
                                htmlFor="email_address"
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                packaging
                              </FormLabel>
                              <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'packaging',
                                    e.target.value,
                                  );
                                }}
                              />
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
