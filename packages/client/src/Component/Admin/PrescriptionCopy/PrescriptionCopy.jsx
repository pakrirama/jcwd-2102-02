import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalFooter,
  Flex,
  Box,
  Image,
  Input,
  Text,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { MedicineForm } from './MedicineForm';
import { useDispatch, useSelector } from 'react-redux';
import { CompoundForm } from './CompundForm';
import { axiosInstance } from '../../../lib/api';

export const PrescriptionCopy = ({ data }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [state, setState] = useState('Add Medicine');
  const formSelector = useSelector((state) => state.prescriptionFormReducer);
  const render = useSelector((state) => state.renderReducer);

  const { medicine, compound } = formSelector;
  const createPrescriptionCopy = async () => {
    try {
      const res = await axiosInstance.patch(
        `order/prescription/copy/${data.id}`,
        { medicine, compound },
      );

      toast({
        title: 'Order made!',
        status: 'success',
        isClosable: true,
      });
      dispatch({
        type: 'FETCH_DATA',
      });
      dispatch({
        type: 'UNSET_PRESCRIPTION_FORM',
      });
      setState('Add Medicine');
      onToggle();
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const AddType = (param1, param2) => [
    <Button
      borderRadius={0}
      fontSize="14px"
      minW="100px"
      background={'none'}
      color={'gray.500'}
      style={
        state == param2
          ? {
              textDecoration: 'none',
              borderBottomWidth: '2px',
              borderBottomColor: '#805AD5',
              color: '#805AD5',
            }
          : {
              textDecoration: 'none',
            }
      }
      _hover={{
        borderBottomWidth: '2px',
        borderBottomColor: '#805AD5',
      }}
      onClick={() => {
        setState(param2);
      }}
    >
      {param1}
    </Button>,
  ];

  return (
    <>
      {data ? (
        <>
          <Button
            colorScheme={'teal'}
            size="sm"
            m="1rem"
            onClick={() => {
              console.log('halo');
              onToggle();
            }}
          >
            + Create Prescription Copy
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent minW="80%">
              <ModalHeader>Create Prescription Copy</ModalHeader>
              <ModalCloseButton
                onClick={() => {
                  dispatch({
                    type: 'UNSET_PRESCRIPTION_FORM',
                  });
                  setState('Add Medicine');
                  onToggle();
                }}
              />

              <ModalBody bg="purple.50" py="1rem" overflow={'auto'}>
                <Flex>
                  <Box w="50%" p="1rem">
                    <Image h="60vh" src={data.prescription} mx="auto" />
                  </Box>
                  <Box pt="1rem">
                    {/* Data */}
                    <Box
                      fontSize="sm"
                      fontWeight={'bold'}
                      p="1rem"
                      rounded={'lg'}
                      bg="white"
                      shadow="md"
                    >
                      <Flex gap={2}>
                        <Box>
                          <Text>No Invoioce</Text>
                          <Input
                            focusBorderColor="teal.500"
                            value={data.no_invoice}
                            minW="16rem"
                          />
                        </Box>
                        <Box>
                          <Text>Date</Text>
                          <Input
                            focusBorderColor="teal.500"
                            type="date"
                            value={data.createdAt}
                          ></Input>
                        </Box>
                      </Flex>
                      <Text>Patient Name</Text>
                      <Input
                        focusBorderColor="teal.500"
                        value={data.User.full_name}
                      ></Input>
                      <Text>Doctor Name</Text>
                      <Input
                        focusBorderColor="teal.500"
                        value={'Pak Dokter'}
                      ></Input>
                    </Box>
                    {/* Data */}
                    <Flex justifyContent={'center'} gap={2} my="1rem">
                      {AddType('Add Medicine', 'Add Medicine')}
                      {AddType('Add Compound', 'Add Compund')}
                    </Flex>
                    {/* Add Product */}
                    {state == 'Add Medicine' ? (
                      <MedicineForm />
                    ) : (
                      <CompoundForm />
                    )}
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme={'teal'}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    dispatch({
                      type: 'UNSET_PRESCRIPTION_FORM',
                    });
                    setState('Add Medicine');
                    onToggle();
                  }}
                >
                  Decline Prescription
                </Button>
                <Spacer />
                <Button
                  colorScheme={'teal'}
                  size="sm"
                  onClick={() => {
                    createPrescriptionCopy();
                  }}
                >
                  Create Prescription
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
