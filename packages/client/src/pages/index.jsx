import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryBar } from '../Layout/CategoryBar';

import { Layout } from '../Layout';
import { Banner } from '../Layout/Banner';
import { ProductListContainer } from '../Component/User/Product/ListContainer';

const IndexPage = () => {
  const filter = useSelector((state) => state.filterReducer);

  return (
    <Layout>
      <CategoryBar />
      {filter.banner == false ? <></> : <Banner />}
      <ProductListContainer />
    </Layout>
  );
};

export default IndexPage;
