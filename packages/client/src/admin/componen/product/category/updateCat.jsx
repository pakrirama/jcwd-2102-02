import {
    Box, Flex, Text, chakra, Button, Icon, VisuallyHidden, useDisclosure, Menu,MenuItem
    , useToast, Textarea , ModalBody, FormLabel, ModalContent, ModalHeader,
    ModalCloseButton, Input, Stack, FormControl, ModalOverlay,Modal, Image
  } from "@chakra-ui/react";
  import { useState, useRef } from 'react';
import { axiosInstance } from "../../../../lib/api";
  import {  useSelector } from 'react-redux';
  import { useFormik } from "formik";


  
  export default function updateTabel(props) {
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
    const { onClose } = useDisclosure()
    const inputFileRef = useRef(null)

    const { tbCat, tbimg_url, idCat  } = props
    console.log(props)

    const userSelector = useSelector((state) => state.auth)
    const toast = useToast();
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
    }
    
   
    
    const formik = useFormik({
      initialValues: {
        catgory: "",
      
        id: idCat
 
      },
      
      validateOnChange: false,
      onSubmit: async () => {
        const formData = new FormData()
        const { category ,id } = formik.values

        formData.append("category", category)
        formData.append("img_category", selectedFile)

        

        try {
          
      
          await axiosInstance.patch(`/category/updateCat/ ${idCat}` , formData ).then(() => {
            console.log(tbCat);
            toast({
              title: `catgeory has been edit`,
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
        <Text fontWeight='bold'>
          {tbCat}
        </Text>
        </MenuItem>
        <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} size='lg'>
        <ModalOverlay 
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'/>

          <ModalContent>
            <ModalHeader>Update  {tbCat} </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
    
                <Box maxW='400px' maxH='350px' objectFit='fill'>
                  <Image src={`${tbimg_url}`} w='400px' h='350px' objectFit='cover' rounded={5} />
                </Box>
    
                <Box mt='10px'>
                  <FormControl>
                    <FormLabel>Category {formik.values.category}</FormLabel>
                    <Textarea placeholder='category' maxLength='2000' w='400px' h='150px'
                      onChange={(e) => {
                        formik.setFieldValue("category", e.target.value)
                      }} defaultValue={tbCat} />
                  </FormControl>
    

                  <FormControl>
          
          <Flex
            mt={1}
            justify="center"
            px={6}
            pt={5}
            pb={6}
            borderWidth={2}
            _dark={{
              color: "gray.500",
            }}
            borderStyle="dashed"
            rounded="md"
          >
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color="gray.400"
                _dark={{
                  color: "gray.500",
                }}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color="brand.600"
                  _dark={{
                    color: "brand.200",
                  }}
                  pos="relative"
                  _hover={{
                    color: "brand.400",
                    _dark: {
                      color: "brand.300",
                    },
                  }}
                >
                  <span>Upload a file</span>
                  <VisuallyHidden>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onChange={handleFile}
                      ref={inputFileRef}
                    />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{
                  color: "gray.50",
                }}
              >
                PNG, JPG, GIF up to 10MB
              </Text>
              <Button colorScheme={"blue"}
            onClick={() => inputFileRef.current.click()}>Upload Image</Button>
            </Stack>
          </Flex>
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
                      Update Category
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
  