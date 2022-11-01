import axios from 'axios';
import jsCookie from 'js-cookie';
import store from '../redux/storess';
import auth_types from '../redux/reducers/auth/type';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
  // baseURL: 'https://jcwd210202api.purwadhikabootcamp.com/api/v1/',
});

axiosInstance.interceptors.request.use((config) => {
  async function setting() {
    config.headers.authorization = jsCookie.get('auth_token');
  }
  setting();

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status == 419) {
      jsCookie.remove('auth_token');
      store.dispatch({
        type: auth_types.AUTH_LOGOUT,
      });
    }
    return err;
  },
);
