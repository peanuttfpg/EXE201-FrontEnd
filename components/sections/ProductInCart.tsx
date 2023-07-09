import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, IconButton, Image, Text } from "@chakra-ui/react";

import { IoTrashBinOutline } from "react-icons/io5";
import { CartItem } from "../../types/cart";

interface ProductInCartProps {
  item: CartItem;
  deleteCartItem: Function;
}

export default function ProductInCart({
  item,
  deleteCartItem,
}: ProductInCartProps) {
  return (
    <Box>
      <Box
        width={"100%"}
        display={"flex"}
        paddingY="0.7rem"
        backgroundColor="light"
        alignItems={"center"}
      >
        <Box
          overflow="hidden"
          borderRadius={"1rem"}
          h="4rem"
          w={"5rem"}
          backgroundColor={"gray.200"}
        >
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            objectFit={"cover"}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" width="100%" paddingY={"0.5rem"}>
          <Flex alignItems="center" fontSize={"xl"}>
            <Text w="2.5rem" textAlign={"center"}>
              {item.quantity + " x "}
            </Text>
            <Flex flexDirection={"column"}>
              <Text w="11rem" fontWeight={"semibold"} noOfLines={2}>
                {item.product.name}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            <Text minW="7rem" color="secondary.main" fontSize={"2xl"}>
              {item.product.price.toLocaleString()} đ
            </Text>

            <IconButton
              justifySelf={"flex-end"}
              colorScheme="light"
              color={"red"}
              aria-label="remove-item"
              _hover={{
                boxShadow: "sm",
              }}
              icon={<IoTrashBinOutline size={"1.2rem"} />}
              onClick={() => deleteCartItem(item)}
            />
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
}
