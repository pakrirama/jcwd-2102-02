/* eslint-disable react/no-unescaped-entities */
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, Button, AccordionPanel, AccordionIcon, Box, AccordionButton, AccordionItem, Accordion, Stack, Checkbox, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Input, VStack, Grid, GridItem, Center, Container, HStack, Link } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import obat_1 from "../../public/gambar_obat/obat_1.png"
import Image from "next/image"
import { axiosInstance } from "../../library/api"

const ProductStore = () => {
    const [sliderValue, setSliderValue] = useState(0)
    const [ allProduct, setAllProduct ] = useState([])


    const fetchDataProduct = async () => {
        try {
            await axiosInstance.get('/product').then((res) => {
                const data = res.data.result
                setAllProduct(data)
            })

        } catch (error) {
            console.log(error)
        }
    }

    console.log(allProduct);

    const productCard = () => {
        return allProduct?.map((val) => {
            return (
                <>
                <GridItem>
                    <Link w='full' h='full' borderRadius='.5em' className='product-card' cursor='pointer' _hover={{textDecoration: 'none'}} href={`/product/${val.id}`}>
                    <VStack>
                        <Image
                            alt=''
                            src={`http://${val.product_imgs[0].img_url}`}
                            width='150px'
                            height='150px'
                        />

                        <Stack align='center' justify='center' w='full' spacing={2} textAlign='center'>
                            <Text fontWeight='bold' fontSize={14}>{val.product_name}</Text>
                            <Text fontSize={12} color='grey' border='1px' borderColor='grey' p={1} borderRadius={15}>{val.product_categories[0].category.category}</Text>
                            <Text fontWeight='bold'>{Number(val.product_stocks[0].sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Stack>

                        <Button 
                            w='full' 
                            borderBottomRadius={10} 
                            borderTopRadius={0} 
                            bgColor='fireBrick' 
                            color='white'
                            _hover={{
                                backgroundColor: "#e3eeee",
                                color: "fireBrick"
                            }}
                        >
                            Add to Cart
                        </Button>
                    </VStack>
                </Link>
                </GridItem>
                </>
            )
        })
    }

    useEffect(() => {
        fetchDataProduct()

    }, [])


    return (
        <Flex
            flexDir='row'
            overflow='hidden'
            maxW= "90%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
        >
            <Flex
                flexDir='column'
                alignItems='center'
                w='25em'
                bgColor="black"
                color="white"
            >
                <Flex 
                    flexDir='column'
                    justifyContent='space-between'
                    h='full'
                    w="20em"
                    px={10}
                    marginY={12}
                >
                    {/* menu*/}
                    <VStack 
                        display='inline'
                        spacing={5}
                    >
                        {/* menu list */}
                        <Accordion defaultIndex={[0]} allowMultiple boxShadow='dark-lg'>
                            <AccordionItem>
                                <AccordionButton bgColor='#b41974' color='white' _hover={{bgColor: 'white', color: 'black'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text>Category</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                
                                <AccordionPanel pb={4}> 
                                    <Stack w='100%' spacing={3} className='link'>
                                        <Text cursor='pointer'>Obat Batuk</Text>
                                        <Text cursor='pointer'>Obat Batuk</Text>
                                        <Text cursor='pointer'>Obat Batuk</Text>
                                    </Stack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <Accordion defaultIndex={[0]} allowMultiple boxShadow='dark-lg'>
                            <AccordionItem>
                                <AccordionButton bgColor='#b41974' color='white' _hover={{bgColor: 'white', color: 'black'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text>Harga</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                
                                <AccordionPanel pb={4}> 
                                    <Stack w='100%' spacing={3}>
                                    <RangeSlider 
                                        defaultValue={[0, 200]} 
                                        min={0} 
                                        max={200} 
                                        step={50}
                                        onChangeEnd={(val) => setSliderValue(val)}
                                        w='87%'
                                        alignSelf='center'
                                        mt={5}
                                    >                                        
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack/>
                                        </RangeSliderTrack>

                                        <RangeSliderThumb index={0}/>
                                        <RangeSliderThumb index={1}/>
                                    </RangeSlider>

                                    <Flex w='105%' textAlign='center'>
                                        <Text flex={1} pr={1}>0</Text>
                                        <Text flex={1}>50</Text>
                                        <Text flex={1}>100</Text>
                                        <Text flex={1}>150</Text>
                                        <Text flex={1} pl={1}>200</Text>
                                    </Flex>
                                        <Input type={'number'} placeholder='min' value={sliderValue[0]}/>
                                        <Input type={'number'} placeholder='max' value={sliderValue[1]}/>
                                    </Stack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <Accordion defaultIndex={[0]} w='100%' allowMultiple boxShadow='dark-lg'>
                            <AccordionItem>
                                <AccordionButton bgColor='#b41974' color='white' _hover={{bgColor: 'white', color: 'black'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text>Jenis Obat</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                
                                <AccordionPanel pb={4}> 
                                    <Stack w='100%' spacing={3}>
                                        <Checkbox>Obat Batuk</Checkbox>
                                        <Checkbox>Obat Batuk</Checkbox>
                                        <Checkbox>Obat Batuk</Checkbox>
                                        <Checkbox>Obat Batuk</Checkbox>
                                    </Stack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </VStack>
                </Flex>
            </Flex>

            {/* Content */}
            <VStack minW='70%' p={3} ml={3}>
                <Flex w='full' flexDir='column'>
                    <Text fontWeight='bold' fontSize={17}>Category Product</Text>
                    <Box w='full' h={1} borderBottom="2px" borderColor='#b41974' mt={2} boxShadow='dark-lg'></Box>
                </Flex>

                <Flex w='full' justify='space-between' align='center' p={2}>
                    <Box>
                        <Text>Total Product Category</Text>
                    </Box>

                    <Box display='flex'>
                        <Text alignSelf='center' mr={1}>Urutkan</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Penjualan terbanyak
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Harg'a Termurah</MenuItem>
                                <MenuItem>Harga Termahal</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>

                <Box w='full'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                        {/* <GridItem>
                            <Box w='full' borderRadius='.5em' className='product-card' cursor='pointer'> */}
                                {/*  product card */}
                                {productCard()}
                            {/* </Box>
                        </GridItem> */}
                    </Grid>
                    <Center my={5}>
                    <HStack>
                        <Button onClick={() => {setCounter(counter - 1)}} size='sm'>
                            Prev
                        </Button>
                        
                        <Box sz='sm'>1</Box>
                        
                        <Button onClick={() => {setCounter(counter + 1)}} size='sm'>
                            Next
                        </Button>
                    </HStack>
                    </Center>
                </Box>
            </VStack>

        </Flex>
    )
}

export default ProductStore