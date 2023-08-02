import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import useAuthContext from "../hooks/useAuthContext";
import useUserContext from "../hooks/useUserContext";
import { AuthContextProvider } from "../contexts/AuthContext";
//chakra ui
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Link,
  Button,
  Stack,
  Image,
  Container,
  Spacer,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";

//firebase
import Firebase from "../firebase/firebase";

//icons & images
import { BsHeadphones } from "react-icons/bs";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import logo from "../public/assets/images/logo.png";
import whiteLogo from "../public/assets/images/logo.png";

import { useRouter } from "next/router";
//import Button0 from "./nav.style";
import { Button0, IconButton0 } from "./nav.style";
import CarouselNoArrow from "./carousel/CarouselNoArrow";
import CartDrawer from "./cart/CartDrawer";

const Links = [
  { name: "Trang chủ", href: "/" },
  { name: "Cửa Hàng", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Admin", href: "/admin" },
];


const SignOutButton = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user); // Update the sign-in state
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    Firebase.auth().signOut()
      .then(() => {
        console.log('Sign-out successful');
      })
      .catch((error) => {
        console.log('An error occurred while signing out:', error);
      });
  };

  return (
    <>
      {isSignedIn ? (
        <Button onClick={handleSignOut}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="1000"
        fontSize="1.4rem"
        align="center"
        pl="1.5rem"
        ml="8rem">
            Sign Out
        </Button> 
      ) : (
        <> </>
      )}
    </>
  );
};

const NavLink = () => {
  const router = useRouter();
  const pathname = router.pathname;
  
  return Links.map((link) => (
      <Link
        key={link.name}
        align="left"
        color={{
          xs:
            pathname == link.href ||
            (pathname.includes(link.href) && link.href != "/")
              ? "secondary.main"
              : "light",
          lg:
            pathname == link.href ||
            (pathname.includes(link.href) && link.href != "/")
              ? "primary.main"
              : "gray.500",
        }}
        fontWeight={pathname == link.href ? "bold" : "none"}
        fontSize="1.3rem"
        _hover={{
          textDecoration: "none",
          color: {
            xs:
              pathname == link.href || pathname.includes(link.href)
                ? "secondary.main"
                : "primary.main",
            lg: "primary.main",
          },
          fontWeight: "bold",
        }}
        _focus={{ boxShadow: "none" }}
        width="8rem"
        pl={{ xs: "1rem", lg: 0 }}
        href={link.href}
      >
        {link.name}
      </Link>
  ));
};

const navVariants = {
  opened: {
    display: "flex",
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },

  closed: {
    display: "none",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

//#region dates
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
const currentTime =
  currentDate.getDate() +
  " Tháng " +
  currentMonth +
  ", " +
  currentDate.getFullYear();
const weekday = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];


let dayName = weekday[currentDate.getDay()];
//#endregion

const Logo = () => <Image alt={"logo"} src={logo.src} width="58px" height="62px"/>;
const WhiteLogo = () => <Image alt={"whiteLogo"} src={whiteLogo.src} width="58px" height="82px"/>;

export default function Action(props) {
  const { user, loading } = useAuthContext();
  const toast = useToast();
  const { accessToken, user: currentUser } = useUserContext();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartDisable, setIsCartDisable] = useState(false);
  const [arrivedTimeRange, setArrivedTimeRange] = useState("");

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        px={{ lg: "10%" }}
        py={{ lg: "1.5rem" }}
        background={{ xs: "light", lg: "transparent" }}
      >
        {/*Mobile Ask and Date */}
        <Box
          display={{ xs: props.isBlog ? "flex" : "none", lg: "none" }}
          flexDirection={"row"}
          py={"0.8rem"}
          color="primary.dark"
          backgroundColor={"secondary.lighter"}
        >
          <Box
            flex="1"
            fontSize="1rem"
            alignItems="center"
            justifyContent={"space-between"}
            display="flex"
            px={{ xs: "1.3rem", md: "1rem" }}
          >
            <Flex alignItems="center">
              <BsHeadphones size="1.1rem" />
              <Link display="flex">
                <Text fontSize={{ xs: "xs", md: "sm" }} fontWeight="medium">
                  Hỏi đáp
                </Text>
              </Link>
            </Flex>

            <Text fontSize={{ xs: "xs", md: "sm" }}>
              {dayName}, {currentTime}
            </Text>
          </Box>
        </Box>

        <Flex alignItems="center" py={{ xs: "0.5rem", lg: "0" }}>
          
          <Stack
            bgColor="#FFFFFF"
            borderRadius="40px"
            width="1880px"
            display={{ base: "none", md: "flex" }}
          >
            <Box
              backgroundColor="light"
              borderRadius={"2rem"}
              borderStyle="solid"
              borderColor="inherit"
              as={"nav"}
              display={{ base: "flex", xs: "none", lg: "flex" }}
              px={{ lg: "1rem", xl: "5rem" }}
              height={"4rem"}
              alignItems="center"
              textAlign="left"
            >
              <NavLink  />
              <Button0
                  leftIcon={<Logo />}
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="1000"
                  fontSize="1.4rem"
                  align="center"
                  pl="8rem"
                  onClick={() => router.push("/")}
              />
            <div style ={{ visibility: props.isLogin ? "hidden" : "visible" }}>
          <CartDrawer
            isCartDisable={isCartDisable}
            arrivedTimeRange={arrivedTimeRange}
          />
            <>
            <Avatar
            size="md"
            ml="400px"
            src={user ? user.photoURL : ""} // Replace with the actual URL of the user's image
            onClick={handleClick}
          />
          
          {/* Pop Up Button   */}

          <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Avatar 
                size="2xl"
                align="center"
                ml="8rem"
                src={user ? user.photoURL : ""}/>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {user ? 
                      <>
                        <Text align="center" fontWeight={"bold"}>
                          {user?.displayName}
                          
                        </Text>
                        <Text align="center">
                          {user?.email}
                          </Text>
                        <SignOutButton/>
                      </>
                      :
                      <Button
                      leftIcon={<FaGoogle/>}
                      onClick={() => router.push("../authentication")}
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="1000"
                      fontSize="1.4rem"
                      align="center"
                      pl="1.5rem"
                      ml="8rem">
                          Sign In
                      </Button>
                }
              </ModalBody>
            </ModalContent>
          </Modal>
          </>
            </div>
            </Box>
          </Stack>
          <Spacer />
        </Flex>

        {/* Mobile Search */}
        <motion.div
          initial={"closed"}
          variants={navVariants}
          animate={searchOpen ? "opened" : "closed"}
        >
          <InputGroup my="0.5rem" display={{ xs: "flex", lg: "none" }}>
            <InputRightElement>
              <SearchIcon color="grey" />
            </InputRightElement>
            <Input
              fontSize={"1rem"}
              bg="light"
              variant="outline"
              placeholder="Nhập nội dung tìm kiếm"
            />
          </InputGroup>
        </motion.div>

        {/*Display open menu button on mobile */}
        <motion.div
          initial={"closed"}
          variants={navVariants}
          animate={menuOpen ? "opened" : "closed"}
        >
          <Box
            w="100vw"
            h="100vh"
            bgColor="#25855A"
            zIndex={20}
            pos="fixed"
            top="0"
            left="0"
            overflow="auto"
            flexDir="column"
            display={"inherit"}
          >
            <Flex align="center" justify="space-between">
              <Button
                leftIcon={<WhiteLogo />}
                bgColor={"transparent"}
                _hover={{ bg: "transparent" }}
                _active={{
                  bg: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                color="light"
                fontFamily="Gotham"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="1.5rem"
              >
                Bean Oi
              </Button>

              <IconButton0
                my={props.isBlog ? "3rem" : "0.3rem"}
                mr={{ xs: "0.3rem" }}
                color="light"
                aria-label="Close Menu"
                size="lg"
                fontSize="1.3rem"
                icon={<CloseIcon />}
                onClick={() => setMenuOpen((state) => !state)}
                variant="ghost"
                _hover={{ background: "transparent" }}
                _active={{ background: "transparent" }}
              />
            </Flex>

            <Flex flexDir="column" align="center">
              <Stack
                borderRadius="30px"
                pt={"5rem"}
                display={{ base: "flex", lg: "none" }}
                w="100vw"
                align="flex-start"
              >
                <NavLink />
              </Stack>
            </Flex>
          </Box>
        </motion.div>
      </Box>

      {/* Carousel banner */}
      <Box display={props.hasBanner ? "flex" : "none"}>
        <CarouselNoArrow />
      </Box>
      {/* Desktop Search, Ask and Date */}
      <Container
        maxW={"7xl"}
        alignItems={"center"}
        display={{ xs: "none", lg: props.isBlog ? "flex" : "none" }}
        justifyContent={"space-between"}
        flexDirection={"row"}
        py={"2rem"}
        color="primary.main"
      >
        <Box flex={"1.5"} pr="2rem">
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="#5C5F62" />
            </InputLeftElement>
            <Input
              fontSize={"1rem"}
              bg="light"
              variant="outline"
              placeholder="Nhập nội dung tìm kiếm"
            />
          </InputGroup>
        </Box>
        <Box
          flex="1"
          fontSize="1rem"
          justifyContent={"space-between"}
          display="flex"
        >
          <Flex pl="2rem">
            <BsHeadphones size="1.5rem" />
            <Link display="flex">
              <Text px={2} fontWeight="medium">
                Hỏi đáp
              </Text>
            </Link>
          </Flex>

          <Text size="sm">
            {dayName}, {currentTime}
          </Text>
        </Box>
      </Container>
    </>
  );
}
