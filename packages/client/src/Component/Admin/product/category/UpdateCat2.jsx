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
import { useState, useRef } from 'react';
import { axiosInstance } from '../../../../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import qs from 'qs';

export default function updateTabel(props) {
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const { onClose } = useDisclosure();
  const autoReducer = useSelector((state) => state.automateRendering);
  const dispatch = useDispatch();

  const { tbCat, tbimg_url, idCat } = props;

  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      category: '',

      id: idCat,
    },

    validateOnChange: false,
    onSubmit: async () => {
      const { category } = formik.values;

      try {
        let body = {
          category,
        };

        await axiosInstance
          .patch(`/category/` + idCat, qs.stringify(body))
          .then(() => {
            console.log(tbCat);
            dispatch({
              type: 'FETCH_DATA',
              payload: {
                value: !autoReducer.value,
              },
            });
            toast({
              title: `Sucess`,
              status: 'success',
              isClosable: true,
            });
          });
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
        <MenuItem onClick={onOpenUpdate}>
          <Text fontWeight="bold">{tbCat}</Text>
        </MenuItem>
        <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size="lg">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />

          <ModalContent>
            <ModalHeader>Update {tbCat} </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
                <Box mt="10px">
                  <FormControl>
                    <FormLabel>Category {formik.values.category}</FormLabel>
                    <Textarea
                      placeholder="category"
                      maxLength="2000"
                      w="400px"
                      h="150px"
                      onChange={(e) => {
                        formik.setFieldValue('category', e.target.value);
                      }}
                      defaultValue={tbCat}
                    />
                  </FormControl>

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
                      Update Category
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
