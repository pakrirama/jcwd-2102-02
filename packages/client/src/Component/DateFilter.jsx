import {
  Box,
  Icon,
  useDisclosure,
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Modal,
  ModalFooter,
  Spacer,
} from '@chakra-ui/react';

import { BsFillCalendarCheckFill } from 'react-icons/bs';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../lib/api';

export const DateFilter = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState([0]);
  const filter = useSelector((state) => state.transactionReducer);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: '',
      key: 'selection',
    },
  ]);

  const [filterDate, setFilterDate] = useState({ datefrom: '', dateto: '' });

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={BsFillCalendarCheckFill} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent>
          <ModalHeader>Filter by Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
              <DateRange
                onChange={(e) => {
                  setState([e.selection]);
                  setFilterDate({
                    datefrom: moment(e.selection?.startDate).format(
                      'YYYY-MM-DD',
                    ),
                    dateto: moment(e.selection?.endDate)
                      .add('days', 1)
                      .format('YYYY-MM-DD'),
                  });
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              variant="outline"
              colorScheme={'teal'}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Spacer />
            <Button
              size="sm"
              colorScheme={'teal'}
              onClick={() => {
                dispatch({
                  type: 'SET_TRANSACTION_FILTER',
                  payload: {
                    ...filter,
                    datefrom: filterDate.datefrom,
                    dateto: filterDate.dateto,
                    banner: false,
                  },
                });
                onClose();
                console.log(filter);
              }}
            >
              Set Date
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
