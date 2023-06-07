import React from "react";
//chakraui
import { Box, Divider, ChakraProvider } from "@chakra-ui/react";
//others
import BlogListView from "./blogListView";
import MainFooter from "../../components/footer";
import Action from "../../components/nav";
import BlogFooter from "../sections/BlogFooter";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../../theme/theme.jsx";
const queryClient = new QueryClient();

const BlogList = () => {
  return (
    <>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box bg="primary.lighter">
          <Action hasBanner={true} isBlog={true} isLogin={false}/>
          <BlogListView />
          <Divider />
          <BlogFooter />
          <MainFooter />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
    </>
  );
};

export default BlogList;