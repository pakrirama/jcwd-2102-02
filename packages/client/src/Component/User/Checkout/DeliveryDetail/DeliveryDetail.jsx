import {
  Heading,
  Box,
  Text,
  Stack,
  Badge,
  Spacer,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../../lib/api';
import { ChangeAddress } from './ChangeAddress';

export const DeliveryDetail = () => {
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState({});
  const authSelector = useSelector((state) => state.authReducer);
  const renderSelector = useSelector((state) => state.renderReducer);
  const getDefaultAddress = async () => {
    console.log(authSelector);
    try {
      const res = await axiosInstance.get(
        `/address/${authSelector.default_address}`,
      );
      const data = res.data.result[0];
      setAddressData(data);
      dispatch({
        type: 'SET_ADDRESS',
        payload: {
          ...data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDefaultAddress();
  }, [renderSelector.value, authSelector]);

  return (
    <>
      <Box bg="white" rounded={'xl'} mb={'2rem'} pb="2rem">
        <Heading textAlign={'start'} p="1rem" fontSize="24px">
          Delivery Detail
        </Heading>
        {addressData?.id ? (
          <Box p={8} fontSize={'md'}>
            <Stack direction={'row'}>
              <Text fontWeight={'bold'} pt={2} minW={'5rem'}>
                To
              </Text>
              <Text fontWeight={'bold'} pt={2} fontSize="1.1rem">
                {addressData.User.full_name}
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Text fontWeight={'bold'} pt={2} minW={'5rem'}>
                Address
              </Text>
              <Text pt={2}>
                {addressData.address}, {addressData.city},{' '}
                {addressData.province}, Indonesia, {addressData.postal_code}
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Text fontWeight={'bold'} pt={2} minW={'5rem'}>
                Phone
              </Text>
              <Text pt={2}>{addressData.User.phone}</Text>
            </Stack>
            <Stack direction={'row'} mt="1rem">
              <Text fontWeight={'bold'} pt={2} minW={'5rem'}></Text>

              <ChangeAddress />
            </Stack>

            <Box display="flex" gap={2}>
              <Spacer />
            </Box>
          </Box>
        ) : (
          <Box ml="1rem">
            <ChangeAddress />
          </Box>
        )}
      </Box>
    </>
  );
};
