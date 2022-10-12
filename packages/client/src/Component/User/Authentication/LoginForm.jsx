import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  InputGroup,
  Icon,
  InputRightAddon,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormHelperText,
} from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../assets/imgs/PHARMACY.png';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import ForgotPass from './ForgotPass';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import qs from 'qs';
import { axiosInstance } from '../../../lib/api';
import jsCookie from 'js-cookie';
import Router from 'next/router';

export default function LoginForm() {
  const [passwordView, setPasswordView] = useState(false);
  const router = useRouter();
  const userSelector = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      usernameEmail: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      usernameEmail: Yup.string()
        .required('Username  required')
        .max(100, 'UsernameEmail should be of max 12 characters length')
        .min(3, 'UsernameEmail should be of man 8 characters length'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(
          /\w*[a-z]\w*/,
          'Must contain min 8 Characters, UPPERCASE, lowercase, number and special character',
        ) // lower
        .matches(
          /\w*[A-Z]\w*/,
          'Must contain min 8 Characters, UPPERCASE, lowercase, number and special character',
        ) // upper
        .matches(
          /\d/,
          'Must contain min 8 Characters, UPPERCASE, lowercase, number and special character',
        ) //must have number
        .matches(
          /[!@#$%^&*()\-_"=+{}; :,<.>]/,
          'Must contain min 8 Characters, UPPERCASE, lowercase, number and special character',
        ),
    }),
    validateOnChange: false,

    onSubmit: async () => {
      const { usernameEmail, password } = formik.values;
      try {
        let body = {
          username: usernameEmail,
          email: usernameEmail,
          password: password,
        };
        const res = await axiosInstance.post(
          '/users/login',
          qs.stringify(body),
        );

        // const userData = res.data.result;
        const userData = res.data.result.user;
        const token = res.data.result.token;

        console.log('userData');
        console.log(userData);
        if (!userData) {
          throw new Error('User not found');
        }
        jsCookie.set('auth_token', token);
        dispatch({
          type: 'AUTH_LOGIN',
          payload: userData,
        });
        toast({
          title: 'Success Login',
          status: 'success',
          isClosable: true,
        });

        Router.push('/');
      } catch (err) {
        console.log(err);
        toast({
          title: 'Username, Email or Password wrong',
          status: 'error',
          isClosable: true,
        });
      }
    },
  });
  useEffect(() => {
    if (userSelector?.id) {
      router.push('/');
    }
  }, [userSelector?.id]);

  return (
    <>
      {/* ---------- Sign In Form ---------- */}
      <Stack
        display="flex"
        maxW={'350px'}
        justifyContent={'center'}
        bg="transparent"
        boxShadow="md"
        borderWidth="1px"
        borderRadius="3"
        rounded={'15'}
      >
        {/* ---------- Head Sign In Tittle ---------- */}
        <Stack display="flex" align={'center'} m={'10px'}>
          <Heading fontSize={'1xl'} color={'#4A5568'}>
            Please sign in{' '}
          </Heading>
        </Stack>
        <Stack align={'center'}>
          <Box m={'20px'} width={'250px'}>
            {/* ---------- username or Email Input ---------- */}
            <FormControl
              id="usernameEmail"
              isInvalid={formik.errors.usernameEmail}
              mt={'7'}
            >
              <Input
                required
                className="inputEmail"
                type="text"
                maxLength={'40'}
                onChange={(event) =>
                  formik.setFieldValue('usernameEmail', event.target.value)
                }
              />
              <FormLabel className="labelEmail">
                &nbsp; Username/Email &nbsp;
              </FormLabel>
              <FormHelperText color="red">
                {formik.errors.usernameEmail}
              </FormHelperText>
            </FormControl>
            {/* ---------- Password Input ---------- */}
            <FormControl
              id="password"
              marginTop={'30px'}
              mb={'3px'}
              isInvalid={formik.errors.password}
            >
              <InputGroup>
                <Input
                  required
                  className="inputPass"
                  maxLength={'30'}
                  type={passwordView ? 'text' : 'password'}
                  onChange={(event) =>
                    formik.setFieldValue('password', event.target.value)
                  }
                />
                <FormLabel className="labelPass">
                  &nbsp; Password &nbsp;
                </FormLabel>
                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordView(!passwordView)}
                    as={passwordView ? IoMdEye : IoMdEyeOff}
                    sx={{ _hover: { cursor: 'pointer' } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText color="red">
                {formik.errors.password}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box align={'center'}>
            <Button
              w={'250px'}
              colorScheme="twitter"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Log In
            </Button>
          </Box>
        </Stack>

        {/* ---------- Garis Pembatas ---------- */}
        <div className="divine">
          <div></div>
          <div>OR</div>
          <div></div>
        </div>

        {/* ---------- Forgot Pass Button ---------- */}
        <Box align={'center'}>
          <Text mt={'8px'} mb={'20px'}>
            <ForgotPass />
          </Text>
        </Box>
      </Stack>
    </>
  );
}
