import React from "react";
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

export default function BlogListView() {
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const { data: posts, isLoading } = useBlogs();
  
    return (
      <Container maxW={"7xl"} pb={{ xs: "3rem", lg: "4rem" }}>
        <Box>
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
        </Box>
        {isLoading ? (
          <Container sx={{ textAlign: "center" }}>
            <CircularProgress isIndeterminate />
          </Container>
        ) : (
          posts?.map((item, index) => {
            if (index == 0)
              return (
                <React.Fragment key={item.postId}>
                  {/*Lastest blog */}
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
                        zIndex="2"
                        marginTop="5%"
                        overflow="hidden"
                        borderRadius={"1rem"}
                        backgroundColor="gray.200"
                        maxHeight={{
                          xs: "14rem",
                          sm: "18rem",
                          lg: "24rem",
                          xl: "27rem",
                        }}
                        maxWidth={{ lg: "32rem", xl: "36rem" }}
                      >
                        <NextLink passHref href={`/blog/${item.postId}`}>
                          <Link
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              objectFit="cover"
                              transform="scale(1.0)"
                              transition="0.3s ease-in-out"
                              _hover={{
                                transform: "scale(1.05)",
                              }}
                            />
                          </Link>
                        </NextLink>
                      </Box>
  
                      <Box
                        zIndex="1"
                        width="100%"
                        position="absolute"
                        height="100%"
                      ></Box>
                    </Box>
  
                    <Box
                      display="flex"
                      flex="1"
                      flexDirection="column"
                      marginTop={{ xs: "0.5rem", lg: "1rem" }}
                      pl={{ lg: "1rem", xl: "1.5rem" }}
                    >
                      <BlogTags
                        tags={item.tags.split(",")}
                        paddingY={{ xs: "0.5rem", md: "1rem" }}
                        size={isDesktop ? "md" : "sm"}
                      />
                      <Heading
                        fontSize={{ xs: "1rem", md: "1.5rem" }}
                        marginTop="2"
                        color="primary.darker"
                      >
                        <NextLink passHref href={`/blog/${item.postId}`}>
                          <Link
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            {item.title}
                          </Link>
                        </NextLink>
                      </Heading>
                      {/* Mobile blogview */}
                      <Box
                        display={{ xs: "block", lg: "none" }}
                        py={{ xs: "0.3rem", md: "0.5rem" }}
                      >
                        <BlogViewsDate
                          viewnums={"10 luot xem"}
                          date={item.createDate}
                          color="gray.500"
                        />
                      </Box>
                      {/* Mobile blogview */}
                      <Text
                        color="gray.700"
                        fontSize={{ xs: "0.8rem", md: "1rem" }}
                        noOfLines={3}
                        dangerouslySetInnerHTML={{ __html: item.sapo }}
                      />
                      <Box display={{ xs: "none", lg: "block" }}>
                        <BlogViewsDate
                          viewnums={"10 luot xem"}
                          date={item.createDate}
                          color="gray.500"
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/*Lastest blog */}
                </React.Fragment>
              );
          })
        )}
  
        <Wrap
          pt={{ xs: "1rem", lg: 0 }}
          justify={{ lg: "space-between" }}
          direction={{ xs: "column", lg: "row" }}
          spacing="1rem"
        >
          {/*Others blog */}
          {posts?.slice(12, 15).map((item, index) => {
            if (index > 0)
              return (
                <React.Fragment key={item.postId}>
                  <Divider
                    borderColor="black"
                    variant="solid"
                    display={{ xs: "flex", lg: "none" }}
                  />
                  <WrapItem width={{ xs: "100%", lg: "48%" }}>
                    <Box w={"100%"} display={{ xs: "flex", lg: "block" }}>
                      <NextLink passHref href={`/blog/${item.postId}`}>
                        <Link _hover={{ textDecoration: "none" }}>
                          <Box
                            overflow="hidden"
                            borderRadius={"1rem"}
                            maxHeight={{
                              xs: "5rem",
                              sm: "6rem",
                              xl: "27rem",
                            }}
                            minHeight={{
                              xs: "5rem",
                              sm: "6rem",
                              lg: "24rem",
                              xl: "27rem",
                            }}
                            minWidth={{
                              xs: "7rem",
                              sm: "9rem",
                              lg: "30rem",
                              xl: "36rem",
                            }}
                            maxWidth={{
                              xs: "7rem",
                              sm: "9rem",
                              lg: "36rem",
                            }}
                            backgroundColor={"gray.200"}
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              objectFit={"cover"}
                              transform="scale(1.0)"
                              transition="0.3s ease-in-out"
                              _hover={{
                                transform: "scale(1.05)",
                              }}
                            />
                          </Box>
                        </Link>
                      </NextLink>
  
                      {/* Mobile title & views */}
                      <Box
                        display={{ xs: "block", lg: "none" }}
                        pl="2rem"
                        maxW="50vw"
                      >
                        <Heading
                          color="primary.darker"
                          fontSize={{
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          }}
                        >
                          <NextLink passHref href={`/blog/${item.postId}`}>
                            <Link _hover={{ textDecoration: "none" }}>
                              {item.title}
                            </Link>
                          </NextLink>
                        </Heading>
                        <BlogViewsDate
                          isList={true}
                          viewnums={"10 luot xem"}
                          date={item.createDate}
                          color="gray.500"
                        />
                      </Box>
                      {/*  Mobile title & views */}
  
                      <Box display={{ xs: "none", lg: "block" }}>
                        <BlogTags tags={item.tags.split(",")} paddingY="1rem" />
                        <Heading
                          fontSize="1.5rem"
                          marginY="0.5rem"
                          color="primary.darker"
                        >
                          <NextLink passHref href={`/blog/${item.postId}`}>
                            <Link _hover={{ textDecoration: "none" }}>
                              {item.title}
                            </Link>
                          </NextLink>
                        </Heading>
                        <BlogViewsDate
                          viewnums={"10 luot xem"}
                          date={item.createDate}
                          color="gray.500"
                        />
                        <Text
                          fontSize="1rem"
                          display={{ xs: "none", lg: "-webkit-box" }}
                          noOfLines={3}
                          dangerouslySetInnerHTML={{ __html: item.sapo }}
                        />
                      </Box>
                    </Box>
                  </WrapItem>
                </React.Fragment>
              );
          })}
          {/*Others blog */}
          <Box
            alignSelf="center"
            pt="1rem"
            display={{ xs: "block", lg: "none" }}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _active={{
              transform: "scale(1.05)",
            }}
          >
            <Button
              variant="outline"
              colorScheme="primary.darker"
              color="primary.darker"
              borderRadius={"2rem"}
            >
              <Text pr={"0.2rem"} fontWeight="bold">
                Xem thêm
              </Text>
              <BsArrowRight size="1.5rem" />
            </Button>
          </Box>
        </Wrap>
      </Container>
    );
  }