import MainFooter from "../components/footer";
import Home from "../components/landingPage/Home.jsx";
import { Box,
         ChakraProvider
} from "@chakra-ui/react";
import theme from "../theme/theme.jsx";

function HomePage(){
    return(
        <ChakraProvider theme={theme}>
            <Box>
                <Home />
                <MainFooter/>
            </Box>
        </ChakraProvider>
    )
}

export default HomePage;
