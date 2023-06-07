import {
    Cart,
    CartItem,
    OrderRequest,
    ProductItem,
  } from "../../types/cart";

  export const mapCartModelToOrderRequest = (
    cartModel: Cart
  ) => {
    let products_list: ProductItem[] = [];
    cartModel.items.forEach((cartItem) => {
      products_list.push(...mapCartItemToProduct(cartItem));
    });
  
    const orderCart: OrderRequest = {
      paymentMethod: 1,
      products_list,
    };
  
    return orderCart;
  };
  
  export const mapCartItemToProduct = (
    cartItem: CartItem,
    parentQuantity: number = 1
  ): ProductItem[] => {
    let products_list: ProductItem[] = [];
  
    let parentItem: ProductItem = {
      master_product: cartItem.product.id,
      quantity: cartItem.quantity * parentQuantity,
      description: "",
    };
    products_list.push(parentItem);
    return products_list;
  };
  

  