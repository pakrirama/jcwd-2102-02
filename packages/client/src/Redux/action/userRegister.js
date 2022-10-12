// import jsCookie from 'js-cookie';
import { axiosInstance } from '../../lib/api';
// import auth_types from '../reducers/auth/type';
import qs from 'qs';
import Router from 'next/router';

export function UserRegister(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
        email: values.email,
        username: values.username,
        full_name: values.full_name,
        password: values.password,
        phone: values.phone,
      };

      const res = await axiosInstance.post(
        '/users/register',
        qs.stringify(body),
      );

      // const userData = res.data.result.user;
      // const token = res.data.result.token;

      // jsCookie.set('auth_token', token);
      // dispatch({
      //   type: auth_types.AUTH_LOGIN,
      //   payload: userData,
      // });
      Router.push('/auth');

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}
