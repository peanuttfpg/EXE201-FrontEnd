import cartApi from "../../api/cart";
import useCartContext from "../../hooks/useCartContext";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Cart, OrderRequest } from "../../types/cart";
import { ErrorResponse } from "../../types/response";
import { mapCartModelToOrderRequest } from "./helper";
import { CustomerInfo } from "../../types/cart";

const useCheckout = (currentCart: Cart) => {
  const [errorRes, setErrorRes] = useState<ErrorResponse>();
  const checkOut = useCallback(
    async (
      customer_info: CustomerInfo,
    ) => {
      try {
        const orderCart = mapCartModelToOrderRequest(currentCart,customer_info);
        if (!orderCart) throw Error("Không có sản phẩm trong giỏ hàng");
        const data: OrderRequest = {
          ...orderCart,
        };

        const res = await cartApi.checkout(data);
        console.log(res);

        return res.data;
      } catch (error: any) {
        console.log(`checkout error: `, error.response.data);
        setErrorRes(error.response.data);
      } finally {
      }
    },
    [currentCart]
  );

  return {
    checkOut,
    errorRes,
  };
};
export default useCheckout;
