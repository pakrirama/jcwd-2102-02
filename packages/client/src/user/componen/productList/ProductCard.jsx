import {
 Flex, Box, Input, InputGroup, InputRightElement, InputLeftElement, Button,
 Select, Icon, Text, Center, CheckboxGroup, Checkbox, Stack
} from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";
import Image from 'next/image';
import upload from '../../../assets/imgs/bottle.png'

import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useSelector } from 'react-redux';
export default function ProductCard() {
  const userSelector = useSelector((state)=>state.auth)
 return (
  <>

   <Box w='180px' h='283px'  m='10px' _hover={{ boxShadow: 'xl' }}  >
    <Box h='160px' w='full' _hover={{ cursor: "pointer" }} borderTopRadius='13px' overflow='hidden'>
    <Image src={upload} />
    </Box>
    <Box px='10px' h='100px'>
     <Text fontWeight='bold' color='#213360'>Blackmores Multivitamins + Minerals</Text>
     <Text fontWeight='semibold' color='#213360'>Rp 32.000</Text>
    </Box>
    <Box pb='12px' px='10px'>
     <Button w='full' borderColor='#009B90' borderRadius='9px'  size='lg' my='5px'
      _hover={{ bg: '#00A8B5', color: 'white' }}
      disabled = {userSelector.id ? false : true }>
        
      <Icon boxSize='4' as={IoCartOutline} mr='5px' />
      Add to cart</Button>

     {/* <InputGroup size='sm'>
      <InputLeftElement bg='#009B90' borderLeftRadius='9px' color='white'>
       <Icon
        boxSize='5'
        as={HiMinusSm}
        sx={{ _hover: { cursor: "pointer" } }}
       />
      </InputLeftElement>
      <Input textAlign='center' borderRadius='9px' required bg='white'
       onChange={(event) =>
        formik.setFieldValue("password", event.target.value)} />
      <InputRightElement bg='#009B90' borderRightRadius='9px' color='white'>
       <Icon
        boxSize='5'
        as={HiPlusSm}
        sx={{ _hover: { cursor: "pointer" } }}
       />
      </InputRightElement>
     </InputGroup> */}
    </Box>
   </Box>
  </>
 )
}