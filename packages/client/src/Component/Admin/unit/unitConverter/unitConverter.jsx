SiConvertio;

import {
  Flex,
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../../lib/api';
import { SiConvertio } from 'react-icons/si';

export default function ConverterStock(props) {
  // const {id} = useParams()
  const { idConvert, conPrimary, conSecondary } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const autoReducer = useSelector((state) => state.renderReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  async function Converter() {
    try {
      await axiosInstance.patch(`/unitConverter/` + idConvert);
      dispatch({
        type: 'FETCH_DATA',
        payload: {
          value: !autoReducer.value,
        },
      });

      toast({
        title: 'Success',
        description: 'Success Convertion Stock product',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button
        focusBorderColor="black"
        color="#00A8B5"
        ml="10px"
        onClick={onOpen}
      >
        <Icon as={SiConvertio} />
      </Button>
      <Menu>
        <MenuItem>
          <Text fontWeight="semibold"></Text>
        </MenuItem>
        <Modal isOpen={isOpen} onClose={onClose} size="xs">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>Converter Stock</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box justifyContent={'space-between'}>
                <Text fontWeight="semibold">
                  ID : <Text fontWeight="bold">{idConvert}</Text>
                </Text>

                <Text fontWeight="semibold">
                  Primary Stock : <Text fontWeight="bold"> {conPrimary}</Text>
                  Secondary Stock :{' '}
                  <Text fontWeight="bold"> {conSecondary}</Text>
                </Text>
                <Text>are you sure you want to convert the stock?</Text>
              </Box>
              <Box mt="10px" display="flex" justifyContent="flex-end">
                <Button
                  mr={3}
                  colorScheme="twitter"
                  onClick={() => {
                    async function submit() {
                      await Converter();
                    }
                    submit();
                    onClose();
                  }}
                >
                  Convert
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Menu>
    </>
  );
}
