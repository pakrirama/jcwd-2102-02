import React from 'react';
import { LayoutAdmin } from '../../Component/Admin/Layout';
import { OrderCointainer } from '../../Component/Admin/Order/OrderCointainer';

const order = () => {
  return (
    <LayoutAdmin>
      <OrderCointainer />
    </LayoutAdmin>
  );
};

export default order;
