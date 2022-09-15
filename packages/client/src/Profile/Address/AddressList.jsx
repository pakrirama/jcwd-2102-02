import React from 'react';
import {
  Stack,
  Text,
  Box,
  Spacer,
  useToast,
  Flex,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';
import { FiTrash } from 'react-icons/fi';
import AddressEdit from './AddressEdit';
import AddresAdd from './AddressAdd';

export const AddressList = () => {
  const toast = useToast();

  const [addressData, setAddressData] = useState([]);
  const dispatch = useDispatch();

  const renderSelector = useSelector((state) => state.renderReducer);
  const userSelector = useSelector((state) => state.authReducer);

  const handleDelete = async (params) => {
    try {
      const res = await axiosInstance.delete(`/address/${params}`);
      if (res.status != 200) {
        throw new Error(res.message);
      }
      toast({
        title: 'Address Deleted',
        status: 'success',
        isClosable: true,
      });
      fetchAddress();
    } catch (err) {
      toast({
        title: `Error ${err}`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const editDefaultAddress = async (params) => {
    try {
      const res = await axiosInstance.patch(`users/3/address/${params}`);
      const message = res.data.message;
      toast({
        title: message,
        status: 'success',
        isClosable: true,
      });
      dispatch({
        type: 'AUTH_LOGIN',
        payload: {
          ...userSelector,
          default_address: params,
        },
      });
      dispatch({
        type: 'FETCH_DATA',
        payload: {
          value: !renderSelector.value,
        },
      });
      console.log(userSelector);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await axiosInstance.get(`/address/user/3`);
      const data = res.data.result;
      setAddressData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  useEffect(() => {
    fetchAddress();
  }, [renderSelector.value]);

  return (
    <>
      <SimpleGrid columns={{ base: 2 }} gap={8} px={4}>
        {addressData?.map((val, idx) => {
          return (
            <Box
              p={8}
              border="1px"
              rounded="lg"
              borderColor={'gray.200'}
              fontSize={'md'}
              key={idx}
              _hover={{ borderColor: 'teal.400', borderWidth: '1px' }}
            >
              <Text fontWeight={'bold'} pt={2}>
                Address {idx + 1}
              </Text>
              <Stack>
                <Text>
                  {val.address}, {val.city}, {val.province}
                </Text>
                <Text>{val.postal_code}</Text>
              </Stack>
              <Box display="flex" gap={2}>
                <Badge
                  pt="4px"
                  rounded={'lg'}
                  mt={2}
                  cursor="pointer"
                  colorScheme={
                    val.id == userSelector.default_address ? 'teal' : 'gray'
                  }
                  onClick={() => {
                    editDefaultAddress(val.id);
                    console.log(userSelector.default_address);
                  }}
                >
                  Default
                </Badge>
                <Spacer />
                <AddressEdit id={val.id} />
                <Box
                  fontSize={'2xl'}
                  color="red"
                  cursor="pointer"
                  mt={2}
                  onClick={() => {
                    handleDelete(val.id);
                  }}
                >
                  <FiTrash />
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      <Flex m={8}>
        <Spacer />
        {/* ADD Address */}
        <AddresAdd />
      </Flex>
    </>
  );
};
