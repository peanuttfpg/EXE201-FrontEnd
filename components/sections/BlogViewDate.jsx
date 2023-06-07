import { Flex, HStack, Icon, Text } from "@chakra-ui/react";

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

export const BlogViewsDate = (props) => {
    const [y, m, d, hh, mm, ss, ms] = props.date?.match(/\d+/g);
    const date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
    const formatted = date.toLocaleDateString();
  
    return (
      <HStack
        marginTop="2"
        spacing={"0.5rem"}
        display="flex"
        alignItems="center"
        color={props.color}
        fontSize={{ xs: "0.7rem", sm: "0.8rem", md: "1rem", lg: "1rem" }}
        pt={{ md: "1rem" }}
        py={{ sm: "0.5rem", lg: 0 }}
        opacity="0.8"
      >
        <Flex alignItems="center" minW={"1rem"}>
          <CircleIcon boxSize={{ xs: 1, md: 2, lg: 3 }} />
          <Text fontWeight="medium" px={2}>
            {props.viewnums}
          </Text>
        </Flex>
        <Flex alignItems="center" display={props.isList ? "none" : "flex"}>
          <CircleIcon boxSize={{ xs: 1, md: 2, lg: 3 }} />
          <Text fontWeight="medium" px={2}>
            {formatted}
          </Text>
        </Flex>
      </HStack>
    );
  };
  