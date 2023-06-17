import MainFooter from "../components/footer";
import SplitWithImage from "../components/landingPage/Home";
import { Box,
         ChakraProvider
} from "@chakra-ui/react";
import theme from "../theme/theme.jsx";
import AuthCheck from "../components/authentication/AuthCheck";
import Action from "../components/nav";

function Home(){
    return(
        <ChakraProvider theme={theme}>
            <Box>
                <AuthCheck>
                    <Action/>
                    <SplitWithImage />
                    <MainFooter/>
                </AuthCheck>
            </Box>
        </ChakraProvider>
    )
}

export default Home;
