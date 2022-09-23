import { ReactNode } from 'react';
import {
  Box,
  Input,
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
  Divider,
  Stack,
  Icon,
  Text,
  Accordion,
  VStack,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerHeader,
  Center,
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import {
  AiFillBell,
  AiFillSetting,
  AiOutlineBell,
  AiOutlineHome,
  AiFillHome,
} from 'react-icons/ai';
import {
  RiLoginCircleLine,
  RiLoginCircleFill,
  RiHistoryLine,
} from 'react-icons/ri';
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoStorefrontOutline,
  IoStorefrontSharp,
} from 'react-icons/io5';
import { useRouter } from 'next/router';
import auth_types from '../../../redux/reducer/auth/type';
import { SearchInput } from '../../../user/componen/searchInput/Search';
import jsCookie from 'js-cookie';
import { BiHelpCircle } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';

export default function AdminNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();
  function btnlogout() {
    jsCookie.remove('auth_token');
    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
  }

  return (
    <>
      <Box
        bg="white"
        borderBottomWidth="1px"
        boxShadow="md"
        px={4}
        className="topnavbar"
        zIndex={111}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            bg="#ffffff"
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Link href="/home">
            <HStack
              spacing={8}
              alignItems={'center'}
              _hover={{ cursor: 'pointer' }}
            ></HStack>
          </Link>
          <SearchInput />
          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}

              <Link onClick={onOpenCart}>
                <Button
                  background="white"
                  _hover={{
                    background: '#E8F5FD',
                    color: '#00ACEE',
                    borderBottomWidth: '3px',
                    borderBottomColor: '#3B9AE1',
                  }}
                  borderRadius={0}
                  h={16}
                  mr="8px"
                >
                  <Icon boxSize="7" as={IoMdNotificationsOutline} />
                </Button>
              </Link>
            </HStack>
            <Menu>
              <MenuButton
                style={{ textDecoration: 'none' }}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Box display="flex">
                  <Avatar
                    mx="10px"
                    alignSelf="center"
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <Box textAlign="left">
                    <Text></Text>
                    <Text fontSize="xs">Admin</Text>
                  </Box>
                </Box>
              </MenuButton>

              <MenuList>
                <LinkNext href="/profile">
                  <MenuItem>
                    <Icon
                      boxSize="6"
                      as={
                        router.pathname == '/profile'
                          ? AiFillSetting
                          : IoSettingsOutline
                      }
                    />
                    <Text ml="10px">Pengaturan</Text>
                  </MenuItem>
                </LinkNext>
                <MenuItem>
                  <Icon boxSize="6" as={BiHelpCircle} />
                  <Text ml="10px">Bantuan</Text>
                </MenuItem>
                <MenuDivider />
                <LinkNext href="/home">
                  <MenuItem onClick={btnlogout}>
                    <Icon boxSize="6" as={IoLogOutOutline} />
                    <Text ml="10px">Log Out</Text>
                  </MenuItem>
                </LinkNext>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
