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
import CategoryTabel from '../../../admin/componen/product/category/tabelCat';
import ProcatTabel from '../../../admin/componen/product/category/ProCat';
export default function listProduct() {
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userSelector?.role != 'admin') {
      router.push('/');
      console.log(userSelector.role);
      console.log('mashok');
    }
    console.log('ADADAD');
    console.log(userSelector.role);
  }, [userSelector?.role]);

  const AddnewPro = () => {
    router.push('/admin/category/addCategory');
  };

  return (
    <>
      <Flex bgGradient="linear(to-tr, #ffffff 50%, #ddf1f9 )">
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex
            flexWrap={'wrap'}
            paddingTop="10px"
            justifyContent={'space-between'}
          >
            <Box m="10px" h="50px" w="100px" fontWeight="semibold">
              {' '}
              Category{' '}
            </Box>
            <Flex ml="96px">
              <Box m="5px" h="50px" w="200px">
                <Button
                  w="full"
                  bg="#00A8B5"
                  borderRadius="5px"
                  size="md"
                  my="5px"
                  textColor={'white'}
                  disabled={userSelector?.id ? false : true}
                  onClick={AddnewPro}
                >
                  <Icon boxSize="3" as={AiOutlinePlus} mr="5px" />
                  Add New Category
                </Button>
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <Box m="10px" h="100px" w="800px" fontWeight="semibold">
              <Navpro />
              <SearchPro />
            </Box>
          </Flex>
          <Flex>
            <Box m="15px" h="300px" w="1400px" fontWeight="semibold" pb="100px">
              <CategoryTabel />{' '}
            </Box>
          </Flex>
          {/* <Flex>

      <Box m='15px' h='300px' w='1000px'fontWeight='semibold'pb= "100px">  
     <ProcatTabel/> </Box>
   </Flex> */}
        </Box>
      </Flex>
    </>
  );
}
