import logo from "../../../assets/imgs/logo2.png"
import bank_bca from "../../../assets/metode_pemabayran/bank_bca.png"
import bank_mandiri from "../../../assets/metode_pemabayran/bank_mandiri.png"
import bank_permata from "../../../assets/metode_pemabayran/bank_permata.png"
import gopay from "../../../assets/metode_pemabayran/gopay.png"
import ovo from "../../../assets/metode_pemabayran/ovo.png"
import shopee from "../../../assets/metode_pemabayran/shopee.png"
import Image from 'next/image';
import jne from "../../../assets/imgs/JNE 1.png"
import pop from "../../../assets/imgs/pop.png"
import pos from "../../../assets/imgs/pos.png"
import tiki from "../../../assets/imgs/Logo-TIKI 1.png"

import {
  Box,
  Flex,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w="1440px"
      padding={'10px'}>
      <Container  maxW={'6xl'} py={10} >
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={"6"}>
            
            <Box>
            <Image src={logo} alt="logo" width='180px' height='100px' />

            </Box>
          </Stack>
          <Stack align={'flex-start'}  w="100px">
          <Text  fontSize={'lg'} mb={2} fontWeight='bold' color='#213360'>
     About</Text>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>History</Link>
            <Link href={'#'}>Vision and mision</Link>
        
          </Stack>
          <Stack align={'flex-start'} w="100px">
          <Text  fontSize={'lg'} mb={2} fontWeight='bold' color='#213360'>
            Help center</Text>           
     <Link href={'#'}></Link>
            <Link href={'#'}>FAQ </Link>
            <Link href={'#'}>Our policy</Link>
          
          </Stack>
          <Stack align={'flex-start'} w="100px">
          <Text  fontSize={'lg'} mb={2} fontWeight='bold' color='#213360'>
    Contact us</Text>
    <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Whats app</Link>
            <Link href={'#'}>Instagram</Link>
          </Stack>
          
          <Flex>

          <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Text fontWeight='bold' color='#213360'>Metode Pembayaran</Text>
          <Flex>
          <Box mt='10px' display='flex' flexWrap='wrap'>
            <Box mr='10px' pt='10px'>
              <Image src={bank_bca} alt="bank bca" width='70px' height='23px' />
            </Box>
            <Box mr='10px'>
              <Image src={bank_mandiri} alt="bank mandiri" width='100px' height='30px' />
            </Box>
            <Box mr='10px'>
              <Image src={bank_permata} alt="bank permata" width='110px' height='35px' />
            </Box>
            <Box mr='10px' pt='15px'>
              <Image src={gopay} alt="gopay" width='100px' height='25px' />
            </Box>
            <Box mr='10px' pt='10px'>
              <Image src={ovo} alt="ovo" width='50px' height='35px' />
            </Box>
            <Box pt='5px'>
              <Image src={shopee} alt="shopee" width='80px' height='50px' />
            </Box>

          </Box>

          </Flex>

        </Box>
        <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Text fontWeight='bold' color='#213360'>Expedition Partners</Text>
          <Box mt='10px' display='flex' flexWrap='wrap'>
            <Box mr='10px' pt='10px'>
              <Image src={jne} alt="bank bca" width='70px' height='23px' />
            </Box>
            <Box mr='10px'>
              <Image src={pop} alt="bank mandiri" width='70px' height='30px' />
            </Box>
            <Box mr='10px'>
              <Image src={pos} alt="bank permata" width='70px' height='35px' />
            </Box>
            <Box mr='10px' pt='15px'>
              <Image src={tiki} alt="gopay" width='70px' height='25px' />
            </Box>
           

          </Box>
        </Box>
          </Flex>
        </SimpleGrid>
      </Container>
      
    </Box>
  );
}