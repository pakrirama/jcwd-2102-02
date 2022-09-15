/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Heading,
  Stack,
  useColorModeValue,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Box,
  Spacer,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
  Image,
  FormLabel,
  Input,
  FormControl,
  useDisclosure,
  useToast,
  FormHelperText,
  RadioGroup,
  Radio,
  Modal,
} from '@chakra-ui/react';

import { Layout } from '../src/layout';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { BreadCrumb } from '../src/Component/BreadCrumb';
import { axiosInstance } from '../src/Lib/api';
import { AddressList } from '../src/Profile/Address/AddressList';

import ProfileEdit from '../src/Profile/EditProfile/ProfileEdit';

const Setting = () => {
  return (
    <>
      <Layout>
        <BreadCrumb
          data={[
            ['#', 'Profile'],
            ['#', 'Account&Address'],
          ]}
        />
        <Flex w="1440px" mx="auto" px="128px">
          {/* Profile Picture */}
          {/* Edit Profile */}
          <ProfileEdit />
        </Flex>
        {/* Address */}
        <Flex w="1440px" p={10} mx="auto" fontSize="xl">
          <Box w="280px" />
          <Box w="full" px={24} py={8}>
            <hr />
            <Text my={12}>Address Information</Text>
            <AddressList />
          </Box>
        </Flex>

        <Spacer />
      </Layout>
    </>
  );
};

export default Setting;
