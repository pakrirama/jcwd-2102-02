import { ReactNode } from 'react';
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
  useColorModeValue,
  Stack, Icon, Text, VStack, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCategory, MdCategory, MdPersonAddAlt, MdPersonAdd } from 'react-icons/md';
import { AiFillBell, AiFillSetting, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill } from "react-icons/ri";
import { IoSettingsOutline, IoLogOutOutline, IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import Image from 'next/image';
import logo from '../../assets/img/healthymedLogo.png'
import { useRouter } from 'next/router';
import { FcLike } from "react-icons/fc";
import { BiAddToQueue, BiHelpCircle } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { useEffect } from 'react';
// import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';
import {  useSelector } from 'react-redux'

const Links = ['Beranda', 'Produk', 'Kategori'];

// const NavLink = ({ children }, { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const router = useRouter();
  const userSelector = useSelector((state) => state.auth);
  //   useEffect(() => {
  //   console.log(userSelector);
  //   if (userSelector?.id) {
  //     router.push("/home");
  //   } else {

  //   }
  // }, [userSelector?.id]);

  return (
    <>
  

      <Box  bg='#ffffff' borderBottomWidth='1px' boxShadow='md' px={4} className='topnavbar' zIndex={111}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton bg='#ffffff'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Link href='/home' >
            <HStack spacing={8} alignItems={'center'} _hover={{ cursor: "pointer" }}>
              <Center><Image src={logo} alt="logo" width='180px' height='40px' /></Center>
            </HStack>
          </Link>

          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <LinkNext href='/home'>
              
                <Button background='white'
                  style={router.pathname == '/home' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Beranda
                </Button>
              </LinkNext>
              <LinkNext href='/productlist' className='Button-Navbar' style={{ textDecoration: "none" }}>
                <Button background='white'
                  style={router.pathname == '/productlist' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Produk
                </Button>
              </LinkNext>
              <Link className='Button-Navbar' style={{ textDecoration: "none" }}>
                <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
                  Kategori
                </Button>
              </Link>
              <LinkNext href='/login'>
                <Button colorScheme='twitter' size='sm'>
                  Sign in
                </Button>
              </LinkNext>
              <LinkNext href='/register'>
                <Button colorScheme='gray' size='sm'>
                  Daftar
                </Button>
              </LinkNext>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>

              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <Link href='./home' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/home' ? AiFillHome : AiOutlineHome} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Beranda
                  </Box>
                </HStack>
              </Link>

              <Link href='./productlist' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/produk' ? IoStorefrontSharp : IoStorefrontOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Produk
                  </Box>
                </HStack>
              </Link>

              <Accordion defaultIndex={[0]} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between'>
                      <HStack ml='-15px' color='#4c4c4d'>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='7' as={MdOutlineCategory} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
                          Kategori
                        </Box>
                      </HStack>

                      {/* <Box flex='1' textAlign='left'>
                        Kategori
                      </Box> */}

                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={2} p='0px'>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Kepala
                      </Box>
                    </HStack>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Pinggang
                      </Box>
                    </HStack>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Perut
                      </Box>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Link href='./login' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/login' ? RiLoginCircleFill : RiLoginCircleLine} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Sign in
                  </Box>
                </HStack>
              </Link>

              <Link href='./register' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/register' ? MdPersonAdd : MdPersonAddAlt} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Daftar
                  </Box>
                </HStack>
              </Link>

            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}