import { request } from "./util";
import { Blog } from "../types/blogs";
       

export const getAllBlogs = ( accessToken: string,) : Promise<Blog[]> =>
    request.get('/blog/getAll', {
      headers: {
        authorization: "Bearer " + accessToken,
      }
    }).then((res) => res.data);

const blogApi ={
  getAllBlogs
};

export default blogApi;