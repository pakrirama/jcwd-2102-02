import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay, Center
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link'
import upload from '../../../assets/imgs/Frame_1.png'
import time from "../../../assets/imgs/Frame_2.png"
import check from "../../../assets/imgs/Frame_3.png"

export default function HomeBadge() {
 return (
  <Box m='15px' mb='15px' w='1090px'
  >
   <Box display='flex' justifyContent='center' ml="210px" w='562px ' left="439px" height="42px" top="520px" border-radius="nullpx">
    <Text fontWeight='bold' fontFamily="DM Sans" fontSize='lg'>Order Prescription in 3 step</Text>
   </Box>

   <Box display='flex' flexWrap='wrap' mt='15px' mb='30px' justifyContent='center' >

     <Center borderLeftRadius='16px' w='160px' h='190px'mr="200px">
      <Image src={upload} height='175px' width='175px' left="202px"top= "630px"border-radius="900px" />
     </Center>
    
     <Center borderLeftRadius='16px' w='160px' h='190px' mr="200px">
      <Image src={time} height='175px' width='175px' left="635px"top= "630px"border-radius="900px" />
     </Center>

     <Center borderLeftRadius='16px' w='160px' h='190px'>
      <Image src={check} height='175px' width='175px' left="1069px"top= "630px"border-radius="900px" />
     </Center>
     
   </Box >
   <Box display='flex' flexWrap='wrap' mt='15px' mb='30px' justifyContent='center' >
   <Box alignSelf='center' w='200px' mr="200px" ml="90x" >

      <Text fontFamily="DM Sans" fofontSize='md'>Upload your prescription item(s) and sign up to register your personal details if you don’t have an account.</Text>
     </Box>

     <Box alignSelf='center' w='200px' mr="200px" >
      <Text fontFamily="DM Sans" fofontSize='md'>Our pharmacists will check and validate your uploaded prescription </Text>
     </Box>

     <Box alignSelf='center' w='200px'>
      <Text fontFamily="DM Sans" fofontSize='md'>We will let you know when it's ready or on the way - it's that easy</Text>
     </Box>

   </Box>
  </Box>
 )
}