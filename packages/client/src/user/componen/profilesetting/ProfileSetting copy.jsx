import {
  Box, Text, Avatar, Link, AvatarBadge, Stack, InputGroup, InputRightElement
  , Flex, Input, Textarea, Select, Modal, ModalCloseButton, Icon,
  ModalOverlay, ModalHeader, ModalBody, useDisclosure,
  FormControl, Button, useToast, FormLabel, FormHelperText, ModalContent
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
// import { userEdit } from '../../redux/action/userEdit';
// import { axiosInstance } from '../../lib/api';
import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import MchangePassword from './mchangepassword/MchangePassword';
// import ChangePassButton from './ChangePassButton';

export default function ProfileSettingCopy() {
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure()
  const { isOpen: isOpenAlamat, onOpen: onOpenAlamat, onClose: onCloseAlamat } = useDisclosure()
  const { isOpen: isOpenChangePass, onOpen: onOpenChangePass, onClose: onCloseChangePass } = useDisclosure()
  const [selectedFile, setSelectedFile] = useState(null)
  const toast = useToast();
  // const dispatch = useDispatch()
  // const autoRender = useSelector((state) => state.automateRendering)
  const inputFileRef = useRef(null);
  const router = useRouter();
  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  // const userSelector = useSelector((state) => (state.auth))
  // const image = userSelector.image_url;

  const formik = useFormik({
    initialValues: {
      // full_name: `${userSelector.full_name}`,
      // username: `${userSelector.username}`,
      // phone_no: `${userSelector.phone_no}`,
      // website: `${userSelector.web}`,
      // gender: `${userSelector.gender}`,
      // bio: `${userSelector.bio}`,
      // id: userSelector.id,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      full_name: Yup.string().required("full name is required"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      // dispatch(userEdit(values, formik.setSubmitting))
      const { full_name, username, phone_no, website, gender, bio } = formik.values
      try {
        let body = {
          full_name: full_name,
          username: username,
          phone_no: phone_no,
          web: website,
          gender: gender,
          bio: bio,
        };
        // const res = await axiosInstance.patch(`/user/${userSelector.id}`, qs.stringify(body));
        // dispatch({
        //  type: "AUTH_LOGIN",
        //  payload: res.data.user
        // })
        toast({
          title: "Profile update success",
          status: "success",
          isClosable: true,
        })
        // dispatch({
        //   type: "FETCH_RENDER",
        //   payload: { value: !autoRender.value }
        // })
      } catch (err) {
        console.log(err);
        toast({
          title: "Username has been taken",
          status: "error",
          isClosable: true,
        })
      }
    }
  })

  return (
    <>
      <Box maxH='400px' w={'350px'} m='10px' mt='0px' mb='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        <Box display='flex' justifyContent='center' m='5px' mt='20px'>
          <Avatar size='xl' src='https://eu.ui-avatars.com/api/?name=Wira+Lin&size=250' >
            <Link onClick={onOpenProfile}>
              <AvatarBadge boxSize='1.25em'
                backgroundPosition="center"
                backgroundSize='cover'
                backgroundRepeat="no-repeat"
                backgroundImage="url(/iconcp.jpg)" />
            </Link>
          </Avatar>
          <Modal isOpen={isOpenProfile} onClose={onCloseProfile} size='md'>
            <ModalOverlay />
            <ModalProfPicture onClose={onCloseProfile} />
          </Modal>
        </Box>
        <Box display='flex' justifyContent="center" mt='20px'>
          <Text color='#00ACEE' fontWeight='bold' fontSize='lg'>Full Name</Text>
        </Box>
        <Box display='flex' justifyContent="center" mb='10px'>
          <Text fontSize='sm' fontWeight='semibold' mt={0} color='#4c4c4d'>Username</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' borderTopWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Sukses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>20</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Proses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>2</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Pengiriman</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>1</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Batal</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>5</Text>
        </Box>
        {/* <Divider my='10px' /> */}
      </Box>
      {/* <Box maxW={'500px'} m='10px' p='10px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="6">
    Setting Profile asdfsdf
   </Box> */}

      <Flex wrap={'wrap'} alignContent='center' justifyContent='space-evenly' boxShadow='md' maxW='700px' bg='#ffffff' borderWidth='1px' borderRadius="10px" >
        <Box w='280px' mt='15px'>
          <Text fontWeight='bold' color='#213360' fontSize='xl' my='7px'>
            Pengaturan Profil
          </Text>
        </Box >
        <Box h='0px' w='280px'></Box>

        {/* -------------------- Full Name -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' color='#4c4c4d' my='7px'>
            Nama Lengkap
          </Text>
          {/* {formik.values.full_name} */}
          <FormControl isInvalid={formik.errors.full_name}>
            <Input type='text'
              // defaultValue={userSelector.full_name}
              onChange={(event) => formik.setFieldValue("full_name", event.target.value)}></Input>
            <FormHelperText color='red'>{formik.errors.full_name}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Username -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Username
          </Text>
          <FormControl isInvalid={formik.errors.username}>
            <Input type='text'
              // defaultValue={userSelector.username}
              onChange={(event) => formik.setFieldValue("username", event.target.value)}></Input>
            <FormHelperText color='red'>{formik.errors.username}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Tanggal Lahir -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Tanggal Lahir
          </Text>
          <FormControl isInvalid={formik.errors.website}>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
            {/* <Input type='text' placeholder='website'
              // defaultValue={userSelector.web}
              onChange={(event) => formik.setFieldValue("website", event.target.value)}></Input> */}
          </FormControl>
        </Box>

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            E-mail
          </Text>
          <FormControl>
            <Input type='text' disabled
            // defaultValue={userSelector.email}
            ></Input>
          </FormControl>
        </Box>

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Jenis Kelamin
          </Text>
          <FormControl isInvalid={formik.errors.gender}>
            <Select onChange={(event) => formik.setFieldValue("gender", event.target.value)}
            // defaultValue={userSelector.gender}
            >
              <option value='Lainnya'>Lainnya</option>
              <option value='Laki-laki'>Laki-laki</option>
              <option value='Perempuan'>Perempuan</option>
            </Select>
          </FormControl>
        </Box>

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Nomor Handphone
          </Text>
          <FormControl isInvalid={formik.errors.phone_no}>
            <Input type='number' maxLength='12' placeholder='Nomor Handphone'
              // defaultValue={userSelector.phone_no}
              onChange={(event) => formik.setFieldValue("phone_no", event.target.value)}></Input>
            <FormHelperText color='red'>{formik.errors.phone_no}</FormHelperText>
          </FormControl>
        </Box>

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Alamat Utama
          </Text>
          <FormControl isInvalid={formik.errors.phone_no}>
            <FormControl isInvalid={formik.errors.bio}>
              <Textarea type='text' placeholder='Alamat belum ada' disabled
                onChange={(event) => formik.setFieldValue("bio", event.target.value)}></Textarea>
            </FormControl>
            <FormHelperText color='red'>{formik.errors.phone_no}</FormHelperText>
          </FormControl>
        </Box>

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Ganti alamat utama
          </Text>
          <FormControl isInvalid={formik.errors.gender}>
            <Select onChange={(event) => formik.setFieldValue("gender", event.target.value)}
            // defaultValue={userSelector.gender}
            >
              <option value='Lainnya'>alamat 1</option>
              <option value='Laki-laki'>alamat 2</option>
              <option value='Perempuan'>alamat 3</option>
            </Select>
          </FormControl>
          <Text fontWeight='semibold' fontSize='sm' my='3px'>
            <Link onClick={onOpenAlamat}>
              Tambah alamat pengiriman
            </Link>
          </Text>
          <Modal isOpen={isOpenAlamat} onClose={onCloseAlamat} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Alamat pengiriman</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} align='center'>
                sdfsdf
              </ModalBody>
            </ModalContent>
          </Modal>

        </Box>


        <Box w='280px' mt='10px'>
          <Link onClick={onOpenChangePass}>
            <Text fontWeight='bold' my='7px' color='#4c4c4d'>
              Ganti Kata sandi
            </Text>
          </Link>
          <Modal isOpen={isOpenChangePass} onClose={onCloseChangePass} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader >Ganti Kata sandi</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} >
                <MchangePassword />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>


        <Box w='280px' mt='10px' mb='15px'>
        </Box>
        <Box w='280px' mt='10px' mb='15px'>
          <FormControl>
            <Button colorScheme='twitter' onClick={() => {
              async function submit() {
                await formik.handleSubmit();
                // toast({
                //   title: "Profile update success",
                //   status: "success",
                //   isClosable: true,
                // })
              }
              submit()
            }}
            // disabled={
            //   formik.values.full_name != userSelector.full_name ? false : true}
            // formik.values.username == userSelector.username ||
            // formik.values.phone_no == userSelector.phone_no
            // formik.values.username.match(userSelector.username) ||
            // formik.values.phone_no.match(userSelector.phone_no) ||
            // formik.values.website.match(userSelector.website) ||
            // formik.values.gender.match(userSelector.gender) ||
            // formik.values.bio.match(userSelector.bio) ? true : false}
            > Simpan</Button>
          </FormControl>
        </Box>
        <Box w='280px' mt='10px'>
        </Box>
      </Flex>
    </>
  )
}