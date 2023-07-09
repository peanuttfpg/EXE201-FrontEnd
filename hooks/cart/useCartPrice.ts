import cartApi from "../../api/cart";
import { OrderRequest } from "../../types/cart";
import { useQuery } from "react-query";

type CartItemPrepare = {
  id: string | number;
  quantity: number;
  price?: number;
};

type CartPriceProps = {
  cartItems: CartItemPrepare[];
  vouchers?: string[];
};

const prepareCart = async (cartPrepare: OrderRequest, accessToken: string) => {
  try {
    const res = await cartApi.prepareOrder(cartPrepare,accessToken);
    return res.data.data;
  } catch (error) {
    throw new Error("Lỗi khi kiểm tra đơn hàng!");
  }
};

const useCartPrice = (cartRequest: OrderRequest | null,accessToken: string) => {
  return useQuery(
    ["orders/create", cartRequest ?? []],
    () => {
      return prepareCart(cartRequest!,accessToken);
    },
    {
      enabled:
        Boolean(cartRequest) && Boolean(cartRequest?.cartRequests?.length),
      retry: 5,
    }
  );
};

export default useCartPrice;
