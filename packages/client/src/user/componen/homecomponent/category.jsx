import {
    Box, Input,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Icon, Text, VStack, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
    Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
  } from '@chakra-ui/react';
  import LinkNext from 'next/link';
  import { useRouter } from 'next/router';

export default function HomeCategory() {
    const router = useRouter();

 return (
    <>
    <Box  h= "75px" w="1440px"  border-borderRadius={0} bg='#ffffff' borderBottomWidth='1px' boxShadow='md' px={4} >
      <Flex h={75}  justifyContent="center">
        <Flex mr="150px">

            <LinkNext href='/home' className='Button-Navbar'style={{ textDecoration: "none" }}>
              <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
                Medication
              </Button>
            </LinkNext>

        </Flex>
<Flex mr="150px">
  
            <LinkNext href='/listProduct' className='Button-Navbar' style={{ textDecoration: "none" }}>
              <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
                Vitamins & Supplements
              </Button>
            </LinkNext>
</Flex>

<Flex mr="150px">

            <Link className='Button-Navbar' style={{ textDecoration: "none" }} href="/listProduct">
              <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
              Women’s Health

              </Button>
            </Link>
</Flex>
<Flex mr="150px">
  
              <LinkNext href='/listProduct' className='Button-Navbar' style={{ textDecoration: "none" }}>
              <Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
                      Men’s Health

              </Button>
            </LinkNext>
</Flex>
            <Flex >

            <LinkNext href='/listProduct' className='Button-Navbar' style={{ textDecoration: "none" }}>
              <Button Button background='white' _hover={{ background: '#E8F5FD' }} borderRadius={0} h={16}>
 Infant & Children
              </Button>
            </LinkNext>
            </Flex>
      </Flex>


    </Box>
  </>
 )
}