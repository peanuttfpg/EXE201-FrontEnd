import { HStack, Link, Tag, Text, useMediaQuery } from "@chakra-ui/react";

export const BlogTags = (props) => {
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");

  return (
    <HStack spacing={"1.2rem"} paddingY={props.paddingY}>
      {props.tags?.map((tag, index) => {
        //Display only two tags for mobile
        if (!isDesktop && index < 2)
          return (
            <Tag
              size={props.size}
              variant="solid"
              backgroundColor="#F5B340"
              key={tag}
              borderRadius="1rem"
            >
              <Link _hover={{ textDecoration: "none" }}>
                <Text>#{tag}</Text>
              </Link>
            </Tag>
          );
        //Display all tags for desktop
        if (isDesktop)
          return (
            <Tag
              size={props.size}
              variant="solid"
              backgroundColor="#F5B340"
              key={tag}
              borderRadius="1rem"
            >
              <Link _hover={{ textDecoration: "none" }}>
                <Text>#{tag}</Text>
              </Link>
            </Tag>
          );
      })}
    </HStack>
  );
};
