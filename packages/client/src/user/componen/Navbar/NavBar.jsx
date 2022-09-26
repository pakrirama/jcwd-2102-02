import {
  Box, Flex, IconButton, HStack, Button, Menu, MenuButton, MenuList, MenuItem,ModalContent,ModalHeader,ModalCloseButton,ModalBody ,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay, useToast,  InputGroup,
Center, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader,
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {  BsArrowRightCircle} from "react-icons/bs";
import {TbReceipt} from "react-icons/tb"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {  RiHome2Line} from "react-icons/ri";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import logo2 from "../../../assets/imgs/logo3.png"
import jsCookie from "js-cookie";
import auth_types from "../../../redux/reducers/auth/type"
import { useRouter } from 'next/router';
import { SearchInput } from "../searchInput/Search"
import { axiosInstance } from '../../../lib/api';
import qs from "qs";
import AUthlogin from "../../../pages/auth/index"
export default function NavBar() {
  const dispatch = useDispatch();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const router = useRouter();
const toast = useToast();
  const sendVerification = async () => {

    const body = qs.stringify({ id : userSelector?.id, email: userSelector?.email,
    username : userSelector?.username})
    try{
      const res = await axiosInstance.post("/users/verifysend",
      body
      )
  
      toast({
        title: "Check the email",
        status:"success",
      isClosable:"true",
  
      })
      
    }catch(error){
      console.log(error);
    }
  }
  const register = () =>{
    router.push("/auth")
  }

  // -------------------- Untuk Logout -------------------- //
  function btnlogout() {
    async function updateStat() {
      let body = {
        online_status: false,
      }
      await axiosInstance.patch("/users/" + userSelector.id, qs.stringify(body))
    }
    updateStat()
    jsCookie.remove("auth_token");
    dispatch({
      type: auth_types.AUTH_LOGOUT
    })
    router.push("/")
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg='#ffffff' borderBottomWidth='1px' px={1} className='topnavbar' zIndex={111} width="1340px" >
        <Flex h='70px' alignItems={'center'} justifyContent={'space-between'}>
        <IconButton bg='#ffffff'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

<Link href='/home' >
            <HStack spacing={8} alignItems={'center'} _hover={{ cursor: "pointer" }}>
              <Center><Image src={logo2} alt="logo" height={"190px"} width={"210px"} /></Center>
            </HStack>
          </Link>
            
          
            
  <Flex mr="20px">

  <Flex>
              <Button background='white' mr='8px'>
             <Icon boxSize='5' as={RiHome2Line} mr="8px"/>Home
                 </Button>
                   
            <Button background='white' mr='8px'>
                <Icon boxSize='5' as={AiOutlineCloudUpload} mr='8px'/>
                Upload Prescription
              </Button>
              </Flex>
              <Flex>
              <Button background='white' mr='8px'disabled defaultValue={userSelector.id}>
                <Icon boxSize='5' as={TbReceipt}mr='8px'/>
                 Payment Confirmation
              </Button>
                </Flex>  
          </Flex>
       
       
         

              <SearchInput  />

<Flex alignItems={'center'} >
            <HStack
              >
<Box w='110px'  >
          <Text fontWeight='bold' my='1px' color='#00A8B5' borderColor='#00A8B5'>
         
          <Button w='full' borderColor="AppWorkspace" bg={"white"}  borderRadius='9px' ml="10px" size='md' my='2px' 
      onClick={onOpenSignup}>
        <Icon boxsSize="3" as={BsArrowRightCircle} />
        Sign up </Button> 
          </Text>
          <Modal isOpen={isOpenSignup} onClose={onCloseSignup} size='sm'bg="transparent">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader >Sign up </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} >
                <AUthlogin/>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
            </HStack>
           
                  </Flex>
          </Flex>
      </Box>
    </>
  );
}

