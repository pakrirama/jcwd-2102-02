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
    useToast

  
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from 'react-redux';
  import { axiosInstance } from "../../../lib/api";
  import {GoTrashcan} from "react-icons/go"
  import {useParams} from "react-router-dom"
  import qs from 'qs'





export default function DeletProduct (props) {
  // const {id} = useParams()
  const {  idDEl } = props;
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()  
    const userSelector = useSelector ((state)=> state.auth)

const toast = useToast()

    async function deletProduct () {
        try {
          
          
    
          await axiosInstance.delete(`/product/delete/` + idDEl )
          
    
          toast({
            title: "Succes",
            description: "Succes deleting product",
            status: "success",
            isClosable: true,
          })
        } catch (err) {
          console.log(err);
          
        }
      }

    return (
        <>
        <Menu>
        <MenuItem onClick={onOpenDelete}>
        <Icon as={GoTrashcan} />
        <Text fontWeight='semibold'>
        </Text>
        </MenuItem>
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='xs'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Box justifyContent={'space-between'}>
                    <Text>If deleted, the product item data that has been entered will be lost and the product item will be lost from the product list</Text>
                  </Box>
                  <Box mt='10px' display='flex' justifyContent='flex-end'>
                    <Button mr={3} colorScheme='red' onClick={() => {
                      async function submit() {
                         await deletProduct();
                         onCloseDelete();
                      }
                       submit()
                    }}>
                      Delete
                    </Button>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>

        </Menu>
        </>
        
    )
}