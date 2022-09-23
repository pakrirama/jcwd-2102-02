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
  useColorModeValue, Divider,
  Stack, Icon, Text, Accordion, VStack, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {  RiHome2Line} from "react-icons/ri";
import { FaRegHeart, FaHome,FaPills } from "react-icons/fa";
import { MdOutlineCategory, MdPersonAdd } from 'react-icons/md';
import { AiFillBell, AiFillSetting, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill, RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline, IoLogOutOutline, IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {TbReceipt} from "react-icons/tb"
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import auth_types from "../../../redux/reducers/auth/type";
import Image from 'next/image';
import logo from "../../../assets/imgs/logo2.png"
import {SearchInput} from "../searchInput/Search"
import { BiAddToQueue, BiHelpCircle } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import jsCookie from "js-cookie";
import { useSelector } from 'react-redux';
const Links = ['Beranda', 'Produk', 'Kategori'];



export default function NavBarSignIn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const router = useRouter();
  const userSelector = useSelector((state)=>state.auth)
const dispatch = useDispatch();
  function btnlogout() {
    jsCookie.remove("auth_token");
    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
  }
  return (
    <>
      <Box bg='#ffffff' borderBottomWidth='1px' boxShadow='md' px={4} className='topnavbar' zIndex={111}>
        <Flex h="80px" alignItems={'center'} justifyContent={'space-between'}>
          <IconButton bg='#ffffff'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Link href='/home' >
            <HStack spacing={8} alignItems={'center'} _hover={{ cursor: "pointer" }}>
              <Center><Image src={logo} alt="logo" height={"190px"} width={"210px"} />
              </Center>
            </HStack>
          </Link>
              

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
              <Button background='white' mr='8px'>
                <Icon boxSize='5' as={TbReceipt}mr='8px'/>
                 Payment Confirmation
              </Button>
                </Flex>  
<SearchInput/>
          <Flex alignItems={'center'} ml="10px">
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}


           

              <Link onClick={onOpenCart} >
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16} mr='8px'rounded="2xl">
                  <Icon boxSize='7' as={IoCartOutline} />
                </Button>
              </Link>

              <Drawer
                isOpen={isOpenCart}
                placement='right'
                onClose={onCloseCart}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Keranjang</DrawerHeader>

                  <DrawerBody>
                    <Input placeholder='Type here...' />
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar ml='10px'
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>

              <MenuList>
                <LinkNext href="/profilesetting">
                  <MenuItem> <Avatar
                    size={'sm'}
                    src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  /> <Text ml='10px' fontWeight='bold'>{userSelector.username}</Text></MenuItem>
                </LinkNext>
                <MenuDivider />
                <LinkNext href="/profilesetting">
                  <MenuItem><Icon boxSize='6' as={RiHistoryLine} /><Text ml='10px'>History Belanja</Text></MenuItem>
                </LinkNext>
                <LinkNext href="/profilesetting">
                  <MenuItem><Icon boxSize='6' as={router.pathname == "/profilesetting" ? AiFillSetting : IoSettingsOutline} /><Text ml='10px'>Pengaturan</Text></MenuItem>
                </LinkNext>
                <MenuItem><Icon boxSize='6' as={BiHelpCircle} /><Text ml='10px'>Bantuan</Text></MenuItem>
                <MenuDivider />
                <LinkNext href="/auth">
                <MenuItem onClick={btnlogout}><Icon boxSize='6' as={IoLogOutOutline} /><Text ml='10px'>Log Out</Text></MenuItem>
                </LinkNext>
              </MenuList>
            </Menu>
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
                    <Icon boxSize='7' as={router.pathname == '/login' ? RiLoginCircleFill : FaRegHeart} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Upload Resep
                  </Box>
                </HStack>
              </Link>

              <Link href='./register' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Keranjang
                  </Box>
                </HStack>
              </Link>

              <Divider />
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    History Belanja
                  </Box>
                </HStack>
              </Link>
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Pengaturan
                  </Box>
                </HStack>
              </Link>
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Bantuan
                  </Box>
                </HStack>
              </Link>

              <Divider />
              <Link href='./auth' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='7' as={IoLogOutOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Logout
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