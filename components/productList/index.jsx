import React from "react";
//chakraui
import { Box, Divider, ChakraProvider } from "@chakra-ui/react";
//others
import ProductListView from "./productListView";
import MainFooter from "../../components/footer";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../../theme/theme.jsx";
const queryClient = new QueryClient();

const ShopList = () => {
  return (
    <>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box bg="primary.lighter">
          <ProductListView />
          <Divider />
          <MainFooter />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
    </>
  );
};

export default ShopList;