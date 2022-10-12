import {
  Box, Flex, Text, chakra, Button, Icon, VisuallyHidden, useDisclosure, Menu,MenuItem
  , useToast, Textarea , ModalBody, FormLabel, ModalContent, ModalHeader,
  ModalCloseButton, Input, Stack, FormControl, ModalOverlay,Modal, Image
} from "@chakra-ui/react";
import {BsFillCalendarCheckFill} from "react-icons/bs"
import moment from 'moment';
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch,useSelector  } from "react-redux";
import { axiosInstance } from "../../../lib/api";


export default function Calender() {
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
  const [product, setProduct] = useState([0])
  const filter = useSelector((state) => state.filterReducer);


  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: "",
      key: "selection"
    }
  ]);
  // let dateNow = moment(new Date()).format('YYYY-MM-DD')
  // let startDate2 = moment(state?.startDate).format('YYYY-MM-DD')
  // let endDate2 = moment(state?.endDate).format('YYYY-MM-DD')

  const dispatch = useDispatch();


  // console.log("start "+ startDate2)
  // console.log("end "+endDate2)
  return (
    <Menu>
<MenuItem onClick={onOpenUpdate}>
<Icon as={BsFillCalendarCheckFill}/>
<Text fontWeight='semibold'>
</Text>
</MenuItem>
<Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size='lg'>
<ModalOverlay      bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)' />

  <ModalContent>
    <ModalHeader>filter by Date</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'> 
      <DateRange
        // onChange={(e) => {setState([e.selection])}}
        onChange={(e) => {
          setState([e.selection])
          console.log('STATE')
    
          console.log(e.selection.startDate)
          console.log(e.selection.endDate)
          dispatch({
            type: 'SET_FILTER',
            payload: {
              ...filter,
              datefrom:moment(e.selection?.startDate).format('YYYY-MM-DD'),
              dateto:moment(e.selection?.endDate).add('days', 1).format('YYYY-MM-DD'),
              banner: false,
            },
          });
          console.log(filter)
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      
        
      </Box>

    </ModalBody>
  </ModalContent>

</Modal>
</Menu>
  );
}
