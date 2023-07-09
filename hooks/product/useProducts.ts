import { useQuery } from "react-query";
import productApi from "@/api/product";

const useProducts = () => {
  const getAllProducts = async (accessToken: string) => {
    const res = await productApi.getAllProducts(accessToken);
    return res;
  };
  return {
    getAllProducts
  };
};

export default useProducts;