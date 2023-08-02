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
    return res.data;
  } catch (error) {
    throw new Error("Lỗi khi kiểm tra đơn hàng!");
  }
};

const useCartPrice = async (cartRequest: OrderRequest,accessToken: string) => {
  try { 
    console.log("Order request: " + cartRequest);
    const res = await cartApi.prepareOrder(cartRequest,accessToken);
    console.log("Returned result : " + res);
    return res;
  } catch (error) {
    console.log("ERROR FROM CODE : ",error);
  }
};

export default useCartPrice;
