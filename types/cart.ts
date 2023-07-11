import { Product } from "./product";

export interface Cart {
    items: CartItem[];
    totalItem: number;
    total: number;
  };

export type CartItem = {
    product: Product;
    quantity: number;
    description: string;
};

export interface ProductItem {
    id: number;
    quantity: number;
    description: string;
  }

export interface OrderRequest {
    address: string;
    paymentMethod: number;
    cartRequests: {
      productId: number;
      quantity: number;
    }[];
}

export interface OrderResponse {
  status: string;
  message: string;
  url: string;
  method: string;
}

export interface CustomerInfo{
  name: string;
  phone: string;
  email: string;
}