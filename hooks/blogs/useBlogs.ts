import { useQuery } from "react-query";
import blogApi from "../../api/blog";

const useBlogs = () => {
  const getAllBlogs = async (accessToken: string) => {
    const res = await blogApi.getAllBlogs(accessToken);
    return res;
  };
  return {
    getAllBlogs
  };
};

export default useBlogs;