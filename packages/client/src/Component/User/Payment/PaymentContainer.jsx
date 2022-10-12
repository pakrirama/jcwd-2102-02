import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../lib/api';
import { UploadPayment } from './UploadPayment';

export const PaymentContainer = () => {
  return (
    <Box
      maxW="1440px"
      mx="auto"
      my="2rem"
      p="2rem"
      border="1px"
      rounded="lg"
      borderColor="gray.300"
    >
      <UploadPayment />
    </Box>
  );
};
