import Link from "next/link";
import React from "react";
import {
    Image,
    Heading,
    Box,
    Button,
    Spacer,
    Text,
    Flex,
  } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Action from "../nav";
import { MdTrendingFlat } from "react-icons/md";

  
export default function SplitWithImage() {
    const router = useRouter();
    return (
      <Box background={"background_main"} height={"100vh"}>
        <Action />
        <Flex
          direction={{ base: "column", sm: "column", md: "row" }}
          pl={{ md: "10%" }}
          mt={{ md: "2rem" }}
        >
          <Box ml={"1rem"} mt="1rem">
            <Box>
              <Heading
                color={"text"}
                fontFamily="Inter"
                fontSize={{
                  base: "2.5rem",
                  md: "3rem",
                  lg: "4rem",
                  xl: "4.75rem",
                }}
              >
                <Text
                  as="mark"
                  bgColor={"primary.main"}
                  color="text"
                  px="1.2rem"
                  fontFamily="Inter"
                  borderRadius="56px"
                  fontStyle="italic"
                >
                  GenZ Pets
                  <br />
                </Text>
                <Text ml="0.5rem">
                    Diễn đàn trao đổi, mua bán vật phẩm 
                  <br /> và dịch vụ cho thú cưng
                </Text>
              </Heading>
              <Button
                rightIcon={<MdTrendingFlat />}
                backgroundColor="secondary.main"
                color={"white"}
                width={{ base: "8rem", md: "13rem" }}
                height={{ base: "2.5rem", md: "3rem" }}
                fontFamily="Inter"
                fontSize={{ base: "1rem", md: "1.8rem" }}
                borderRadius="30px"
                my={{ md: "4rem" }}
                _hover={{ opacity: "0.8" }}
                onClick={() => router.push("/blog")}
              >
                <Link href="/blog">Xem Blog</Link>
              </Button>
            </Box>
          </Box>
          <Spacer pt={"2rem"} />
  
          <Box
            height={{ base: "10rem", md: "18rem" }}
            w={{ base: "100%", md: "50%" }}
            left={100}
            backgroundImage={
              "linear-gradient(to right, rgba(198, 246, 213, 0), rgba(198, 246, 213, 1))"
            }
          >
            {/* <Image
              position={"absolute"}
              display={{ base: "none", md: "unset" }}
              top={{ md: "7rem", lg: "5rem" }}
              left={{ base: "20%", md: "55%", lg: "65%", xl: "65%" }}
              h={"auto"}
              w={{ base: "45%", md: "33%", lg: "23%" }}
              src={shipper.src}
              alt={"shipper"}
            /> */}
          </Box>
          <Spacer display={{ md: "none" }} pt={"7rem"} />
        </Flex>
        {/* <Image
          alt={"shipper"}
          display={{ base: "unset", md: "none" }}
          position={{ base: "absolute" }}
          top="16rem"
          left={{ base: "50%", md: "55%", lg: "65%", xl: "65%" }}
          transform="translate(-50%, 0px)"
          h={"auto"}
          minWidth="200px"
          w={{ base: "30%", md: "33%", lg: "30%", xl: "25%" }}
          src={shipper.src}
        /> */}
      </Box>
    );
  }