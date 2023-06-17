import AuthCheck from "../../components/authentication/AuthCheck";
import BlogList from "../../components/blogList";
import Action from "../../components/nav";
import { Box } from "@chakra-ui/react";

function Blog() {
  return(
    <Box>
      <AuthCheck>
        <Action hasBanner={true} isBlog={true} isLogin={false}/>
        <BlogList />
      </AuthCheck>
    </Box>
  );
}

export default Blog;
