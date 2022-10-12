import {
    Flex, Box, Input, InputGroup, InputRightElement, Button,
    Select, Icon, Text, Center, CheckboxGroup, Checkbox, Stack
  } from '@chakra-ui/react';
  import { useRouter } from 'next/router';
  import { useDispatch, useSelector } from 'react-redux';
  
  import { RiListCheck } from 'react-icons/ri';

 

  export default function filterCategory () {

    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filterReducer);
  
    const handleClick = (param) => {
      dispatch({
        type: 'SET_FILTER',
        payload: {
          category: param,
          banner: false,
          offset: 0,
        },
      });
      console.log(filter);
    };
  

    return(
        <>
        <Flex flexWrap={'wrap'} justifyContent={'center'}>
<Box>
<Box w='200px' m='10px'  boxShadow='md' bg='white' borderRadius='10px'>
            <Box h='40px' borderTopRadius='10px' bg='#009B90'>
              <Center h='40px' >
                <Icon boxSize='6' as={RiListCheck} color='white' />
                <Text mx='10px' fontWeight='bold' color='white'>
                  Filter Category
                </Text>
              </Center>
            </Box>
            <Box p='10px'>
              <Box>
                <Checkbox colorScheme='green' value="medication" style={
            filter.category == 'medication'
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
          onClick={() => {
            handleClick('medication');
          }}
          onChange={(v) => {
            dispatch({
              type: 'SET_FILTER',
              payload: {
                ...filter,
                ...v,
                banner: false,
              },
            });
      
          }}> medication</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
                <Checkbox colorScheme='green' > Kategori 1</Checkbox>
              </Box>
            </Box>
          </Box>

</Box>

        </Flex>




        </>


    )

  }