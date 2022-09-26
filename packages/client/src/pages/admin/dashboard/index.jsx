import {
 Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button, Center, VStack
} from '@chakra-ui/react';
import AdminNavBar from "../../../admin/componen/adminNavbar/AdminNavBar"
import SideBar from "../../../admin/componen/sidebar/sidebar"
import {  useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { useEffect } from 'react';



export default function dashboard() {

  const router = useRouter();
  const userSelector = useSelector((state) => state.auth);



  useEffect(() => {
    if (userSelector?.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/home");
    }
  }, [userSelector?.role === "admin"]);

 return (
    <>
  <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
   <SideBar />
   <Box >
    <AdminNavBar />
    <Flex flexWrap={'wrap'} p='15px'>

     <Box m='10px' h='300px' w='300px'fontWeight='semibold'> Today's activities </Box>
     <Box m='10px' h='300px' w='300px'> Dashboard </Box>
     <Box m='10px' h='300px' w='300px'> Dashboard </Box>
     <Box m='10px' h='300px' w='300px'> Dashboard </Box>
    </Flex>

   </Box>

  </Flex>
    </>

 )
}