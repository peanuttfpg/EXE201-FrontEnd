import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingBasket } from "react-icons/fa";
import logoBean from "../../public/assets/images/logo.png";
import useCartContext from "../../hooks/useCartContext";
import { CartItem, OrderResponse } from "../../types/cart";
import useDeleteCartItem from "../../hooks/cart/useDeleteCartItem";
import useCartPrice from "../../hooks/cart/useCartPrice";
import useUserContext from "@/hooks/useUserContext";
import useAuthContext from "@/hooks/useAuthContext";
import useAuthorize from "@/hooks/auth/useAuth";
import { mapCartModelToOrderRequest } from "../../hooks/cart/helper";
import beanEmpty from "../../public/assets/images/empty.png";
import ProductInCart from "../sections/ProductInCart";
import CartModal from "./CartModal";
import { CustomerInfo } from "../../types/cart";
import PopUpBox from "./CartPayment";

interface CartDrawerProps {
  arrivedTimeRange: string;
  isCartDisable: boolean;
}

export default function CartDrawer({
  arrivedTimeRange,
  isCartDisable,
}: CartDrawerProps) {
  const toast = useToast();
  const cartContext = useCartContext();
  const currentCart = cartContext.cart;
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const totalCurrentCart = currentCart?.items.length;
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartPrepareUrl, setCartPrepareUrl] = useState("");

  useEffect(() => {
    setTotalAmount(0);
    currentCart?.items?.forEach((item) => {
      setTotalAmount(totalAmount + item.product.price);
    }
    )
  }, [currentCart]);

  const {authorize} = useAuthorize();
  const { user: FbUser, loading} = useAuthContext();
  const { accessToken, user: currentUser } = useUserContext();
  const [ bearerToken, setBearerToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await authorize(await FbUser.getIdToken()!);
      if(res.status === 200){
        console.log("Authorized TOKEN :",res.data?.accessToken);
        setBearerToken(res.data?.accessToken);
      }
    };
    fetchData();
    return () => {};
  }, [accessToken]);

  useEffect(() => {
    const FetchData = async () => {
      const res = await useCartPrice(
        mapCartModelToOrderRequest(currentCart),bearerToken
      );
      console.log("Prepared Card :",res);
      setCartPrepareUrl(res?.url);
      console.log(cartPrepareUrl);
    };
    FetchData();
  return () => {};
}, [currentCart,bearerToken]);


  useEffect(() => {
    setTotalCartItems(totalCurrentCart);
  }, [totalCurrentCart]);

  const deleteItem = useDeleteCartItem;

  const handleDeleteCartItem = async (cartItem: CartItem) => {
    try {
      const newCart = deleteItem(cartItem, currentCart);
      await cartContext.SetNewCart(newCart);
      toast({
        title: `Đã xóa ${cartItem.product.name} khỏi giỏ hàng`,
        status: "warning",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };

  const handleClick = ()  => {
    cartContext.onOpen();
    isCartDisable = !isCartDisable;
  };

  const [isPopUpBoxOpen, setIsPopUpBoxOpen] = useState(false);

  const togglePopUpBox = () => {
    setIsPopUpBoxOpen((prevState) => !prevState);
  };

  const handleClosePopup = () => {
    setIsPopUpBoxOpen(false);
  };

  return (
    <Box>
      <Box 
        height={"3rem"} 
        onClick={ handleClick }
        position={"absolute"}
        right={"18rem"}>
        <IconButton
          disabled={isCartDisable}
          
          variant="outline"
          colorScheme="dark"
          aria-label="Giỏ hàng"
          size={"lg"}
          icon={<FaShoppingBasket size={"2rem"} color="#48BB78" />}
        />
        {totalCartItems > 0 && (
          <Circle
            size="20px"
            bg="tomato"
            color="white"
            position={"relative"}
            bottom="55px"
            left="35px"
          >
            {totalCartItems}
          </Circle>
        )}
      </Box>

      <Drawer
        isOpen={cartContext.isOpen}
        placement="right"
        onClose={cartContext.onClose}
        size="sm"
      >
        <DrawerOverlay background={"transparent"} />

        <DrawerContent fontFamily="beanoi">
          <DrawerHeader fontSize={"3xl"}>
            <Flex gap={2}>
              <Image alt="beanoi" src={logoBean.src} w="2.5rem" h="2.5rem" />
              Giỏ hàng
            </Flex>
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody
            fontSize="2xl"
            paddingInlineStart={2}
            paddingInlineEnd={0}
          >
            {totalCartItems > 0 ? (
              currentCart?.items?.map((item, index) => (
                <Box key={index + item.product.id}>
                  <ProductInCart
                    item={item}
                    deleteCartItem={handleDeleteCartItem}
                  />
                  <Divider />
                </Box>
              ))
            ) : (
              <Flex
                w="100%"
                h="100%"
                justifyContent={"center"}
                alignItems="center"
              >
                <Box maxW="50%" textAlign={"center"}>
                  <Text fontSize={"3xl"}>Giỏ hàng trống</Text>
                  <Image
                    loading="lazy"
                    alt={"empty cart"}
                    src={beanEmpty.src}
                    w="100%"
                    h="250px"
                  />
                  <Text>Hãy thêm món bạn thích vào nhé!</Text>
                </Box>
              </Flex>
            )}
          </DrawerBody>
          {totalCartItems > 0 && (
            <Flex
              minHeight={"20vh"}
              flexDirection="column"
              justifyContent={"space-between"}
              padding="1rem"
            >
              {totalAmount>0 ? ( 
                <>
                  <Flex
                    height={"auto"}
                    border={"groove"}
                    borderRadius={8}
                    paddingX="1rem"
                    paddingY="0.5rem"
                    justifyContent={"space-between"}
                    flexDirection="column"
                  >
                    <Box>
                      <Flex justifyContent="space-between" fontSize={"xl"}>
                        <Text>{"Tạm tính:"}</Text>
                        <Text>
                          {totalAmount} VND
                        </Text>
                      </Flex>
                    </Box>
                    <Divider />
                    <Flex
                      justifyContent="space-between"
                      fontSize={"2xl"}
                      fontWeight="bold"
                    >
                      <Text>{"Tổng cộng:"}</Text>
                      <Text>
                        {totalAmount} VND
                      </Text>
                    </Flex>
                  </Flex>
                  {/*  Check out */}
                  <Flex paddingTop="1rem">
                    <CartModal arrivedTimeRange={arrivedTimeRange}>
                      <Button
                        height={"3rem"}
                        variant="outline"
                        color={"light"}
                        backgroundColor="primary.main"
                        colorScheme={"primary.main"}
                        onClick={togglePopUpBox}
                        fontSize="2xl"
                        w="100%"
                      >
                        Đặt ngay!
                      </Button>
                      
                    </CartModal>
                  </Flex>
                  
                </>
              ) : (
                <>
                  <SkeletonText h="20vh" noOfLines={4} spacing="7" mx="1rem" />
                  <Skeleton h="5vh" mx="1rem" mb="2rem" />
                </>
              )}
            </Flex>
          )}
        </DrawerContent>
      </Drawer>
      <PopUpBox isOpen={isPopUpBoxOpen} onClose={handleClosePopup}/>
    </Box>
  );
}
