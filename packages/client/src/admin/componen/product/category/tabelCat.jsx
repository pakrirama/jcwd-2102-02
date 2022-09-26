import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Icon,
    Switch ,
    Checkbox,
    Box,
    Text,
    Button,
    Image,


    
    } from "@chakra-ui/react";
    import {FaSort} from "react-icons/fa"
import {FiEdit} from "react-icons/fi"
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
 import UpdateCat from "./updateCat";
import { axiosInstance } from "../../../../lib/api";
import DeletCat from "./deletCat";

export default function categoryTabel() {
  const [category, setCatgory] = useState([])
  const router = useRouter();

  
  async function getProduct () {
    // setTimeout(()=>{
      
    await  axiosInstance.get("/category/allCat/")
      .then((res)=>{
        const temp = res.data.result
        setCatgory([...temp])
        console.log(res.data.result);

      })
      
      
      
   
    // },2000)
  
  }

  const renderProductList = () =>{
    return category.map((val,index)=>{
    // let take = false 
    // const check = val.take.find((a)=>{
    //   return a.user_id == userselector.id
    // })
    // if(!check){
    //   take=  false
    // } else { take= true}

    return(
      <ProductList key={index}
      name={val?.name}
      code={val?.code}
      price={val?.price}
      img_url={val?.img_url} />

    )
    })
  }
  
  useEffect(()=>{
    getProduct();
  },[])
  return(
    <>
        <TableContainer rounded={"lg"} border= "1px" borderColor={"purple"}>
           
          <Table variant='simple' >
            <TableCaption>Category List</TableCaption>
            <Thead>
              <Tr bg={"#E1E1F7"} >
                <Th>
                <Checkbox ></Checkbox>
                </Th>
                <Th>Category
                <Icon as={FaSort} />
                </Th>
                <Th isNumeric> Category Image
                <Icon as={FaSort} /></Th>
                <Th>
                    Status
                </Th>
                <Th>
                Update
                </Th>
                <Th>
                Delete
                </Th>
                
              </Tr>
            </Thead>
            <Tbody>
            
              {category.map((category,index)=>(
                <Tr  key={category.id}>
                <Td><Checkbox ></Checkbox></Td>
                <Td>{category.category}</Td>
                <Image src={`${category.img_category}`} w='90px' h='90px' objectFit='cover' rounded={5} />
                <Td>
                <Switch colorScheme='teal' size='md' />
                </Td>
                <Td >
                     <Button focusBorderColor="black" color="#00A8B5" ml="10px" >
                <UpdateCat
                idCat={category.id}
                tbCat={category.category}
                tbimg_url={category.img_category}/>
      </Button> 
                </Td>
                <Td>
                <Button focusBorderColor="black" color="#00A8B5" ml="10px" >
                <DeletCat
                idDEl={category.id}/>
      </Button> 
                </Td>
                
            
              </Tr>
              ))}
              

                
            
            </Tbody>
            
          </Table>
        </TableContainer>
        </>
    )
  }

