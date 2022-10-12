import { useState, useRef, useEffect } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  FormControl,
  Image,
  Flex,
  ModalFooter,
  Spacer,
  useToast,
} from '@chakra-ui/react';

import { ImAttachment } from 'react-icons/im';
import { axiosInstance } from '../../../lib/api';
import { ConfirmationDialogue } from '../Dialogue/ConfirmationDialogue';
import { useDispatch, useSelector } from 'react-redux';

export const PaymentReceipt = ({ image, role, status, id }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const transactionSelector = useSelector((state) => state.transactionReducer);
  const toast = useToast();
  const dispatch = useDispatch();
  const handleEditStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/order/status/${id}`, { status });
      toast({
        title: `Success`,
        status: 'success',
        isClosable: true,
      });
      dispatch({
        type: 'SET_TRANSACTION_FILTER',
        payload: {
          ...transactionSelector,
          render: !transactionSelector.render,
        },
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button colorScheme={'teal'} size="sm" variant="link" onClick={onToggle}>
        <ImAttachment /> See Payment Recepit
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
          {role == 'Admin' && status == 'Payment' ? (
            <ModalFooter>
              <ConfirmationDialogue
                name={'Decline Payment'}
                desc={'decline this payment?'}
                func={handleEditStatus}
                id={id}
                variant={'outline'}
                param={'Waiting For Payment'}
                size="sm"
              />
              <Spacer />
              <ConfirmationDialogue
                name={'Accept Paypemnt'}
                desc={'accept this payment?'}
                func={handleEditStatus}
                id={id}
                param={'Validation'}
                size="sm"
              />
            </ModalFooter>
          ) : (
            <></>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
