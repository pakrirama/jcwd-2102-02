import {
  Box, Flex, Text, chakra, Button, Icon, VisuallyHidden, useDisclosure, Menu,MenuItem
  , useToast, Textarea , ModalBody, FormLabel, ModalContent, ModalHeader,
  ModalCloseButton, Input, Stack, FormControl, ModalOverlay,Modal, Image
} from "@chakra-ui/react";
import { useState, useRef,useEffect } from 'react';
import {useParams} from "react-router-dom"
import {  useSelector } from 'react-redux';
import { axiosInstance } from "../../../../lib/api";
import { useFormik } from "formik";
import {FiEdit} from "react-icons/fi"
import qs from 'qs'

export default function UpdateTabel(props) {
  const { idUpPro, CatPro , ProCat } = props;
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
  const { onClose } = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null)

  
 
  
  const formik = useFormik({
    initialValues: {
      id_product:``,
      id_category :``,
      
    },
    
    validateOnChange: false,
    onSubmit: async () => {
      // const formData = new FormData()
      const { id_product , id_category} = formik.values
      // formData.append("capital_price", capital_price)
      // formData.append("profit", profit)
      // formData.append("selling_price", selling_price)
      // formData.append("sold_qty", sold_qty)
      // formData.append("stock", stock)

      
      

      try {
        let body = {
          id_product ,
          id_category , 
         

        }
       
    
        await axiosInstance.patch(`/product_category/update/` + idUpPro  , qs.stringify(body)).then(() => {
          
          toast({
            title: `product Category has been edit`,
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
          <ModalHeader>Update Stock {idUpPro}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
  
              <Box maxW='400px' maxH='350px' objectFit='fill'>
               
              </Box>
  
              <Box mt='10px'>
                <FormControl>
                  <FormLabel> Id Product </FormLabel>
                  
                  <Textarea placeholder='id_product' maxLength='2000' w='400px' h='150px'
                    onChange={(e) => {
                      formik.setFieldValue("id_product", e.target.value)
                    }} defaultValue={CatPro} />
                </FormControl>
  
                <FormControl mt='10px'>
                  <FormLabel>Id Category {formik.values.profit}</FormLabel>
                  <Input placeholder='id_category' maxLength='2000' w='400px'
                    onChange={(e) => {
                      formik.setFieldValue("id_category", e.target.value)
                    }} defaultValue={ProCat} />
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
                    Update Product Category
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
