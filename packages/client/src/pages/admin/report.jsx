import { Box, Flex } from '@chakra-ui/react';
import AdminNavBar from '../../Component/Admin/adminNavbar/AdminNavBar';

import SideBar from '../../Component/Admin/sidebar/sidebar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SalesReport from '../../Component/Admin/report/salesReport';
import SortProduct from '../../Component/Admin/product/sortProduct/sortDashboard';

export default function dashboard() {
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userSelector?.role === 'admin') {
      router.push('/admin/report');
    } else {
      router.push('/');
    }
  }, [userSelector?.role === 'admin']);

  return (
    <>
      <Flex>
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex flexWrap={'wrap'}>
            <SortProduct />
          </Flex>
          <Flex m="15px">
            <Box w="1400px">
              <SalesReport />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
