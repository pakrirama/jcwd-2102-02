import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Menu,
  MenuButton,
  AlertIcon,
  Alert,
  MenuDivider,
  Text,
  Icon,
  useDisclosure,
  Link,
  Modal,
  Button,
  Center,
  VStack,
} from '@chakra-ui/react';
import AdminNavBar from '../../../admin/componen/adminNavbar/AdminNavBar';
import SideBar from '../../../admin/componen/sidebar/sidebar';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navpro from '../../../admin/componen/product/navProduct/navPro';
import SearchPro from '../../../admin/componen/product/searchpro/Searhchpro';
import ProductTabel from '../../../admin/componen/product/productTabel/productTabel';
//  import FilterProduct from '../../../admin/componen/product/category/filterCategory/filterCategory';
import SortProduct from '../../../admin/componen/product/sortProduct/sort';

export default function listProduct() {
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userSelector?.role === 'admin') {
      router.push('/admin/product');
    } else {
      router.push('/home');
    }
  }, [userSelector?.role === 'admin']);

  const AddnewPro = () => {
    router.push('/admin/product/addNewproduct');
  };

  return (
    <>
      <Flex
        bgGradient="linear(to-tr, #ffffff 50%, ##ffffff )"
        w="100%"
        h="100%"
      >
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex
            flexWrap={'wrap'}
            paddingTop="10px"
            justifyContent={'space-around'}
          >
            <Box m="10px" h="50px" w="100px" fontWeight="semibold">
              {' '}
              Product List{' '}
            </Box>
            <Flex>
              <Box m="5px" h="50px" w="200px">
                <Button
                  w="full"
                  bg="#00A8B5"
                  borderRadius="5px"
                  size="md"
                  my="5px"
                  textColor={'white'}
                  disabled={userSelector.id ? false : true}
                  onClick={AddnewPro}
                >
                  <Icon boxSize="3" as={AiOutlinePlus} mr="5px" />
                  Add New Product
                </Button>
              </Box>
            </Flex>
          </Flex>
          <Flex dir="row">
            <Box
              mb={'10px'}
              ml="10px"
              h="100px"
              w="800px"
              fontWeight="semibold"
            >
              <Navpro />

              <Box mt="10px">
                <SearchPro />
              </Box>
            </Box>
          </Flex>
          <Flex mt="10px">
            {/* <FilterProduct/> */}
            <SortProduct />
          </Flex>

          <Flex>
            <Box
              m="15px"
              h="300px"
              w="1400px"
              fontWeight="semibold"
              pb="100px"
              bg="#ffffff"
            >
              <ProductTabel />{' '}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
