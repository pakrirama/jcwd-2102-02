import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { InvoiceContainer } from '../src/Invoice/invoiceContainer';
import { Layout } from '../src/layout';

const invoice = () => {
  return (
    <Layout>
      <InvoiceContainer />
    </Layout>
  );
};

export default invoice;
