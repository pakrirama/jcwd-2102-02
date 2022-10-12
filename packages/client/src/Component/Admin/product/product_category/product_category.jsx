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
  GridItem,
  ModalBody,
  FormLabel,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  FormControl,
  ModalOverlay,
  Modal,
  Image,
  Select,
  Td,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import qs from 'qs';
import UpdateProCat from './Update';
import DeletProductCat from './delete';
import { Form } from 'react-router-dom';
// import { Select } from 'chakra-react-select';

export default function updateTabel(props) {
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const { idPro, catlist } = props;

  const [category, setCatgory] = useState([]);
  const autoReducer = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  async function getCategory() {
    // setTimeout(()=>{

    await axiosInstance.get('/category').then((res) => {
      const temp = res.data.result;
      setCatgory([...temp]);
    });

    // },2000)
  }
  const formik = useFormik({
    initialValues: {
      id_category1: 0,
      id_category2: 0,

      id_product: idPro,
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
          .patch(`/product_category/update/` + idPro, qs.stringify(body))
          .then(() => {
            console.log(idPro);
            dispatch({
              type: 'FETCH_DATA',
              payload: {
                value: !autoReducer.value,
              },
            });
            toast({
              title: 'Product Category has been added',
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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Menu>
      <MenuItem onClick={onOpenUpdate}>
        <Text>Product Category</Text>
      </MenuItem>

      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size="lg">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent>
          <ModalHeader>
            Product Cateogry
            {idPro}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl as={GridItem} colSpan={[3, 2]}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: 'gray.50',
                }}
              >
                {idPro}
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
                {idPro}
              </FormLabel>
              <Input
                onChange={(e) => {
                  formik.setFieldValue('id_product', e.target.value);
                }}
              />
            </FormControl>

            {catlist?.map((val, index) => (
              <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
                <FormControl>
                  <Select
                    onChange={(e) => {
                      index = index + 1;
                      formik.setFieldValue(
                        'id_category' + index,
                        e.target.value,
                      );
                    }}
                  >
                    {category?.map(
                      (cat) =>
                        cat.id === val.id ? (
                          <option value={val.id} selected>
                            {' '}
                            {val.category}{' '}
                          </option>
                        ) : (
                          <option value={cat.id}> {cat.category} </option>
                        ),
                      // alert(cat.id)
                    )}
                  </Select>
                </FormControl>
                <Flex>
                  <Flex>
                    <DeletProductCat id_cat={val.id} id_pro={idPro} />
                  </Flex>
                </Flex>
              </Box>
            ))}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Menu>
  );
}
