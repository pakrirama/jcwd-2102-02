import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import { axiosInstance } from '../../../lib/api';
import { Center, Spinner, Flex } from '@chakra-ui/react';

function Authprovider({ children }) {
  const [isAuthChecked, setisAuthChecked] = useState(false);

  const authSelector = useSelector((state) => state.authReducer);
  const cartSelector = useSelector((state) => state.cartReducer);
  const renderSelector = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthdata = async () => {
      const userToken = jsCookie.get('auth_token');

      if (userToken) {
        try {
          const userResponse = await axiosInstance.get('/users/refresh-token');
          const userData = userResponse.data.result.user;
          dispatch({
            type: 'AUTH_LOGIN',
            payload: userData,
          });

          // Cart
          const res = await axiosInstance.get(`cart/user/${userData.id}`);
          const data = res.data.result;
          dispatch({
            type: 'SET_CART',
            payload: {
              ...cartSelector,
              total_cart: data.total_item,
              id_cart: data.id,
            },
          });
          console.log('cartSelector');
          console.log(cartSelector);
          console.log(authSelector);
        } catch (error) {
          console.log('catch');
          dispatch({
            type: 'AUTH_LOGOUT',
          });
        }
      } else {
        console.log('else');
        dispatch({
          type: 'AUTH_LOGOUT',
        });
      }

      setisAuthChecked(true);
    };
    fecthdata();
  }, [renderSelector]);

  if (!isAuthChecked)
    return (
      <Flex align="center">
        <Spinner />
      </Flex>
    );
  return children;
}

export default Authprovider;
