import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';
import NextImage from 'next/image';
import Logo from '../../../../public/Assets/image/MedicareHorizontalLogo.png';
import { FiAlertCircle } from 'react-icons/fi';

export const NabvarAdmin = () => {
  return (
    <>
      <Flex h="5rem" shadow="lg">
        <Flex w="1440px" mx="auto">
          <Box h="full" pt="1rem" w="280px" mx="1rem">
            <NextImage src={Logo} />
          </Box>

          <Box mx="auto" w="full" pt="1rem" px="3rem">
            <InputGroup>
              <InputLeftElement color="gray.400">
                <FaSearch />
              </InputLeftElement>
              <Input
                focusBorderColor="teal.400"
                placeholder="Search something here please"
              />
              <InputRightElement
                width="8rem"
                px={2}
                color={'white'}
                cursor="pointer"
                bg="teal.400"
                _hover={{ bg: 'teal.500' }}
                borderRightRadius="md"
              >
                Search
              </InputRightElement>
            </InputGroup>
          </Box>
          <Flex px="1rem">
            {/* Cart Icon */}
            <NextLink href="/cart">
              <IconButton
                bg="white"
                aria-label="open menu"
                _active={{ bg: 'white' }}
                _hover={{ bg: 'white' }}
                icon={<FiAlertCircle />}
              />
            </NextLink>

            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
              >
                <Avatar
                  sixe="md"
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <NextLink fontSize="bold" href="/setting">
                  <MenuItem>My Profile</MenuItem>
                </NextLink>
                <NextLink href="/transaction">
                  <MenuItem>Transaaction</MenuItem>
                </NextLink>
                <MenuItem>Help&Support</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
