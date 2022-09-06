import { Avatar, Box, Button, Flex, FormControl, HStack, Icon, Input, InputGroup, InputRightElement, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { BiSearchAlt, BiCartAlt } from 'react-icons/bi'
import { MdOutlineStorefront, MdOutlineHome, MdOutlineFileUpload, MdNotificationsNone } from 'react-icons/md'
import Logo_navbar from "../../public/logo/Logo_navbar.gif"

const Navbar = () => {
    return (
        <Flex position='sticky' top={0} bgColor='#eee' p={1} zIndex={3} boxShadow='xl' w='full' align='center' justify='center'>
            {/* Logo Box */}
            <Flex ml={5} justify='center'>
                <Image
                    src={Logo_navbar}
                    alt='Logo'
                    width={50}
                    height={50}
                />
            </Flex>

            <HStack flex={3} spacing={3} justify='center'>
                <Flex 
                    cursor='pointer'
                    justify='space-evenly'
                    align='center'
                >
                    <Icon as={MdOutlineHome} fontSize='2xl'mr={1}/>
                    <Text fontSize={14}>Home</Text>
                </Flex>

                <Link 
                    justify='space-evenly'
                    align='center'
                    display='flex'
                    _hover={{textDecoration: 'none'}}
                    href='../store'
                >
                    <Icon as={MdOutlineStorefront} fontSize='2xl' mr={1}/>
                    <Text fontSize={14}>Store</Text>
                </Link>
                
                <Flex 
                    cursor='pointer'
                    justify='space-evenly'
                    align='center'
                >
                    <Icon as={MdOutlineFileUpload} fontSize='2xl' mr={1}/>
                    <Text fontSize={14}>Upload Prescriptions</Text>
                </Flex>
            </HStack>

            {/* Search Box */}
            <Box
                flex={5}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
            >
                <FormControl w='full' borderEndRadius={5}>
                    <InputGroup>
                        <Input
                            type={"text"}
                            placeholder={"Search...."}
                            bgColor={"white"}
                        />
                        <InputRightElement cursor='pointer' bgColor='#F0BB62' borderEndRadius={5}>
                            <BiSearchAlt />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Box>

            {/* Menu Box */}
            <HStack flex={3} align='center' justify='space-evenly'>
                <Flex 
                    cursor='pointer'
                    justify='space-evenly'
                    align='center'
                >
                    <Icon as={BiCartAlt} fontSize='2xl'mr={1}/>
                    <Text fontSize={14}>Cart</Text>
                </Flex>

                <Flex 
                    cursor='pointer'
                    justify='space-evenly'
                    align='center'
                >
                    <Icon as={MdNotificationsNone} fontSize='2xl'mr={1}/>
                    <Text fontSize={14}>Notification</Text>
                </Flex>

                <Flex justify='space-between' align='center'>
                    <Text fontSize={14} fontWeight='bold' mr={2}>Usernmae</Text>
                    <Menu 
                        cursor='pointer'
                        justify='space-between'
                        align='center'
                    >
                        <MenuButton>
                            <Avatar
                                name='user'
                                size='md'
                            />
                        </MenuButton>

                        <MenuList>
                            <Link href='user/profile' _hover={{textDecoration: 'none'}}>
                                <MenuItem>
                                    Profile
                                </MenuItem>
                            </Link>

                            <MenuItem>Order Histories</MenuItem>
                            <MenuDivider/>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default Navbar