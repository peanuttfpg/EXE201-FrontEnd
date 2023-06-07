import React from "react";
import { Cart, CartItem } from "../../types/cart";

const useAddCartItem = (
  cartItem: CartItem,
  currentCart: Cart,
  size?: string,
) => {
  const cartItems = currentCart?.items ?? [];
  let addedItem: CartItem = cartItem;

  // find index to check
  const updateIndex = cartItems.findIndex(
    (item) =>
      item.product.id === addedItem.product.id 
  );

  // cartItems.findIndex((item, index) =>
  //   console.log(
  //     "at index: " +
  //       index +
  //       " " +
  //       (item.product.product_id === addedItem.product.product_id &&
  //         item.product_extras?.every((e) => e.product_id) ===
  //           addedItem.product_extras?.every((e) => e.product_id))
  //   )
  // );

  // more than -1 means existed then update quantity or else push to array
  if (updateIndex > -1) {
    const updateItem = cartItems[updateIndex];
    cartItems[updateIndex] = {
      ...cartItems[updateIndex],
      quantity: addedItem.quantity + updateItem.quantity,
    };
  } else {
    cartItems.push(addedItem);
  }
  const newCart: Cart = { items: cartItems, total: 0, totalItem: 0 };
  return newCart;
};

export default useAddCartItem;
