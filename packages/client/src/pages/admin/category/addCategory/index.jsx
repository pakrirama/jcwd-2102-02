import { Box, Flex } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SideBarAdd from '../../../../Component/Admin/sidebar/sidebarAdd';
import AdminNavBar from '../../../../Component/Admin/adminNavbar/AdminNavBar';
import AddCategory from '../../../../Component/Admin/product/category/addCategory/addProCat';
export default function listProduct() {
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userSelector?.role === 'admin') {
      router.push('/admin/category/addCategory');
    } else {
      router.push('/');
    }
  }, [userSelector?.role === 'admin']);

  return (
    <>
      <Flex bgGradient="linear(to-tr, #ffffff 50%, #ddf1f9 )">
        <SideBarAdd />
        <Box>
          <AdminNavBar />
          <Flex>
            <Box m="15px" h="300px" w="1000px" fontWeight="semibold" pb="100px">
              <AddCategory />{' '}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
