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
  Select,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../../../lib/api';
import qs from 'qs';

export default function App(props) {
  const { idProcat } = props;
  const toast = useToast();
  const userSelector = useSelector((state) => state.authReducer);
  const {
    isOpen: isOpenStock,
    onOpen: onOpenStock,
    onClose: onCloseStock,
  } = useDisclosure();

  // axios getCategory//
  const [category, setCatgory] = useState([]);

  async function getCategory() {
    // setTimeout(()=>{

    await axiosInstance.get('/category').then((res) => {
      const temp = res.data.result;
      setCatgory([...temp]);
      console.log(res.data.result);
    });
  }

  const formik = useFormik({
    initialValues: {
      id_category1: '',
      id_category2: '',

      id_product: idProcat,
    },
    onSubmit: async () => {
      const { id_product, id_category1, id_category2 } = formik.values;

      try {
        let body = {
          id_category1,
          id_product,
          id_category2,
        };

        await axiosInstance
          .post(`/product_category/`, qs.stringify(body))
          .then(() => {
            console.log(idProcat);
            console.log(id_category2);
            toast({
              title: 'Product Category has been added',
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

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Menu>
        <MenuItem onClick={onOpenStock}>
          <Text>Product Category</Text>
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
                          New Product Category
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
                                {idProcat}
                              </FormLabel>
                              <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                  color: 'gray.50',
                                }}
                              >
                                id Product
                                {idProcat}
                              </FormLabel>
                              <Input
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'id_product',
                                    e.target.value,
                                  );
                                }}
                              />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[3, 2]}>
                              {/* {category?.map ((val)=>( */}
                              <Box
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="space-evenly"
                              >
                                {formik.values.id_category1}
                                <Select
                                  // defaultValue={val.category}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'id_category1',
                                      e.target.value,
                                    );
                                  }}
                                >
                                  {category.map((val, index) => (
                                    <option value={val.id}>
                                      {val.category}
                                    </option>
                                  ))}
                                </Select>
                              </Box>

                              <Box
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="space-evenly"
                              >
                                {formik.values.id_category2}
                                <Select
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      'id_category2',
                                      e.target.value,
                                    );
                                  }}
                                >
                                  {category.map((val, index) => (
                                    <option value={val.id}>
                                      {val.category}
                                    </option>
                                  ))}
                                </Select>
                              </Box>
                              {/* ))} */}
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
