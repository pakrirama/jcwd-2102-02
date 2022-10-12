import { Box, Flex, Stack, Container, Spinner } from '@chakra-ui/react';

import SwitchForm from '../Component/User/Authentication/SwitchForm';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../Component/User/Authentication/Tag';

export default function Login() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const url = 'https://jcwd210202.purwadhikabootcamp.com/' + router.pathname;

  useEffect(() => {
    if (userSelector?.id) {
      // setIsLoading(true);
      router.push('/home');
    } else {
      setIsLoading(false);
    }
  }, [userSelector?.id]);

  return (
    <Page
      title={'Pharmacy now'}
      description={'Login or Register '}
      url={url}
      type="website"
    >
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg="#FFFFFF">
        {isLoading ? (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />{' '}
            &nbsp; loading...
          </>
        ) : (
          <>
            <Container
              display="flex"
              margin="30px"
              padding="13px"
              alignItems={'center'}
              justifyContent={'center'}
              w={'935px'}
              maxW={'935px'}
              h={'550px'}
            >
              <Stack minW={'350px'} minH={'520px'}>
                <SwitchForm />
              </Stack>
            </Container>
          </>
        )}
      </Flex>
    </Page>
  );
}
