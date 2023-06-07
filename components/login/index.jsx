import React from 'react';
import { Box, Divider, ChakraProvider } from "@chakra-ui/react";
////////////////////////////////
import MainFooter from "../../components/footer";
import LoginForm from './loginForm';
import Action from "../../components/nav";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../../theme/theme.jsx";
const queryClient = new QueryClient();

const LoginBox = () => {
  return (
    <>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box bg="primary.main">
          <Action hasBanner={false} isBlog={false} isLogin={true}/>
          
        </Box>
        <LoginForm />
        <Divider />
        <MainFooter />
      </QueryClientProvider>
    </ChakraProvider>
    </>
  );
};

export default LoginBox;