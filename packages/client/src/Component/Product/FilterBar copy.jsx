import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  Spinner,
  Stack,
  Text,
  useCheckbox,
  useCheckboxGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterInput } from './FilterInput';

export const FilterBar = ({ data }) => {
  const { value, setValue, getCheckboxProps } = useCheckboxGroup({});
  const filter = useSelector((state) => state.filterReducer);

  const dispatch = useDispatch();
  const cat = () => {
    let temp = [];
    data.map((val) => {
      temp.push(val.category);
    });
    return temp;
  };

  const CustomCheckbox = (props) => {
    const { state, getCheckboxProps, getInputProps } = useCheckbox(props);
    return (
      <FormLabel>
        <Flex alignItems="center" cursor="pointer">
          <input
            {...getInputProps()}
            hidden
            onClick={() => handleClick(value)}
          />
          <Flex
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor="green.500"
            w={4}
            h={4}
            {...getCheckboxProps()}
          >
            {state.isChecked && <Box w={2} h={2} bg="green.500" />}
          </Flex>
          <Text ml="1rem">{props.value}</Text>
        </Flex>
      </FormLabel>
    );
  };

  const handleClick = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        category: value,
        banner: false,
        offset: 0,
      },
    });
    console.log(value);
  };

  return (
    <>
      <Box minW={{ sm: '1rem', md: '10rem', lg: '15rem' }} m={'2.5rem'}>
        <Box shadow="md">
          <FilterInput />
        </Box>
        <Box
          border="1px"
          borderColor={'gray.100'}
          mt={'1rem'}
          borderRadius="lg"
          shadow="md"
          minH="25rem"
        >
          <CheckboxGroup colorScheme={'teal'}>
            <Stack py={4} px={6} gap={4}>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue(cat);
                    handleClick();
                  } else {
                    setValue([]);
                    handleClick();
                  }
                }}
              >
                Select All
              </Checkbox>
              {data ? (
                data.map((val, idx) => {
                  return (
                    <CustomCheckbox
                      {...getCheckboxProps({ value: val.category })}
                    />
                  );
                })
              ) : (
                <Spinner />
              )}
            </Stack>
          </CheckboxGroup>
        </Box>
        <Button
          onClick={() => {
            console.log(value);
          }}
        >
          Cek
        </Button>
      </Box>
    </>
  );
};
