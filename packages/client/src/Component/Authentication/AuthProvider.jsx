import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.authReducer);
  const cartSelector = useSelector((state) => state.cartReducer);
  const renderSelector = useSelector((state) => state.renderReducer);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axiosInstance.get('/users/3');
      const data = res.data.result[0];
      console.log('Auth Provider');
      console.log(data);

      dispatch({
        type: 'AUTH_LOGIN',
        payload: {
          ...authSelector,
          ...data,
        },
      });

      dispatch({
        type: 'SET_CART',
        payload: {
          ...cartSelector,
          total_cart: data.Cart.total_item,
          id_cart: data.Cart.id,
        },
      });
    };
    fetchUserData();
    if (!authSelector.id) {
      console.log('user mot found');
    }
  }, [renderSelector.value]);

  return children;
};
