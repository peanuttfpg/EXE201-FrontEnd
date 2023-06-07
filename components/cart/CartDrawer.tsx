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
import logo from "../../public/assets/image/logo.png";
import useCartContext from "../../hooks/useCartContext";
import { CartItem } from "../../types/cart";
