import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../Lib/api';
import { TransactionHeader } from './TransactionHeader';
import { TransactionList } from './TransactionList';

export const TransactionContainer = () => {
  const router = useRouter;
  const [dataTransaction, setTrasnsactionData] = useState();
  const authSelector = useSelector((state) => state.authReducer);

  const fetchTransaction = async () => {
    try {
      const res = await axiosInstance.get(`/order/${authSelector.id}`);
      const data = res.data.result;
      console.log(data);
      setTrasnsactionData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authSelector.id) {
      fetchTransaction();
    }
  }, [authSelector]);

  return (
    <Box mx="2rem">
      <TransactionHeader />
      {/* <Box
        maxW="1440px"
        mx="auto"
        my="2rem"
        p="2rem"
        border="1px"
        rounded="lg"
        borderColor="gray.300"
      > */}
      <TransactionList data={dataTransaction} />
    </Box>
    // </Box>
  );
};
