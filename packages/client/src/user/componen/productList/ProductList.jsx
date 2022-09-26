import {
  Flex, Box, Input, InputGroup, InputRightElement, Button,
  Select, Icon, Text, Center, CheckboxGroup, Checkbox, Stack
} from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { RiListCheck } from 'react-icons/ri';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCartOutline } from "react-icons/io5";
import NextImage from 'next/image'
import ProductCard from './ProductCard';

export default function ProductListing() {
  return (
    <>
      <Flex flexWrap={'wrap'} justifyContent={'center'}>
        <Box>
          <Box w='200px' m='10px'  boxShadow='md' bg='white' borderRadius='10px'>
            <Box h='40px' borderTopRadius='10px' bg='#009B90'>
              <Center h='40px' >
                <Icon boxSize='6' as={BsFilterLeft} color='white' />
                <Text mx='10px' fontWeight='bold' color='white'>
                  Urut Berdasarkan
                </Text>
              </Center>
            </Box>
            <Box p='15px'>
              <Select onChange={(event) => formik.setFieldValue("filter", event.target.value)}
              // defaultValue={userSelector.gender}
              >
                <option value='Lainnya'>Nama A-Z</option>
                <option value='Laki-laki'>Nama Z-A</option>
                <option value='Perempuan'>Harga Tertinggi</option>
                <option value='Perempuan'>Harga Terendah</option>
              </Select>
            </Box>
          </Box>

          <Box w='200px' m='10px'  boxShadow='md' bg='white' borderRadius='10px'>
            <Box h='40px' borderTopRadius='10px' bg='#009B90'>
              <Center h='40px' >
                <Icon boxSize='6' as={RiListCheck} color='white' />
                <Text mx='10px' fontWeight='bold' color='white'>
                  Filter Kategori
                </Text>
              </Center>
            </Box>
            <Box p='10px'>
              <Box>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box mx='5px' my='10px' maxW='810px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>
            </Box>
            <Box mx='10px'>
              <InputGroup >
                <Input required placeholder="Cari Produk" bg='white'
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)} />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    as={BiSearchAlt}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>
          {/* <Box>
            Filter Kategori versi mobile
          </Box> */}

          <Box display='flex' flexWrap={'wrap'} justifyContent='center'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />

            {/* -------------------- jangan dihapus -------------------- */}
            <Box w='180px' m='10px'>
            </Box>
            <Box w='180px' m='10px'>
            </Box>
            <Box w='180px' m='10px'>
            </Box>

          </Box>
        </Box>
      </Flex>
    </>
  )
}