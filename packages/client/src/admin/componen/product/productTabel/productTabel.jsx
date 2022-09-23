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
    Image,
    Button,
    TabsDescendantsProvider
    
    } from "@chakra-ui/react";
    import {FaSort} from "react-icons/fa"
    import { useDispatch, useSelector } from 'react-redux';
    import { useState,useEffect } from "react";

import { useRouter } from "next/router";
import UpdateTabel from "./updateTabel";
import { axiosInstance} from "../../../../lib/api"
import DeletProduct from "../DeleteProduct"
import UpdateStock from "../stock/updateStock/updateStock"
import ProductCat from '../product_category/product_category'
import UpdateCategory from './../category/UpdateCat2'
import DeletStock from '../stock/deletStock/deletStock'


export default function productTabel(props) {
  const [product, setProduct] = useState([])
  const filter = useSelector((state) => state.filterReducer);
  const autoReducer = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()


  const router = useRouter();

  
  async function getProduct () {
    // setTimeout(()=>{
     
    await  axiosInstance.get("/product/api/v1/allProduct", {
      params: filter
    })
      .then((res)=>{
        const data = res.data.result.products
        setProduct([...data])
console.log(res.data.result.products);
// dispatch({
//   type: "RENDER_POST",
//   payload: { value: !autoReducer.value }
// })
      })
      
      
      
   
    // },2000)
  
  }

  
  
  useEffect(()=>{
    getProduct();
  },[filter ])
  return(
    <>
        <TableContainer rounded={"lg"} border= "1px" >
           
          <Table variant='simple' >
            <TableCaption>Product List</TableCaption>
            <Thead>
              <Tr bg={"#E1E1F7"} >
                <Th>
                <Checkbox ></Checkbox>
                </Th>
                <Th>ID
                <Icon as={FaSort} />
                </Th>
                <Th>Product name
                <Icon as={FaSort} />
                </Th>
                <Th>Product code
                <Icon as={FaSort} />
                </Th>
                <Th isNumeric>product Image
                <Icon as={FaSort} /></Th>
                <Th isNumeric>product Price
                <Icon as={FaSort} /></Th>
                <Th isNumeric>capital price
                <Icon as={FaSort} /></Th>
                <Th isNumeric>profit
                <Icon as={FaSort} /></Th>
                <Th isNumeric>selling price
                <Icon as={FaSort} /></Th>
                <Th isNumeric>sold_qty
                <Icon as={FaSort} /></Th>
                <Th isNumeric>stock
                <Icon as={FaSort} /></Th>
                <Th isNumeric>Categories
                <Icon as={FaSort} /></Th>
                <Th>
                    Status
                </Th>
                <Th>
                Update product
                </Th>
                <Th>
                Update product categories
                </Th>
                <Th>
                Update Stock
                </Th>
                <Th>
                  Delet Stock
                  </Th>
                <Th>
                Delete Product
                </Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr>
                <Td>
                {renderProductList()}

                </Td>
              </Tr> */}
              {product.map((product,index)=>(
                <Tr  key={product.id}>
                <Td><Checkbox ></Checkbox></Td>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.code} </Td>
                <Td>
                <Image src={`${product.img_product}`} w='90px' h='90px' objectFit='cover' rounded={5} />
</Td>
                <Td>{product.price}</Td>
                <Td>{product.Product_Stock?.capital_price}</Td>
                <Td>{product.Product_Stock?.profit}</Td>
                <Td>{product.Product_Stock?.selling_price}</Td>
                <Td>{product.Product_Stock?.sold_qty}</Td>
                <Td>{product.Product_Stock?.stock}</Td>
                <Td> {product.Categories?.map((val, index) => (
                  index == product.Categories.length - 1 ?  
                  <Button > 
                     
                    <UpdateCategory
                idCat={val.id}
                tbCat={val.category}
               />
                
                  </Button>
                  

                  
                   :    
                   <Button justifyContent={"center"}> 
                    
                   <UpdateCategory
               idCat={val.id}
               tbCat={val.category}
              />
               
                 </Button>

                   ))}
                   </Td>


                <Td>
                <Switch colorScheme='teal' size='md' />
                </Td>
                <Td >
                <Button focusBorderColor="black" color="#00A8B5" ml="10px" >
                <UpdateTabel
                idUp={product.id}
                upName={product.name}
                upCode={product.code}
                upPrice={product.price}
                upImage={product.img_product}
               />
               </Button>
                </Td>
                <Td>
                  

                  <Button>
                        <ProductCat
                        // idProCat={val.id}
                        // idCetPro={val.id_categpory}
                        idPro={product.id}
                        catlist={product.Categories}

                        />

                  </Button>
                </Td>
                <Td >
                <Button focusBorderColor="black" color="#00A8B5" ml="10px" >
                <UpdateStock
                idUpStock={product.Product_Stock?.id}
                upCapital={product.Product_Stock?.capital_price}
                upProfit={product.Product_Stock?.profit}
                upSold_qty={product.Product_Stock?.sold_qty}
                upStock={product.Product_Stock?.stock}
                upSelling={product.Product_Stock?.selling_price}

               />
               </Button>
                </Td>
                <Td>
                  <Button>
                    <DeletStock
                    idDElstock = {product.Product_Stock?.id}/>
                  </Button>
                </Td>
                <Td >
                <Button focusBorderColor="black" color="#00A8B5" ml="10px" >
                <DeletProduct
                idDEl={product.id}
                />
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

