import { useState, useRef } from 'react';
import { axiosInstance } from '../../Lib/api';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Lorem,
  Button,
  useDisclosure,
  useToast,
  Box,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Center,
  Image,
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import jsCookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

const UploadAvatar = (props) => {
  const renderSelector = useSelector((state) => state.renderReducer);
  const authSelector = useSelector((state) => state.authReducer);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [selectedFiles, setSelctedFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const inputFileRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    onSubmit: async () => {
      const formData = new FormData();
      formData.append('image', selectedFiles);

      try {
        const res = await axiosInstance.patch('/users/upload/3', formData);
        dispatch({
          type: 'FETCH_DATA',
          payload: {
            value: !renderSelector.value,
          },
        });
        if (res.data.message == 'size invalid') {
          console.log('kena');
          toast({
            title: `Image size cannot more than 1MB `,
            status: 'error',
            isClosable: true,
          });
          props.onToggle();
          return;
        }
        toast({
          title: 'image uploaded',
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        console.log('dor');
        toast({
          title: `Error `,
          status: 'error',
          isClosable: true,
        });
      }
      props.onToggle();
    },
  });

  const handleFiles = (event) => {
    setSelctedFiles(event.target.files[0]);
    const uploaded = event.target.files[0];
    setPreviewImage(URL.createObjectURL(uploaded));
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Input image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box align="center">
              {!previewImage ? (
                <Image
                  src={
                    authSelector.image_url
                      ? authSelector.image_url
                      : `/assets/image/uploadavatar.png`
                  }
                  w="200px"
                  h="200px"
                  rounded="full"
                  bg="blackAlpha.200"
                />
              ) : (
                <Image
                  src={previewImage}
                  w="200px"
                  h="200px"
                  rounded="full"
                  bg="blackAlpha.200"
                />
              )}
              <Input
                type={'file'}
                display={'none'}
                onChange={handleFiles}
                accept={('image/png', 'image/jpg', 'image/jpeg', 'image / gif')}
                ref={inputFileRef}
                colorScheme={'blue'}
              ></Input>
              <Button
                m="4rem"
                colorScheme={'teal'}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              >
                Choose imagess
              </Button>
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button
            colorScheme={'teal'}
            variant="outline"
            onClick={() => {
              props.onToggle();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default UploadAvatar;
