import { Box } from '@chakra-ui/react';
import React from 'react';
import { NabvarAdmin } from './Navbar/NavbarAdmin';

export const LayoutAdmin = (props) => {
  const { children } = props;
  return (
    <>
      <NabvarAdmin />

      <Box>{children}</Box>
    </>
  );
};
