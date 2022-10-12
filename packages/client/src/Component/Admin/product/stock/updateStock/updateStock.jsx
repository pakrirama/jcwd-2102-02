import {
  Box,
  Flex,
  Text,
  chakra,
  Button,
  Icon,
  VisuallyHidden,
  useDisclosure,
  Menu,
  MenuItem,
  useToast,
  Textarea,
  ModalBody,
  FormLabel,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  Stack,
  FormControl,
  ModalOverlay,
  Modal,
  Image,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../../../../lib/api';
import { useFormik } from 'formik';
import { FiEdit } from 'react-icons/fi';
import qs from 'qs';

export default function UpdateTabel(props) {
  const {
    idUpStock,
    upCapital,
    upProfit,
    upSold_qty,
    upStock,
    upSelling,
    upStockunit,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const autoReducer = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      capital_price: upCapital,
      profit: upProfit,
      selling_price: upSelling,
      sold_qty: upSold_qty,
      primary_stock: upStock,
      primary_unit: upStockunit,
    },

    validateOnChange: false,
    onSubmit: async () => {
      try {
        await axiosInstance
          .patch(`/product_stock/update/` + idUpStock, formik.values)
          .then(() => {
            dispatch({
              type: 'FETCH_DATA',
              payload: {
                value: !autoReducer.value,
              },
            });
            toast({
              title: `Success`,
              status: 'success',
              isClosable: true,
            });
          });
        onClose();
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
      <Button
        focusBorderColor="black"
        color="#00A8B5"
        ml="10px"
        onClick={onOpen}
      >
        <Icon as={FiEdit} />
      </Button>
      <Menu>
        <MenuItem>
          <Text fontWeight="semibold"></Text>
        </MenuItem>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />

          <ModalContent>
            <ModalHeader>Update Stock {idUpStock}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
                <Box maxW="400px" maxH="350px" objectFit="fill"></Box>

                <Box mt="10px">
                  <FormControl>
                    <FormLabel>
                      capital price {formik.values.capital_price}
                    </FormLabel>

                    <Textarea
                      placeholder="capital_price"
                      maxLength="2000"
                      w="400px"
                      h="150px"
                      onChange={(e) => {
                        formik.setFieldValue('capital_price', e.target.value);
                      }}
                      defaultValue={upCapital}
                    />
                  </FormControl>

                  <FormControl mt="10px">
                    <FormLabel>profit {formik.values.profit}</FormLabel>
                    <Input
                      placeholder="profit"
                      maxLength="2000"
                      w="400px"
                      onChange={(e) => {
                        formik.setFieldValue('profit', e.target.value);
                      }}
                      defaultValue={upProfit}
                    />
                  </FormControl>

                  <FormControl mt="10px">
                    <FormLabel>selling price{upSelling}</FormLabel>
                    <Input
                      placeholder="selling_price"
                      maxLength="2000"
                      w="400px"
                      onChange={(e) => {
                        formik.setFieldValue('selling_price', e.target.value);
                      }}
                      defaultValue={upSelling}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      sold quantity {formik.values.sold_qty}
                    </FormLabel>

                    <Textarea
                      placeholder="sold_qty"
                      maxLength="2000"
                      w="400px"
                      h="150px"
                      onChange={(e) => {
                        formik.setFieldValue('sold_qty', e.target.value);
                      }}
                      defaultValue={upSold_qty}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      primary stock {formik.values.primary_stock}
                    </FormLabel>

                    <Textarea
                      placeholder="primary_stock"
                      maxLength="2000"
                      w="400px"
                      h="150px"
                      onChange={(e) => {
                        formik.setFieldValue('primary_stock', e.target.value);
                      }}
                      defaultValue={upStock}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      primary unit {formik.values.primary_unit}
                    </FormLabel>

                    <Textarea
                      placeholder="primary_unit"
                      maxLength="2000"
                      w="400px"
                      h="150px"
                      onChange={(e) => {
                        formik.setFieldValue('primary_unit', e.target.value);
                      }}
                      defaultValue={upStockunit}
                    />
                  </FormControl>

                  <FormControl></FormControl>
                  <Box mt={'17px'} justifyContent="flex-end">
                    <Button
                      mr={3}
                      colorScheme="twitter"
                      onClick={() => {
                        async function submit() {
                          await formik.handleSubmit();
                          onClose();
                        }
                        submit();
                      }}
                    >
                      Update Stock
                    </Button>
                  </Box>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Menu>
    </>
  );
}
