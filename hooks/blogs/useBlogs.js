import { useQuery } from "react-query";
import { getAllBlogs } from "../../api/blog";

const useBlogs = (params) => {
  const blogs = useQuery(["blogs", params], () => getAllBlogs(params));

  return {
    ...blogs,
    data: blogs.data?.data,
    metadata: blogs.data?.metadata,
  };
};

export default useBlogs;