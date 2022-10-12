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
    Button
    
    } from "@chakra-ui/react";
    import {FaSort} from "react-icons/fa"
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "../../../../lib/api";

export default function categoryTabel() {
  const [Product_category, setProductCatgory] = useState([])
  const router = useRouter();

  
  async function getProduct () {
    // setTimeout(()=>{
      
    await  axiosInstance.get("/product_category/")
      .then((res)=>{
        const temp = res.data.result
        setProductCatgory([...temp])
console.log(res.data.result);
      })
      
      
      
   
    // },2000)
  
  }

  
  

  
  useEffect(()=>{
    getProduct();
  },[])
  return(
    <>
        <TableContainer rounded={"lg"} border= "1px" borderColor={"purple"}>
           
          <Table variant='simple' >
            <TableCaption>Product category List</TableCaption>
            <Thead>
              <Tr bg={"#E1E1F7"} >
                <Th>
                <Checkbox ></Checkbox>
                </Th>
                <Th>id Product
                <Icon as={FaSort} />
                </Th>
                <Th isNumeric> id Category
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
            
              {Product_category.map((Product_category,index)=>(
                <Tr  key={Product_category.id}>
                <Td><Checkbox ></Checkbox></Td>
                <Td>{Product_category.id_product}</Td>
                <Td>{Product_category.id_category}</Td>
                <Td>
                <Switch colorScheme='teal' size='md' />
                </Td>
                
                
                
            
              </Tr>
              ))}
              

                
            
            </Tbody>
            
          </Table>
        </TableContainer>
        </>
    )
  }

