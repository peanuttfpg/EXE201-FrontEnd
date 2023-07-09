import { Box, useToast } from "@chakra-ui/react";
import useAddCartItem from "../../hooks/cart/useAddCartItem";
import useCartContext from "../../hooks/useCartContext";
import { useState } from "react";
import { Cart, CartItem } from "../../types/cart";
import {  Product } from "../../types/product";

interface AddToCartWrapperProps {
  product: Product;
  quantity?: number;
  size?: string;
  children: any;
}
export default function AddToCartWrapper({
  product,
  quantity,
  size,
  children,
}: AddToCartWrapperProps) {
  const toast = useToast();
  const cartContext = useCartContext();
  const currentCart = cartContext.cart;
  const addItem = useAddCartItem;

  const handleAddCartItem = async () => {
    const cartItem: CartItem = {
      quantity: quantity ?? 1,
      description: "",
      product: product,
    };

    try {
      const newCart = addItem(cartItem, currentCart, size);
      await cartContext.SetNewCart(newCart);
      //}
      toast({
        title: `Đã thêm vào giỏ hàng`,
        status: "success",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra ${error}`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 10000,
      });
    }
  };

  return <Box onClick={handleAddCartItem}>{children}</Box>;
}
