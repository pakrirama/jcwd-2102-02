import React, { useEffect } from 'react';
import { InvoiceContainer } from '../../Component/User/Invoice/invoiceContainer';
import { Layout } from '../../Layout';
import { useRouter } from 'next/router';

const invoice = () => {
  const router = useRouter();
  const { no_invoice } = router.query;
  return (
    <Layout>
      <InvoiceContainer invoice={no_invoice} />
    </Layout>
  );
};

export default invoice;
