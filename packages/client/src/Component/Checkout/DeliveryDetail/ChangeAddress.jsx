import React from 'react';
import {
  Button,
  Stack,
  Text,
  Box,
  Spacer,
  useToast,
  Flex,
  SimpleGrid,
  Modal,
  useDisclosure,
  Badge,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../Lib/api';
import AddressEdit from '../../../Component/Profile/Address/AddressEdit';
import AddresAdd from '../../../Component/Profile/Address/AddressAdd';
import { FaSearch } from 'react-icons/fa';

export const ChangeAddress = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [addressData, setAddressData] = useState([]);
  const [addressDefault, setAddressDefault] = useState();
  const dispatch = useDispatch();

  const renderSelector = useSelector((state) => state.renderReducer);
  const authSelector = useSelector((state) => state.authReducer);

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
  }, []);
  useEffect(() => {
    fetchAddress();
  }, [renderSelector.value]);
  return (
    <>
      <Button
        colorScheme={'teal'}
        variant="outline"
        size="sm"
        onClick={onToggle}
      >
        Change Address
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <>
          <ModalOverlay />
          <ModalContent minW={'60%'} bg="white" gap={8} px="2rem">
            <ModalHeader textAlign={'center'} mt="1rem">
              Choose Your Address
            </ModalHeader>
            <ModalCloseButton border="0px" />

            {/* INPUT  */}
            <InputGroup w="70%" mx="auto">
              <Input
                focusBorderColor="teal.400"
                placeholder="Write your address"
              />
              <InputRightElement
                w="7rem"
                px={2}
                color={'white'}
                cursor="pointer"
                bg="teal.500"
                transition={'200ms'}
                _hover={{ bg: 'teal.600' }}
                borderRightRadius="md"
              >
                <FaSearch />
                <Text ml="1rem" fontWeight={'bold'}>
                  {' '}
                  Search
                </Text>
              </InputRightElement>
            </InputGroup>
            <Box
              w="70%"
              border={'1px'}
              borderStyle="dashed"
              borderColor={'gray.400'}
              mx="auto"
              p="10px"
              align="center"
            >
              <Text>Use Current Location</Text>
            </Box>
            {/* ADD Address */}
            <Box mx={4}>
              <AddresAdd />
            </Box>
            <Text textAlign={'center'}>Please select yout address</Text>

            <SimpleGrid columns={{ base: 2, md: 1 }} gap={8} px={4}>
              {addressData?.map((val, idx) => {
                return (
                  <Box
                    p={4}
                    rounded="lg"
                    fontSize={'md'}
                    key={idx}
                    border={'1px'}
                    _hover={{
                      borderColor: 'teal.500',
                      borderWidth: '2px',
                      shadow: 'md',
                    }}
                    onClick={() => {
                      setAddressDefault(val.id);
                      console.log(addressDefault);
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
                      <AddressEdit id={val.id} />
                      <Spacer />
                      {val.id == authSelector.default_address ? (
                        <Badge
                          pt="4px"
                          rounded={'lg'}
                          mt={2}
                          cursor="pointer"
                          colorScheme={'teal'}
                          onClick={() => {
                            editDefaultAddress(val.id);
                            console.log(authSelector.default_address);
                          }}
                        >
                          Default
                        </Badge>
                      ) : (
                        <></>
                      )}
                      {val.id == addressDefault ? (
                        <Badge
                          pt="4px"
                          rounded={'lg'}
                          mt={2}
                          cursor="pointer"
                          colorScheme={'gray'}
                          onClick={() => {
                            editDefaultAddress(val.id);
                            console.log(authSelector.default_address);
                          }}
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
            <Flex m={8} gap={2}>
              <Spacer />
              {/* SELECT ADDRESS */}
              <Button
                colorScheme={'teal'}
                onClick={() => {
                  editDefaultAddress(addressDefault);
                  onToggle();
                }}
              >
                Select This Address
              </Button>
            </Flex>
          </ModalContent>
        </>
      </Modal>
    </>
  );
};
