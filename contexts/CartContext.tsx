import { useDisclosure, useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useState, useEffect } from "react";
import { Cart } from "../types/cart";

export type initialStateProps = {
    cart: Cart;
    SetNewCart: Function;
    isOpen: boolean;
    onOpen: VoidFunction;
    onClose: VoidFunction;
  };
  
  const initialState: initialStateProps = {
    cart: {
      items: [],
      totalItem: 0,
      total: 0,
    },
    SetNewCart: () => {},
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
  };
  
  const CartContext = createContext(initialState);
  
  type CartContextProviderProps = {
    children: ReactNode;
  };
  
  function CartContextProvider({ children }: CartContextProviderProps) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cart, setCart] = useState<Cart>(initialState.cart);
  
    function SetNewCart(newCart: Cart) {
      if (newCart != null)
        setCart({
          items: newCart.items,
          total: 0,
          totalItem: newCart.items?.length,
        });
      else
        setCart({
          items: [],
          total: 0,
          totalItem: 0,
        });
    }
  
    return (
      <CartContext.Provider
        value={{
          cart,
          isOpen,
          SetNewCart,
          onClose,
          onOpen,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
  export { CartContextProvider, CartContext };
  