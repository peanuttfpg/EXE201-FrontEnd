import { request } from "./util";
       

export const getAllBlogsPaths = (params) =>
  request
    .get("/blog/getAll", {
      ...params,
    })
    .then((res) => res.data.data.map(({ postId }) => postId));

export const getAllBlogs = () =>
  request.get("/blog/getAll", {}).then((res) => res.data);
