import { useState, useRef, useEffect } from 'react';

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
  Box,
  SimpleGrid,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import PrescriptionLogo from '../../public/Assets/Icon/UploadRecipt.png';
import AddressEdit from '../Profile/Address/AddressEdit';
import { CourierList } from '../Checkout/OrderList/CourierList';

export const UploadPrescription = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const [note, setNote] = useState('');
  const [selectedFiles, setSelctedFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [addressDefault, setAddressDefault] = useState();

  const renderSelector = useSelector((state) => state.renderReducer);
  const authSelector = useSelector((state) => state.authReducer);
  const addressSelector = useSelector((state) => state.addressReducer);

  const formik = useFormik({
    initialValues: {
      image: '',
      note: '',
      id_user: authSelector.id,
    },
    onSubmit: async () => {
      const formData = new FormData();

      formData.append('prescription', selectedFiles);
      formData.append('note', formik.values.note);
      formData.append('id_user', authSelector.id);
      formData.append('id_address', authSelector.default_address);
      console.log(formData);
      console.log(selectedFiles);

      try {
        const res = await axiosInstance.post(`/order/prescription`, formData);
        console.log('res');
        console.log(res);
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
          // title: 's',
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

  const editDefaultAddress = async (params) => {
    try {
      const res = await axiosInstance.patch(
        `users/${authSelector.id}/address/${params}`,
      );
      const message = res.data.message;
      toast({
        title: message,
        status: 'success',
        isClosable: true,
      });
      dispatch({
        type: 'AUTH_LOGIN',
        payload: {
          ...authSelector,
          default_address: params,
        },
      });
      dispatch({
        type: 'FETCH_DATA',
        payload: {
          value: !renderSelector.value,
        },
      });
      console.log('authSelector');
      console.log(authSelector);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await axiosInstance.get(`/address/user/${authSelector.id}`);
      const data = res.data.result;
      setAddressData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [authSelector]);
  useEffect(() => {
    fetchAddress();
  }, [renderSelector.value]);
  return (
    <>
      <Button
        bg="white"
        style={
          router.pathname == '/upload-prescription'
            ? {
                textDecoration: 'none',
                borderBottomWidth: '4px',
                borderBottomColor: 'teal',
              }
            : { textDecoration: 'none' }
        }
        _hover={{
          borderBottomWidth: '4px',
          borderBottomColor: 'teal',
        }}
        borderRadius={0}
        h="75px"
        leftIcon={<NextImage src={PrescriptionLogo} />}
        onClick={onToggle}
      >
        Upload Prescription
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={'60%'} bg="white">
          <ModalHeader>Upload Doctor Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl></FormControl>

            <FormControl>
              <Flex
                mt={1}
                justify="center"
                px={6}
                borderWidth={2}
                _dark={{
                  color: 'gray.500',
                }}
                borderStyle="dashed"
                rounded="md"
                borderColor={'teal.500'}
                minH="350px"
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
                  <Image src={previewImage} bg="blackAlpha.200" maxH="600px" />
                )}
              </Flex>
              <Box my="1rem">
                <Text fontSize={'sm'} fontWeight={'bold'}>
                  Note {formik.values.note}
                </Text>
                <Input
                  type="text"
                  focusBorderColor="teal.500"
                  onChange={(e) => {
                    formik.setFieldValue('note', e.target.value);
                  }}
                />
              </Box>
            </FormControl>

            <Text fontSize={'sm'} fontWeight={'bold'}>
              Select Address
            </Text>
            <SimpleGrid
              columns={{ base: 2, md: 1 }}
              h={'150px'}
              overflow="auto"
              border="2px"
              borderColor={'teal.500'}
              rounded="lg"
            >
              {authSelector.id &&
                addressData?.map((val, idx) => {
                  return (
                    <Box
                      p={4}
                      rounded="lg"
                      fontSize={'md'}
                      key={idx}
                      border="1px"
                      borderColor={'gray.200'}
                      onClick={() => {
                        editDefaultAddress(val.id);
                        console.log(addressDefault);
                        dispatch({
                          type: 'SET_ADDRESS',
                          ...addressSelector,
                          payload: {
                            ...val,
                          },
                        });
                      }}
                    >
                      <Text fontWeight={'bold'} pt={2}>
                        {val.User.full_name}
                      </Text>
                      <Text>{val.User.phone}</Text>
                      <Stack>
                        <Text>
                          {val.address}, {val.city}, {val.province}.{' '}
                          {val.postal_code}
                        </Text>
                      </Stack>
                      <Box display="flex" gap={2}>
                        <Spacer />
                        {val.id == authSelector.default_address ? (
                          <Badge
                            pt="4px"
                            rounded={'lg'}
                            mt={2}
                            cursor="pointer"
                            colorScheme={'teal'}
                          >
                            Selected
                          </Badge>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                  );
                })}
            </SimpleGrid>
            <Box pt="1rem">
              <CourierList />
            </Box>
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
