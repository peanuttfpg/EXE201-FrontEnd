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
  invoice_id: string;
  order_id: number;
  total_amount: number;
  final_amount: number;
  discount: number;
  receive_bean: number;
  order_status: number;
  check_in_date: Date;
}

export interface CustomerInfo{
  name: string;
  phone: string;
  email: string;
}