import {
    Box, Flex, Text, chakra, Button, Icon, VisuallyHidden, useDisclosure, Menu,MenuItem
    , useToast, Textarea , ModalBody, FormLabel, ModalContent, ModalHeader,
    ModalCloseButton, Input, Stack, FormControl, ModalOverlay,Modal, Image
  } from "@chakra-ui/react";
  import { useState, useRef,useEffect } from 'react';
  import {useParams} from "react-router-dom"
  import {  useSelector } from 'react-redux';
 import { axiosInstance } from "../../../../../lib/api";
  import { useFormik } from "formik";
  import {FiEdit} from "react-icons/fi"
  import qs from 'qs'
  
  export default function UpdateTabel(props) {
    const { idUpStock, upCapital ,upProfit,upSold_qty ,upStock,upSelling } = props;
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
    const { onClose } = useDisclosure()
    const userSelector = useSelector((state) => state.auth)
    const toast = useToast();
    const [selectedFile, setSelectedFile] = useState(null)

    
   
    
    const formik = useFormik({
      initialValues: {
        capital_price:``,
        profit :``,
        selling_price: ``,
        sold_qty:'',
        stock:'',
      },
      
      validateOnChange: false,
      onSubmit: async () => {
        // const formData = new FormData()
        const { capital_price, profit , selling_price,sold_qty,stock} = formik.values
        // formData.append("capital_price", capital_price)
        // formData.append("profit", profit)
        // formData.append("selling_price", selling_price)
        // formData.append("sold_qty", sold_qty)
        // formData.append("stock", stock)

        
        

        try {
          let body = {
            capital_price ,
            profit , 
            selling_price,
            sold_qty,
            stock,

          }
         
      
          await axiosInstance.patch(`/product_stock/update/` + idUpStock  , qs.stringify(body)).then(() => {
            
            toast({
              title: `product stock has been edit`,
              status: "success",
              isClosable: true,
            })
          })
        } catch (err) {
          console.log(err);
        }
      }

    })
    
  
    return (
        <>
        <Menu>
        <MenuItem onClick={onOpenUpdate}>
        <Icon as={FiEdit}/>
        <Text fontWeight='semibold'>
        </Text>
        </MenuItem>
        <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size='lg'>
        <ModalOverlay />

          <ModalContent>
            <ModalHeader>Update Stock {idUpStock}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
    
                <Box maxW='400px' maxH='350px' objectFit='fill'>
                 
                </Box>
    
                <Box mt='10px'>
                  <FormControl>
                    <FormLabel>capital price {formik.values.capital_price}</FormLabel>
                    
                    <Textarea placeholder='capital_price' maxLength='2000' w='400px' h='150px'
                      onChange={(e) => {
                        formik.setFieldValue("capital_price", e.target.value)
                      }} defaultValue={upCapital} />
                  </FormControl>
    
                  <FormControl mt='10px'>
                    <FormLabel>profit {formik.values.profit}</FormLabel>
                    <Input placeholder='profit' maxLength='2000' w='400px'
                      onChange={(e) => {
                        formik.setFieldValue("profit", e.target.value)
                      }} defaultValue={upProfit} />
                  </FormControl>

                  <FormControl mt='10px'>
                    <FormLabel>selling price{formik.values.selling_price}</FormLabel>
                    <Input placeholder='selling_price' maxLength='2000' w='400px'
                      onChange={(e) => {
                        formik.setFieldValue("selling_price", e.target.value)
                      }} defaultValue={upSelling}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel>sold quantity {formik.values.sold_qty}</FormLabel>
                    
                    <Textarea placeholder='sold_qty' maxLength='2000' w='400px' h='150px'
                      onChange={(e) => {
                        formik.setFieldValue("sold_qty", e.target.value)
                      }} defaultValue={upSold_qty} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Stock {formik.values.stock}</FormLabel>
                    
                    <Textarea placeholder='stock' maxLength='2000' w='400px' h='150px'
                      onChange={(e) => {
                        formik.setFieldValue("stock", e.target.value)
                      }} defaultValue={upStock} />
                  </FormControl>
                  <FormControl>
          
        
        </FormControl>
                  <Box mt={'17px'} justifyContent='flex-end'>
                    <Button mr={3} colorScheme='twitter' onClick=
                      {() => {
                        async function submit() {
                          await formik.handleSubmit();
                          onClose();
                        }
                        submit()
                      }}>
                      Update Stock
                    </Button>
                  </Box>
                </Box>
              </Box>
    
            </ModalBody>
          </ModalContent>

        </Modal>
        </Menu>
        </>
      )
  };
  