import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../../../lib/api';
import { GoTrashcan } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import qs from 'qs';

export default function DeletProduct(props) {
  // const {id} = useParams()
  const { idDElstock } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const autoReducer = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  async function deletProduct() {
    try {
      await axiosInstance.delete(`/product_stock/delete/` + idDElstock);
      dispatch({
        type: 'FETCH_DATA',
        payload: {
          value: !autoReducer.value,
        },
      });

      toast({
        title: 'Succes',
        description: 'Succes deleting Stock product',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button
        focusBorderColor="black"
        color="#00A8B5"
        ml="10px"
        onClick={onOpen}
      >
        <Icon as={GoTrashcan} />
      </Button>
      <Menu>
        <MenuItem>
          <Text fontWeight="semibold"></Text>
        </MenuItem>
        <Modal isOpen={isOpen} onClose={onClose} size="xs">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>Delete Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box justifyContent={'space-between'}>
                <Text>
                  If deleted, the product item data that has been entered will
                  be lost and the product item will be lost from the product
                  list
                </Text>
              </Box>
              <Box mt="10px" display="flex" justifyContent="flex-end">
                <Button
                  mr={3}
                  colorScheme="red"
                  onClick={() => {
                    async function submit() {
                      await deletProduct();
                      onClose();
                    }
                    submit();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Menu>
    </>
  );
}
