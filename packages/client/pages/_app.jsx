// pages/_app.js
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { AuthProvider } from '../src/Authentication/AuthProvider';

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
