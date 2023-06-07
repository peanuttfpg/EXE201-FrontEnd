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
    master_product: number;
    quantity: number;
    description: string;
  }

export interface OrderRequest {
    paymentMethod: number;
    products_list: ProductItem[];
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