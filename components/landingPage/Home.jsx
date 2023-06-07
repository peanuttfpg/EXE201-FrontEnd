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
import dogBG from "../../public/assets/images/dogbackground.png"

  
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
          <Box  ml={"1rem"} mt="1rem">
            <Box >
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
                  bgColor={"background_main"}
                  color="text"
                  fontSize="15rem"
                  fontFamily="Lato"
                  fontStyle="bold"
                  px="1.5rem"
                  zIndex={0}
                >
                  GenZ PET
                  <br />
                </Text>
                
              </Heading>
              <Image 
                  alt="doggo"
                  src={dogBG.src} 
                  boxSize="450px"
                  mx="auto"
                  my="-8.5rem"
                  width="623px"
                  height="478px"
                  />
              
            </Box>
            <Box background="background_light" my="250px" borderRadius={"50px"}>
            <Heading>
              <Text 
                bgColor={"background_light"} 
                align="center"
                color="text"
                fontSize="2.5rem">
                GenZ PET
              </Text>
            </Heading>
            <Text align="center">
            GenZ Pet là một diễn đàn chủ yếu về thú cưng, nơi chia sẻ, giải đáp và giải trí các vấn đề liên quan đến động vật. <br/>
            Ngoài ra, đây cũng là một thị trường trao đổi mua bán thú cưng và các vật phẩm liên quan. Đặc biệt, chúng mình cung cấp <br/>
            dịch vụ như phòng khám chữa bệnh, chăm sóc sắc đẹp và chăm sóc hộ dành cho thú cưng.
            </Text>
          </Box>
          </Box>
          <Spacer pt={"2rem"} />
          <Spacer display={{ md: "none" }} pt={"7rem"} />
        
          </Flex>
        {/* <Button
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
              </Button> */}
          
      </Box>
    );
  }