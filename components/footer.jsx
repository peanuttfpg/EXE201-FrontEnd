import React from "react";
import NextLink from "next/link";
import {
  Box,
  ChakraProvider,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Heading,
  IconButton,
  useColorModeValue,
  Image,
  Icon,
} from "@chakra-ui/react";
import logo from "../public/assets/images/logo.png";


const Logo = () => <Image alt="logo" src={logo.src} width="58px" heigth="92px" />;

const Links = [
  { name: "Trang chủ", href: "/" },
  { name: "Cửa Hàng", href: "/shop" },
  { name: "Blog", href: "/blog" },
];

const FootLink = () => {
    return Links.map((link) => (
        <NextLink
          key={link.name}
          color={"primary.main"}
          fontSize="1.3rem"
          _hover={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "bold",
          }}
          _focus={{ boxShadow: "none" }}
          width="8rem"
          pl={{ xs: "1rem", lg: 0 }}
          href={link.href}
        >
          {link.name}
        </NextLink>
    ));
  };

  
export default function MainFooter() {
    return (
      <Box
        bg={"primary.dark"}
        color={useColorModeValue("primary.main.700", "primary.main.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            templateColumns={{
              md: "2fr 2fr 2fr 0fr",
            }}
            spacing={"2rem"}
          >
            <Stack>
              <Box display={{ xs: "flex", md: "block" }} alignItems="center">
                <Logo />
                <Heading
                  pl={{ xs: "1rem", md: "0.5rem" }}
                  color={"primary.main"}
                  fontFamily="Inter"
                  fontSize={{
                    xs: "1rem",
                    md: "2.5rem",
                    lg: "2rem",
                  }}
                >
                  GenZ Pets <br />
                </Heading>
              </Box>
            </Stack>
  
            <Stack
              align={"flex-start"}
              justifyContent="center"
              mt={{ md: "3rem" }}
              display={{ xs: "none", md: "flex" }}
            >
              <FootLink />
            </Stack>
  
            <Stack
              mt={{ md: "3rem" }}
              color="text"
              display={{ xs: "none", md: "flex" }}
            >
              <Box
                fontWeight={"500"}
                fontSize={{ xs: "1rem", md: "1.3rem" }}
                mb={2}
              >
                <Text> Mạng xã hội :</Text>
                <Link
                  textDecoration={"underline"}
                  href="https://www.facebook.com/profile.php?id=100092486456384"
                >
                  https://www.facebook.com/genzpets
                </Link>
              </Box>
            </Stack>
  
            {/* Mobile display */}
            <Box display={{ xs: "block", md: "none" }} color="primary.main">
              <SimpleGrid
                templateColumns={{
                  xs: "1fr 1fr",
                }}
                //spacing={"2rem"}
              >
                <Stack
                  align={"flex-start"}
                  justifyContent="center"
                  mt={{ md: "3rem" }}
                >
                  <FootLink />
                </Stack>
  
                <Box
                  fontWeight={"500"}
                  fontSize={{ xs: "1rem", md: "1.3rem" }}
                  //maxW="13rem"
                >
                  <Text pb="1rem"> Mạng xã hội :</Text>
                  <Link
                    textDecoration={"underline"}
                    href="https://www.facebook.com/profile.php?id=100092486456384"
                  >
                    https://
                    <br />
                    www.facebook.com/
                    <br />
                    genzpets
                  </Link>
                </Box>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    );
}