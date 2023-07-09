import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  Image,
  SimpleGrid,
  Flex,
  VStack,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Product } from "../../types/product";
import AddToCartWrapper from "../cart/AddToCartWrapper";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {

  return (
    <SimpleGrid columns={2} spacing={10} py={10}>
      <Flex>
        <Image
          rounded={"md"}
          alt={product.name}
          src={product?.imageUrl}
          objectFit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ md: "300px", lg: "500px" }}
          //fallbackSrc={NoImage.src}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }} justifyContent="space-between">
        <Flex flexDirection={"column"} gap={10}>
          <Heading lineHeight={1.1} fontWeight={"semibold"} fontSize={"3xl"}>
            {product?.name}
          </Heading>
          <Text color={"secondary.main"} fontWeight={"bold"} fontSize={"3xl"}>
            {product.price.toLocaleString()}VND
          </Text>

          <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
            <VStack spacing={{ base: 4, sm: 6 }}></VStack>
            {product.productDetail.description && (
              <Box>
                <Text fontSize={"xl"} fontWeight={"semibold"} mb={"4"}>
                  Mô tả:
                </Text>
                <Text fontSize={"xl"} mb={"4"}>
                  {product.productDetail.description}
                </Text>
              </Box>
            )}
            </Stack>

          {product.price == 6 && (
            <Flex direction={"column"} gap={3}>
              <Text fontSize={"xl"} fontWeight="semibold">
                Chọn size:
              </Text>
              <RadioGroup
                value={product.productDetail.size!}
                size="lg"
                colorScheme={"green"}
                color={"secondary.main"}
              >
                <Stack direction="row">
                  {product.productDetail &&
                    product.productDetail.size &&
                    product.productDetail.size.split(",").map((size, index) => (
                      <Radio key={index} value={size}>
                        <Text fontSize={"xl"}>{"Size " + size}</Text>
                      </Radio>
                    ))}
                </Stack>
              </RadioGroup>
            </Flex>
          )}
        </Flex>
        <AddToCartWrapper
          size={product.productDetail.size!}
          product={product}
        >
          <Button
            w={"full"}
            mt={8}
            size={"lg"}
            bg={"primary.main"}
            color={"light"}
            //textTransform={"uppercase"}
            _hover={{
              boxShadow: "lg",
            }}
          >
            Thêm vào giỏ
          </Button>
        </AddToCartWrapper>
      </Stack>
    </SimpleGrid>
  );
}
