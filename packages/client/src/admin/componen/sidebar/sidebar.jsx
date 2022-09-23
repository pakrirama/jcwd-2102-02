import {
 Box, Input,
 Flex,
 Avatar,
 HStack,
 Link,
 IconButton,
 Button,
 Menu,
 MenuButton,
 MenuList,
 MenuItem,
 MenuDivider,
 useDisclosure,
 useColorModeValue, Divider,
 Stack, Icon, Text, Accordion, VStack, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
 Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../../assets/imgs/logo2.png"
import {BsBoxSeam} from "react-icons/bs"
import {GrScorecard} from "react-icons/gr"
import {MdOutlineShowChart} from "react-icons/md"
import {FiHome} from "react-icons/fi"







export default function SideBar() {

    const router = useRouter();

 return (
    <>
  <Box boxShadow='xl' className='sideBar' borderRightWidth='1px' bg='white' w='240px' >
   <Box className='sideBar'>

    <Link href='/home' >
     <HStack height="150px" w='240px'  justifyContent={'center'} spacing={1} alignItems={'center'} _hover={{ cursor: "pointer" }}>
      <Center><Image src={logo} width='200px' height='150px' /></Center>
     </HStack>
    </Link>
  

<LinkNext href='/admin/dashboard'>
    <Box display='flex' my='5px' style={router.pathname == '/admin/dashboard' ? { textDecoration: "none", color: '#00ACEE' ,borderBottomWidth: '3px',background: '#E8F5FD' }
                    : { textDecoration: "none" }} _hover={{ background: '#E8F5FD', cursor: "pointer", color: '#00ACEE' }} zIndex={111}>
     <Center ml='5px' justifyContent={'center'} alignContent='center' h='50px' w='50px'>
      <Icon boxSize='7' as={FiHome} />
     </Center>
     <Center ml='10px'>
      <Text fontWeight='bold'>Dashboard</Text>
     </Center>
    </Box>

</LinkNext>

<LinkNext href='/admin/product'>
    <Box display='flex' my='5px' style={router.pathname == '/admin/product'  ? { textDecoration: "none", color: '#00ACEE' ,borderBottomWidth: '3px',background: '#E8F5FD' }
                    : { textDecoration: "none" }} 
                    
                    _hover={{ background: '#E8F5FD', cursor: "pointer", color: '#00ACEE' }} zIndex={111}>
     <Center ml='5px' justifyContent={'center'} alignContent='center' h='50px' w='50px'>
      <Icon boxSize='7' as={BsBoxSeam} />
     </Center>
     <Center ml='10px'>
      <Text fontWeight='bold'>Product</Text>
     </Center>
    </Box>

</LinkNext>

<LinkNext href='/home'>
    <Box display='flex' my='5px' style={router.pathname == '/admin/order' ? { textDecoration: "none", color: '#00ACEE' ,borderBottomWidth: '3px',background: '#E8F5FD' }
                    : { textDecoration: "none" }} _hover={{ background: '#E8F5FD', cursor: "pointer", color: '#00ACEE' }} zIndex={111}>
     <Center ml='5px' justifyContent={'center'} alignContent='center' h='50px' w='50px'>
      <Icon boxSize='7' as={GrScorecard} />
     </Center>
     <Center ml='10px'>
      <Text fontWeight='bold'>Order</Text>
     </Center>
    </Box>

</LinkNext>

<LinkNext href='/home'>
    <Box display='flex' my='5px' style={router.pathname == '/admin/sales' ? { textDecoration: "none", color: '#00ACEE' ,borderBottomWidth: '3px',background: '#E8F5FD' }
                    : { textDecoration: "none" }} _hover={{ background: '#E8F5FD', cursor: "pointer", color: '#00ACEE' }} zIndex={111}>
     <Center ml='5px' justifyContent={'center'} alignContent='center' h='50px' w='50px'>
      <Icon boxSize='7' as={MdOutlineShowChart} />
     </Center>
     <Center ml='10px'>
      <Text fontWeight='bold'>Sales report</Text>
     </Center>
    </Box>

</LinkNext>

   </Box>

  </Box>
    </>
 )
}