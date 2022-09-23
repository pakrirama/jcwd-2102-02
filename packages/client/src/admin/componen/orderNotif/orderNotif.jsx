import {
    Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
    MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
   } from '@chakra-ui/react';
   import NextLink from 'next/link'
   // import banner from '../../assets/img/bg.png'
   // import Image from 'next/image';
   import OrderCard from "../orderNotif/orderCard/orderCard";
   
   export default function OrderNotif() {
    return (
     <Box m='15px' mb='15px' w='1090px'>
      <Box display='flex' justifyContent="center" mb='10px'>
       <Text fontWeight='bold' fontSize='lg'>Stomach, Intestines & Digestions</Text>
       {/* <NextLink href='/kategori'>
        <Text fontWeight='bold' color='#009B90' fontSize='sm' _hover={{ cursor: "pointer", color: '#224B0C' }}>Lihat semua produk</Text>
       </NextLink> */}
      </Box>
   
      <Box display='flex' justifyContent='space-between' >
       <OrderCard />
       <OrderCard />
       <OrderCard />
       <OrderCard />
   
      </Box>
     </Box >
    )
   }