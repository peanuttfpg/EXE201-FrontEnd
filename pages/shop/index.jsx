import AuthCheck from "../../components/authentication/AuthCheck";
import ShopList from "../../components/productList";
import Action from "../../components/nav";
import { Box } from "@chakra-ui/react";

function Shop() {
  return(
    <Box>
      <AuthCheck>
        <Action hasBanner={true} isBlog={true} isLogin={false} isShop={true} />
        <ShopList />
      </AuthCheck>
    </Box>
  );
}

export default Shop;