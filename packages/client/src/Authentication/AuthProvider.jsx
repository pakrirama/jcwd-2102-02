import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../Lib/api';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.authReducer);
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
    };
    fetchUserData();
    if (!authSelector.id) {
      alert('user not login');
    }
  }, [renderSelector.value]);

  return children;
};
