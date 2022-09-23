import {
    Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
    MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button, Center, VStack
   } from '@chakra-ui/react';
   import { AiOutlinePlus } from "react-icons/ai";
   import {  useSelector } from 'react-redux';
   import { useRouter } from "next/router";
   import { useEffect } from 'react';
   import SideBarAdd from "../../../.././admin/componen/sidebar/sidebarAdd"
   import AdminNavBar from "../../../../admin/componen/adminNavbar/AdminNavBar"
import AddCategory from   '../.././../../admin/componen/product/category/addCategory/addProCat'
   export default function listProduct() {
   
     const router = useRouter();
     const userSelector = useSelector((state) => state.auth);
   
   
   


     useEffect(() => {
      if (userSelector?.role === "admin") {
        router.push("/admin/category/addCategory");
      } else {
        router.push("/home");
      }
    }, [userSelector?.role === "admin"]);
  

    return (
       <>
     <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>

      <SideBarAdd />
      <Box >
       <AdminNavBar />
   <Flex>
      <Box m='15px' h='300px' w='1000px'fontWeight='semibold'pb= "100px">  
      <AddCategory/> </Box>
   </Flex>
      </Box>
   
     </Flex>
       </>
   
    )
   }