import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  InputGroup,
  Icon,
  Progress,
  InputRightAddon,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// import { UserRegister } from '../../../redux/action/userRegister';
import {UserRegister} from '../../../redux/action/userRegister';

export default function RegisterForm() {
  const [passwordView, setPasswordView] = useState(false);
  const [passwordViewRep, setPasswordViewRep] = useState(false);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      full_name: '',
      phone: '',
      password: '',
      repassword: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .matches(/@/, "Please inclue an '@' in the email address")
        .matches(/.com/, "Please include an '.com' in the email address"),
      username: Yup.string()
        .required('Username is required')
        .min(5, 'Min 5 characters required')
        .max(100, 'Max 100 characters required'),
      phone: Yup.number()
        .required('phone number is required')
        .min(7, 'Phone number should be of minimum 7 characters length'),
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
        ), //special char
      repassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(UserRegister(values, formik.setSubmitting));
    },
  });

  useEffect(() => {
    if (userSelector?.id) {
      router.push('/home');
    }
  }, [userSelector?.id]);

  return (
    <>
      {/* ---------- Register Form ---------- */}
      <Stack
        display="flex"
        maxW={'350px'}
        justifyContent={'center'}
        bg="transparent"
        borderWidth="1px"
        borderRadius="3"
        mt="30px"
        boxShadow="md"
        rounded={'15'}
      >
        {/* <Box align={"center"} m={"30px"} mb={"0px"}>
          <Image src={logo} alt={"Story"} height={"119px"} width={"180px"} />
        </Box> */}

        {/* ---------- Head Register form Tittle ---------- */}
        <Stack display="flex" align={'center'}>
          <Heading fontSize={'1xl'} color={'#4A5568'}>
            Sign up to have a account
          </Heading>
        </Stack>
        {/* <Text>{formik.values.email} {formik.values.username} {formik.values.fullname} {formik.values.password}</Text> */}
        <Stack align={'center'}>
          <Box m={'10px 20px'} width={'250px'}>
            {/* ---------- Email Input ---------- */}
            <FormControl id="email" isInvalid={formik.errors.email}>
              <Input
                required
                className="inputEmail"
                type="text"
                maxLength={'40'}
                onChange={(event) =>
                  formik.setFieldValue('email', event.target.value)
                }
              />
              <FormLabel className="labelEmail">&nbsp; Email &nbsp;</FormLabel>
              <FormHelperText color="red">{formik.errors.email}</FormHelperText>
            </FormControl>

            {/* ---------- Username Input ---------- */}
            <FormControl
              id="username"
              isInvalid={formik.errors.username}
              marginTop={'20px'}
            >
              <Input
                required
                className="inputUsername"
                type="text"
                maxLength={'40'}
                onChange={(event) =>
                  formik.setFieldValue('username', event.target.value)
                }
              />
              <FormLabel className="labelUsername">
                &nbsp; Username &nbsp;
              </FormLabel>
              <FormHelperText color="red">
                {formik.errors.username}
              </FormHelperText>
            </FormControl>

            {/* ---------- Fullname Input ----------*/}
            <FormControl
              id="full_name"
              isInvalid={formik.errors.full_name}
              marginTop={'20px'}
            >
              <Input
                required
                className="inputFullname"
                type="text"
                maxLength={'40'}
                onChange={(event) =>
                  formik.setFieldValue('full_name', event.target.value)
                }
              />
              <FormLabel className="labelFullname">
                &nbsp; Full name &nbsp;
              </FormLabel>
              <FormHelperText color="red">
                {formik.errors.full_name}
              </FormHelperText>
            </FormControl>

            <FormControl
              id="phone"
              isInvalid={formik.errors.phone}
              marginTop={'20px'}
            >
              <Input
                required
                className="inputPhone"
                type="text"
                maxLength={'40'}
                onChange={(event) =>
                  formik.setFieldValue('phone', event.target.value)
                }
              />
              <FormLabel className="labelphone">
                &nbsp; Phone number &nbsp;
              </FormLabel>
              <FormHelperText color="red">{formik.errors.phone}</FormHelperText>
            </FormControl>

            {/* ---------- Password Input ---------- */}
            <FormControl
              id="password"
              marginTop={'20px'}
              mb={'7px'}
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
              {formik.values.password.length > 7 &&
              formik.values.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              ) ? (
                <>
                  <Progress value={100} size="xs" colorScheme="green" />
                  <Text fontWeight="semibold" color="green">
                    Strong
                  </Text>
                </>
              ) : formik.values.password.length > 5 &&
                formik.values.password.match(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/,
                ) ? (
                <>
                  <Progress value={75} size="xs" colorScheme="yellow" />
                  <Text fontWeight="semibold" color="#dbe300">
                    Medium
                  </Text>
                </>
              ) : formik.values.password.length > 4 &&
                formik.values.password.match(
                  /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                ) ? (
                <>
                  <Progress value={50} size="xs" colorScheme="red" />
                  <Text fontWeight="semibold" color="orange">
                    Weak
                  </Text>
                </>
              ) : formik.values.password.length > 0 &&
                formik.values.password.match(/^(?=.*[a-z])/) ? (
                <>
                  <Progress value={25} size="xs" colorScheme="red" />
                  <Text fontWeight="semibold" color="red">
                    Very weak
                  </Text>
                </>
              ) : (
                <></>
              )}
              <FormHelperText color="red">
                {formik.errors.password}
              </FormHelperText>
            </FormControl>

            {/* ---------- Sec Password Input ---------- */}
            <FormControl
              id="repassword"
              marginTop={'20px'}
              isInvalid={formik.errors.repassword}
            >
              <InputGroup>
                <Input
                  required
                  className="inputRePass"
                  maxLength={'30'}
                  type={passwordViewRep ? 'text' : 'password'}
                  onChange={(event) =>
                    formik.setFieldValue('repassword', event.target.value)
                  }
                />
                <FormLabel className="labelRePass">
                  &nbsp; Repeat Password &nbsp;
                </FormLabel>
                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordViewRep(!passwordViewRep)}
                    as={passwordViewRep ? IoMdEye : IoMdEyeOff}
                    sx={{ _hover: { cursor: 'pointer' } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText color="red">
                {formik.errors.repassword}
              </FormHelperText>
            </FormControl>
          </Box>

          {/* ---------- Sign Up Button ---------- */}
          <Box align={'center'}>
            <Button
              onClick={() => {
                async function submit() {
                  await formik.handleSubmit();

                  // toast({
                  //   title: "Account Success Created",
                  //   description: "Check your email for verifiy",
                  //   status: "success",
                  //   isClosable: true,
                  // })
                }
                submit();
              }}
              w={'250px'}
              colorScheme="twitter"
              mb={'20px'}
              disabled={
                formik.values.email.length > 9 &&
                formik.values.username.length > 2 &&
                formik.values.full_name.length > 2
                  ? false
                  : true
              }
            >
              Sign up
            </Button>
            {/* bgColor='#33bbff' */}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
