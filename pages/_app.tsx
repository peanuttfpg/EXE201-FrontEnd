import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "../contexts/AuthContext";
import { UserContextProvider } from "../contexts/UserContext";
import { Children, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../components/assets/css/font.css";
import theme from "../theme/theme";

const Meta = () => {
  return (
    <head>
      <meta http-equiv="Content-Security-Policy" content="default-src http:;"/>
      <meta property="og:url" content="http://example.com" />
    </head>
  );
}

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: any) {
  return (
    
    <AuthContextProvider>
      <Meta />
      <UserContextProvider>
        
          <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
          </ChakraProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
