import { Cart, OrderRequest, OrderResponse } from "../types/cart";
import { PostResponse } from "../types/request";
import { request } from "./util";

// const prepareOrder = (cartPrepare: OrderRequest) => {
//   return beanoiRequest.post<PostResponse<OrderResponse>>(
//     `/orders/prepare`,
//     cartPrepare
//   );
// };

const checkout = (cartOrder: OrderRequest) => {
  return request().post<PostResponse<OrderResponse>>(`/orders`, cartOrder);
};

const cartApi = {
  checkout,
};

export default cartApi;