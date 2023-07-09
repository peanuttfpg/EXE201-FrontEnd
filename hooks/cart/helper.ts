import {
    Cart,
    CartItem,
    OrderRequest,
    ProductItem,
  } from "../../types/cart";
  import { CustomerInfo } from "../../types/cart";

  export const mapCartModelToOrderRequest = (
    cartModel: Cart,
    customerInfo?: CustomerInfo,
  ) => {
    let products_list: ProductItem[] = [];
    cartModel.items.forEach((cartItem) => {
      products_list.push(...mapCartItemToProduct(cartItem));
    });

    let productOrder = {
      order : products_list.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    } 
  
    const orderCart: OrderRequest = {
      paymentMethod: 1,
      cartRequests : productOrder.order,
      address : customerInfo?.email!
    };
  
    return orderCart;
  };
  
  export const mapCartItemToProduct = (
    cartItem: CartItem,
    parentQuantity: number = 1
  ): ProductItem[] => {
    let products_list: ProductItem[] = [];
  
    let parentItem: ProductItem = {
      id: cartItem.product.id,
      quantity: cartItem.quantity * parentQuantity,
      description: cartItem.description,
    };
    products_list.push(parentItem);
    return products_list;
  };
  

  