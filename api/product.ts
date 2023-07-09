import { request } from "./util";
import { Product } from "@/types/product";
       

export const getAllProducts = ( accessToken: string,) : Promise<Product[]> =>
    request.get('/product/getAll', {
      headers: {
        authorization: "Bearer " + accessToken,
      }
    }).then((res) => res.data);

const productApi ={
  getAllProducts
};

export default productApi;