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
import AdminNavBar from '../../Component/Admin/adminNavbar/AdminNavBar';
import SideBar from '../../Component/Admin/sidebar/sidebar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProductHistory from '../../Component/Admin/product/product_history/productHistory';
import SortProduct from '../../Component/Admin/product/sortProduct/sortDashboard';
export default function dashboard() {
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userSelector?.role === 'admin') {
      router.push('/admin/productHistory');
    } else {
      router.push('/');
    }
  }, [userSelector?.role === 'admin']);

  return (
    <>
      <Flex bgGradient="linear(to-tr, #ffffff 50%, #ddf1f9 )">
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex flexWrap={'wrap'} p="30px">
            <SortProduct />
          </Flex>
          <Flex>
            <Box w="1400px">
              <ProductHistory />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
