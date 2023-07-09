import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  Button,
  Wrap,
  WrapItem,
  Flex,
  Divider,
  Container,
  useMediaQuery,
  CircularProgress,
  SimpleGrid 
} from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import useProducts from "@/hooks/product/useProducts";
import useUserContext from "../../hooks/useUserContext";
import { getAuth } from "firebase/auth";
import { Product } from "@/types/product";
import useAuthContext from "@/hooks/useAuthContext";
import { TUser } from "@/types/user";
import useAuthorize from "@/hooks/auth/useAuth";
import ProductDetailModal from "../productDetail/ProductDetailModal";

export default function ProductListView() {
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const { accessToken, user: currentUser } = useUserContext();
    const { user: FbUser, loading} = useAuthContext();
    const { getAllProducts } = useProducts();
    const {authorize} = useAuthorize();
    const [prodData, setData] = useState<Product[] | null>(null);
    const [ bearerToken, setBearerToken] = useState("");

    console.log("Access Token: " + accessToken);

    useEffect(() => {
      const fetchData = async () => {
        const res = await authorize(await FbUser.getIdToken()!);
        if(res.status === 200){
          console.log("Authorized TOKEN :",res.data?.accessToken);
          setBearerToken(res.data?.accessToken);
        }
        const prodRes = await getAllProducts(bearerToken);
        setData(prodRes.content);
      };
  
      fetchData();
      return () => {};
    }, [accessToken]);
    
     
    console.log("Bearer token: " + bearerToken);
    
    
    const isLoading = (prodData == null);

    console.log("Products Result Array :",prodData);
  
    return (
        <Container maxW={"7xl"} pb={{ xs: "3rem", lg: "4rem" }} backgroundColor={"#F7EDE2"}>
          <SimpleGrid columns={3} spacing={4}>
        {isLoading ? (
          <Container sx={{ textAlign: "center" }}>
            <CircularProgress isIndeterminate />
          </Container>
        ) : (prodData && 
          Array.from(prodData).map((value,index) => { 
              return (
                <React.Fragment key={value.id}>
                  {/*Lastest blog */}
                  <Flex 
                  flexDirection= {"row"}
                  alignItems={"flex-start"}
                  mb={4} 
                  p={4}
                  gap= {"100px"}
                  width= {"360px"} 
                  height= {"640.36px"}
                  background= {"#FAF6F6"}
                  boxShadow= {"0px 10px 40px rgba(191, 96, 96, 0.15)"}
                  borderRadius= {"28px"}
                  >
                <ProductDetailModal product={value}>
                  <Box
                    pb={{ lg: "4rem" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box
                      display="flex"
                      flex="1"
                      position="relative"
                      alignItems="center"
                    >
                      <Box
                        zIndex="1"
                        marginTop="5%"
                        overflow="visible"
                        maxHeight={{
                          xs: "14rem",
                          sm: "18rem",
                          lg: "24rem",
                          xl: "27rem",
                        }}
                        maxWidth={{ lg: "32rem", xl: "36rem" }}
                      >
                        <Heading
                        fontSize={{ xs: "1.5rem", md: "1rem" }}
                        marginTop="1"
                        color="primary.darker"
                      >
                        
                          <Link
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            {value.name}
                          </Link>
                        
                      </Heading>
                      <Image src={value.imageUrl} height={"24rem"} width={"32rem"} />
                      <Text
                          fontFamily= {'Lato'}
                          fontStyle= {"normal"}
                          fontWeight= {"700"}
                          fontSize= {"25px"}
                          lineHeight= {"15px"}
                          color= {"#A25F4F"}
                          position={"absolute"}
                          textAlign={"center"}
                          mt={"2rem"}
                        >
                          {value.price}VND
                        </Text>
                      </Box>
  
                      <Box
                        zIndex="2"
                        width="100%"
                        position="absolute"
                        height="100%"
                      ></Box>
                    </Box>
  
                    <Box
                      display="flex"
                      flex="1"
                      flexDirection="row"
                      marginTop={{ xs: "0.5rem", lg: "1rem" }}
                      pl={{ lg: "1rem", xl: "1.5rem" }}
                    >
                      
                      
                      <Box display={{ xs: "none", lg: "block" }} position={"absolute"} mt={"30rem"}>
                        
                      </Box>
                    </Box>
                  </Box>
                  </ProductDetailModal>
                  {/*Lastest blog */}
                  </Flex>
                </React.Fragment>
              );
            })
          )
}
</SimpleGrid>
</Container>
    );
}