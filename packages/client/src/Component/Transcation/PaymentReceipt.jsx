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
  Box,
  FormControl,
  Input,
  Image,
  Flex,
  Icon,
  VisuallyHidden,
  FormLabel,
  Avatar,
  Stack,
  chakra,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../Lib/api';

export const PaymentReceipt = ({ image }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Button colorScheme={'teal'} onClick={onToggle} variant="link">
        Payment Receipt
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Recipt</ModalHeader>
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
                <Image bg="blackAlpha.200" src={image} />
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
