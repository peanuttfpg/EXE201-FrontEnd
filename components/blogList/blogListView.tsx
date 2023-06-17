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
} from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BlogViewsDate } from "../sections/BlogViewDate";
import { BlogTags } from "../sections/BlogTags";
import useBlogs from "../../hooks/blogs/useBlogs";
import useUserContext from "../../hooks/useUserContext";
import { getAuth } from "firebase/auth";
import { Blog } from "@/types/blogs";
import useAuthContext from "@/hooks/useAuthContext";
import { TUser } from "@/types/user";
import useAuthorize from "@/hooks/auth/useAuth";

export default function BlogListView() {
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const { accessToken, user: currentUser } = useUserContext();
    const { user: FbUser, loading} = useAuthContext();
    const { getAllBlogs } = useBlogs();
    const {authorize} = useAuthorize();
    const [blogData, setData] = useState<Blog[] | null>(null);
    const [ bearerToken, setBearerToken] = useState("");

    console.log("Access Token: " + accessToken);

    useEffect(() => {
      const fetchData = async () => {
        const res = await authorize(await FbUser.getIdToken()!);
        if(res.status === 200){
          console.log("Authorized TOKEN :",res.data?.accessToken);
          setBearerToken(res.data?.accessToken);
        }
        const blogres = await getAllBlogs(bearerToken);
        setData(blogres.content);
      };
  
      fetchData();
      return () => {};
    }, [accessToken]);
    
     
    console.log("Bearer token: " + bearerToken);
    
    
    const isLoading = (blogData == null);

    console.log("Blogs Array :",blogData);
  
    return (
      <Container maxW={"7xl"} pb={{ xs: "3rem", lg: "4rem" }} backgroundColor={"#F7EDE2"}>
        {/* <Box>
          <Flex justifyContent={"space-between"} pt={"1rem"}>
            <Flex alignItems="center" color="secondary.main">
              <FaFire size="2rem" />
              <Heading
                as="h2"
                pl={2}
                color="primary.darker"
                fontSize={{ xs: "1.5rem", lg: "2rem" }}
              >
                Mới nhất
              </Heading>
            </Flex>
          </Flex>
        </Box> */}
        {isLoading ? (
          <Container sx={{ textAlign: "center" }}>
            <CircularProgress isIndeterminate />
          </Container>
        ) : (blogData && 
          Array.from(blogData).map((value,index) => {
              return (
                <React.Fragment key={value.id}>
                  {/*Lastest blog */}
                  <Flex 
                  flexDirection= {"column"}
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
                  <Box
                    pb={{ lg: "4rem" }}
                    display="flex"
                    flexDirection={{ xs: "column", lg: "row" }}
                    justifyContent="space-between"
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
                        overflow="hidden"
                        maxHeight={{
                          xs: "14rem",
                          sm: "18rem",
                          lg: "24rem",
                          xl: "27rem",
                        }}
                        maxWidth={{ lg: "32rem", xl: "36rem" }}
                      >
                        <Heading
                        fontSize={{ xs: "3rem", md: "2rem" }}
                        marginTop="1"
                        color="primary.darker"
                      >
                        <NextLink passHref href={`/blog/${value.id}`}>
                          <Link
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            {value.title}
                          </Link>
                        </NextLink>
                      </Heading>
                        <Text
                          fontFamily= {'Lato'}
                          fontStyle= {"normal"}
                          fontWeight= {"700"}
                          fontSize= {"12px"}
                          lineHeight= {"15px"}
                          color= {"#A25F4F"}
                          position={"absolute"}
                          mt={"25rem"}
                        >
                          {value.content}
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
                        <BlogViewsDate
                          viewnums={"10 luot xem"}
                          date={value.publicDate}
                          color="gray.500"
                        />
                        <BlogTags
                        tags={value.title.split(",")}
                        paddingY={{ xs: "0.5rem", md: "1rem" }}
                        size={isDesktop ? "md" : "sm"}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/*Lastest blog */}
                  </Flex>
                </React.Fragment>
              );
            })
          )
}
</Container>
  );
}