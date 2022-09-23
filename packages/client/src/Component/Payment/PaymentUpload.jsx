import { useState, useRef } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  useToast,
  FormControl,
  Input,
  Image,
  Flex,
  Icon,
  VisuallyHidden,
  Stack,
  chakra,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';

export const PaymentUpload = ({ id }) => {
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [selectedFiles, setSelctedFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const renderSelector = useSelector((state) => state.renderReducer);

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    onSubmit: async () => {
      const formData = new FormData();
      formData.append('payment_receipt', selectedFiles);

      try {
        const res = await axiosInstance.patch(
          `/order/payment/upload/${id}`,
          formData,
        );
        dispatch({
          type: 'FETCH_DATA',
          payload: {
            value: !renderSelector.value,
          },
        });

        if (res.data.message == 'No Image Selected') {
          toast({
            title: res.data.message,
            status: 'error',
            isClosable: true,
          });
          return;
        }
        toast({
          title: res.data.message,
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        console.log('dor');
        toast({
          title: 'Image cannot more than 1MB',
          status: 'error',
          isClosable: true,
        });
        return;
      }
      onToggle();
    },
  });

  const handleFile = (event) => {
    setSelctedFiles(event.target.files[0]);
    const uploaded = event.target.files[0];
    setPreviewImage(URL.createObjectURL(uploaded));
  };
  return (
    <>
      <Button colorScheme={'teal'} onClick={onToggle}>
        Upload Payment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Payment Recipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl></FormControl>

            <FormControl>
              <Flex
                mt={1}
                justify="center"
                px={6}
                pt={5}
                pb={6}
                borderWidth={2}
                _dark={{
                  color: 'gray.500',
                }}
                borderStyle="dashed"
                rounded="md"
                minH="500px"
              >
                {!previewImage ? (
                  <Stack spacing={1} textAlign="center" my="auto">
                    <Icon
                      mx="auto"
                      boxSize={12}
                      color="gray.400"
                      _dark={{
                        color: 'gray.500',
                      }}
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                    <Flex
                      fontSize="sm"
                      color="gray.600"
                      _dark={{
                        color: 'gray.400',
                      }}
                      alignItems="baseline"
                    >
                      <chakra.label
                        htmlFor="file-upload"
                        cursor="pointer"
                        rounded="md"
                        fontSize="md"
                        color="brand.600"
                        _dark={{
                          color: 'brand.200',
                        }}
                        pos="relative"
                        _hover={{
                          color: 'brand.400',
                          _dark: {
                            color: 'brand.300',
                          },
                        }}
                      >
                        <span>Upload a file</span>
                        <VisuallyHidden>
                          <Input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept={
                              ('image / png', 'image / jpg', 'image / jpeg')
                            }
                            onChange={handleFile}
                            ref={inputFileRef}
                          />
                        </VisuallyHidden>
                      </chakra.label>
                      <Text pl={1}>or drag and drop</Text>
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      PNG, JPG up to 10MB
                    </Text>
                    <Button
                      colorScheme={'blue'}
                      onClick={() => inputFileRef.current.click()}
                    >
                      Upload Image
                    </Button>
                  </Stack>
                ) : (
                  <Image src={previewImage} bg="blackAlpha.200" />
                )}
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button
              colorScheme={'teal'}
              variant="outline"
              onClick={() => {
                onToggle();
                setPreviewImage(null);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                formik.handleSubmit();
                // setPreviewImage(null); /
              }}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
