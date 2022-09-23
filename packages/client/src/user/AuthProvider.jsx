import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import auth_style from '../redux/reducer/auth/type';
import { axiosInstance } from '../lib/api';

function Authprovider({ children }) {
  const [isAuthChecked, setisAuthChecked] = useState(false);
  const cartSelector = useSelector((state) => state.cartReducer);
  const authSelector = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const fecthdata = async () => {
      const userToken = jsCookie.get('auth_token');

      if (userToken) {
        const userResponse = await axiosInstance.get('/users/refresh-token');
        if (userResponse) {
          dispatch({
            type: auth_style.AUTH_LOGIN,
            payload: userResponse.data.result.user,
          });
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
        } else {
          dispatch({
            type: auth_style.AUTH_LOGOUT,
          });
        }
      }

      setisAuthChecked(true);
    };
    fecthdata();
  }, []);

  if (!isAuthChecked) return <div>loading</div>;
  return children;
}

export default Authprovider;
