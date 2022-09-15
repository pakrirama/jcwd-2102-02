import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './footer';

export const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />

      <Box w="full">{children}</Box>

      <Footer />
    </>
  );
};
