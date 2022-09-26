import {
 Box, Flex, Stack, Heading, FormControl, Input, InputGroup, InputRightAddon, Icon, FormLabel, FormHelperText, Avatar, HStack, Button, Menu, MenuButton, MenuList, MenuItem,
 MenuDivider, Text, useDisclosure, Link, Modal, ModalOverlay, Divider, InputRightElement, Progress, Textarea
} from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Image from 'next/image';
import LinkNext from 'next/link';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function MaddAddress() {
 const formik = useFormik({
  initialValues: {
   email: "",
   username: "",
   full_name: "",
   password: "",
   repassword: "",
  },
  validationSchema: Yup.object().shape({
   email: Yup.string()
    .required("Email is required")
    .matches(/@/, "Please inclue an '@' in the email address"),
   username: Yup.string().required("Username is required"),
   full_name: Yup.string().required("Fullname is required"),
   password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/\w*[a-z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // lower
    .matches(/\w*[A-Z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // upper
    .matches(/\d/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") //must have number
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"), //special char
   repassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  }),
  validateOnChange: false,
  onSubmit: (values) => {
   dispatch(userRegister(values, formik.setSubmitting))
  },

  // ------------------------------- code setelah register tidak login
  // onSubmit: async () => {
  //   // const formData = new FormData();
  //   const { email, username, full_name, password } = formik.values;

  //   // formData.append("email", email);
  //   // formData.append("username", username);
  //   // formData.append("fullname", fullname);
  //   // formData.append("password", password) ;

  //   try {
  //     await axiosInstance.post("/user", formik.values).then(() => {
  //       toast({
  //         title: "Register Success check your email",
  //         status: "success",
  //         isClosable: true,
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     toast({
  //       title: "Failed to Register / Email or Username has been taken",
  //       status: "error",
  //       isClosable: true,
  //     });
  //   }

  //   // router.reload(window.location.pathname)
  // },
 });


 return (
  <>
   <FormControl
    isInvalid={formik.errors.address}
   >
    <FormLabel>Alamat Lengkap</FormLabel>
    <Textarea
     required
     type="text"
     maxLength={"300"}
     onChange={(event) =>
      formik.setFieldValue("address", event.target.value)
     }
    />
    <FormHelperText color="red">
     {formik.errors.address}
    </FormHelperText>
   </FormControl>

   <FormControl
    isInvalid={formik.errors.province}
    marginTop={"10px"}
   >
    <FormLabel>Provinsi</FormLabel>
    <Input
     required
     type="text"
     maxLength={"200"}
     onChange={(event) =>
      formik.setFieldValue("province", event.target.value)
     }
    />
    <FormHelperText color="red">
     {formik.errors.province}
    </FormHelperText>
   </FormControl>

   <FormControl
    isInvalid={formik.errors.city}
    marginTop={"10px"}
   >
    <FormLabel>Kota / Kabupaten</FormLabel>
    <Input
     required
     type="text"
     maxLength={"300"}
     onChange={(event) =>
      formik.setFieldValue("city", event.target.value)
     }
    />
    <FormHelperText color="red">
     {formik.errors.city}
    </FormHelperText>
   </FormControl>

   <FormControl
    isInvalid={formik.errors.post_code}
    marginTop={"10px"}
   >
    <FormLabel>Kode Post</FormLabel>
    <Input
     required
     type="text"
     maxLength={"300"}
     onChange={(event) =>
      formik.setFieldValue("post_code", event.target.value)
     }
    />
    <FormHelperText color="red">
     {formik.errors.post_code}
    </FormHelperText>
   </FormControl>

   <Button onClick={formik.handleSubmit} colorScheme='twitter' mt={'10px'}>Simpan Perubahan</Button>

  </>
 )
}