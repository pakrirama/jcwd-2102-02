import { ReactNode } from 'react';
import {
  Box, 
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';



export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
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
  return (
    <>
  

      <Box  bg='#ffffff' borderBottomWidth='1px' boxShadow='md' px={4} className='topnavbar' rounded={"lg"} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton bg='#ffffff'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

    

          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              
              
                <Button background='white'
                  style={filter.category == 'medication' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('medication');
                  }}>
                  Medicine
                </Button>
              
             
                <Button background='white'
                  style={filter.category == 'vitamin-supplements' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('vitamin-supplements');
                  }}>
                  vitamin supplements
                </Button>
                <Button background='white'
                  style={filter.category == 'Medic' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('Medic');
                  }}>
                  Medic
                </Button>
                <Button background='white'
                  style={filter.category == 'vitamin' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('vitamin');
                  }}>
                  vitamin
                </Button>
                <Button background='white'
                  style={filter.category == 'supplements' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('supplements');
                  }}>
                  supplements
                </Button>
                <Button background='white'
                  style={filter.category == 'Women’s Health' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('Women’s Health');
                  }}>
                  Women’s Health
                </Button>
                <Button background='white'
                  style={filter.category == 'Man Health' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('Man Health');
                  }}>
                  Man Health
                </Button>
                <Button background='white'
                  style={filter.category == 'Infant' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}
                  onClick={() => {
                    handleClick('Infant');
                  }}>
                  Infant
                </Button>
             
              <Link className='Button-Navbar' style={{ textDecoration: "none" }}>
                <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
                History
                </Button>
              </Link>
              
            </HStack>
          </Flex>
        </Flex>

       
      </Box>
    </>
  );
}