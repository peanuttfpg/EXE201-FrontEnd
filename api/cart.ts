import { Cart, OrderRequest, OrderResponse } from "../types/cart";
import { PostResponse } from "../types/request";
import { request } from "./util";

const prepareOrder = (cartPrepare: OrderRequest,accessToken: string) => {
  return request.post<PostResponse<OrderResponse>>(
    `/order/createOrder`,
    cartPrepare
  );
};

const checkout = (cartOrder: OrderRequest) => {
  return request.post<PostResponse<OrderResponse>>(`/orders`, cartOrder);
};

const cartApi = {
  prepareOrder,
  checkout,
};

export default cartApi;