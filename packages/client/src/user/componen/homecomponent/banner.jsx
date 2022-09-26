import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
} from '@chakra-ui/react';
// import banner from '../../assets/img/bg.png'
// import Image from 'next/image';

export default function Banner() {
 return (
  <Box display='flex' h='240px' w='
  1440px'
   backgroundPosition='center'
   backgroundSize='cover'
   backgroundRepeat="no-repeat"
   backgroundImage="url(/banner_1.png)">
   {/* <Image objectFit='cover' src={banner} /> */}
   <Box pl='20px' alignSelf='center' >
    
   </Box>
  </Box >
 )
}