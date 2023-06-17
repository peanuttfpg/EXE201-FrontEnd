import React from "react";
//chakraui
import { Box, Heading, Container, Flex } from "@chakra-ui/react";

import { BsFillHeartFill } from "react-icons/bs";
//others

const BlogFooter = () => {
  return (
    <Box
      pt={{ xs: "0.5rem", lg: "0" }}
      backgroundColor="primary.darker"
      color="secondary.main"
      borderRadius={{ xs: "1.5rem", lg: "3rem" }}
      boxShadow="0.5px 1px 10px 1px  black inset"
    >
      <Container maxW={"8xl"}>
        <Flex
          alignItems="center"
          pl={{ xs: "1rem", xl: "4.5rem" }}
          py={{ xs: "0", lg: "2rem" }}
        >
          <BsFillHeartFill size="1.2rem" />
          <Heading
            color="#FFFFFF"
            fontWeight="bold"
            pl={{ xs: "0.5rem", lg: "1rem" }}
            py={{ xs: "1rem", lg: "1rem" }}
            fontSize={{ xs: "1.5rem", lg: "2rem" }}
            lineHeight="40px"
          >
            Tin xem nhiều
          </Heading>
        </Flex>

      </Container>
    </Box>
  );
};

export default BlogFooter;
