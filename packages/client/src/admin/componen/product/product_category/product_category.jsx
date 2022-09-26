import {
    Box, Flex, Text, chakra, Button, Icon, VisuallyHidden, useDisclosure, Menu,MenuItem
    , useToast, Textarea , ModalBody, FormLabel, ModalContent, ModalHeader,
    ModalCloseButton, Input, Stack, FormControl, ModalOverlay,Modal, Image,Select, Td
  } from "@chakra-ui/react";
  import { useState, useEffect } from 'react';
import { axiosInstance } from "../../../../lib/api";
  import {  useSelector } from 'react-redux';
  import { useFormik } from "formik";
  import qs from 'qs'
import UpdateProCat from './Update'
import DeletProductCat from './delete';
// import { Select } from 'chakra-react-select';

  
  export default function updateTabel(props) {
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
    const { onClose } = useDisclosure()
      
    const { idPro ,catlist } = props
    console.log(props)
  const [category, setCatgory] = useState([])

  
  async function getCategory () {
    // setTimeout(()=>{
      
    await  axiosInstance.get("/category/allCat/")
      .then((res)=>{
        const temp = res.data.result
        setCatgory([...temp])
        console.log(res.data.result);

      })
      
      
      
   
    // },2000)
  
  }

  
  useEffect(()=>{
    getCategory();
  },[])

    return (
       
       
            <Menu>
            <MenuItem onClick={onOpenUpdate}>
            
            </MenuItem>

            <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size='lg'>
            <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'/>
     
              <ModalContent>
                <ModalHeader>  
                 Product Cateogry 
                   </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
     
                { catlist?.map((val) => (
         <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
        


        <Flex>
    <Select
    defaultValue={val.category}>
     {category.map((val,index)=>(

        
        <option value={val.id}>        
        {val.category}
        </option>

      
         
        
      ))}
<option >
          {val.category}
        </option>
    </Select>
        </Flex>
            <Flex>
                <Flex>
                    <DeletProductCat id_cat={val.id} id_pro={idPro} />
                    <UpdateProCat idUpPro={val.id}
                    CatPro={val.category}/>
                </Flex>
                </Flex>  
                  </Box>
                      ))}
              
                </ModalBody>
          
               

              </ModalContent>

            </Modal>
       

            </Menu>

        
      )
  };
  