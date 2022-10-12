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
import { axiosInstance } from '../../../../lib/api';
import { GoTrashcan } from 'react-icons/go';

export default function DeletProduct(props) {
  // const {id} = useParams()
  const { idDEl } = props;
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const autoReducer = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  async function deletCategory() {
    try {
      await axiosInstance.delete(`/category/delete/` + idDEl);

      dispatch({
        type: 'FETCH_DATA',
        payload: {
          value: !autoReducer.value,
        },
      });
      toast({
        title: 'Succes',
        description: 'Succes deleting category',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Menu>
        <MenuItem onClick={onOpenDelete}>
          <Icon as={GoTrashcan} />
          <Text fontWeight="semibold"></Text>
        </MenuItem>
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete catgeory</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box justifyContent={'space-between'}>
                <Text>
                  If deleted, the category item data that has been entered will
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
                      await deletCategory();
                      onCloseDelete();
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
