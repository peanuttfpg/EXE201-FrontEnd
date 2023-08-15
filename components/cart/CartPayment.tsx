import React, { useState, useEffect } from "react";
import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import Momo from "../../public/assets/images/Momo.png";

const PopUpBox = ({ onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      
        const timer = setTimeout(() => {
          if(!showSuccess) {
            setShowSuccess(true);
          } else {
            setOpen(false);
            onClose();
          }
        }, 5000);
      
      return () => clearTimeout(timer);
    }
    }
  , [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
  <>
    {isOpen && (
    <Box
      pos="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display={isOpen ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      bg="rgba(0, 0, 0, 0.7)"
    >
      <Box
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="750px"
      >
      {showSuccess ? (
        <Box
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="200px"
        height="200px"
      >
        {(isOpen && (showSuccess == true)) && 
        toast({
          title: "Thanh toán đơn hàng thành công!",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        })}
        <Text
          fontFamily= {'Lato'}
          fontStyle= {"normal"}
          fontWeight= {"700"}
          fontSize= {"25px"}
          lineHeight= {"15px"}
          color= {"#A25F4F"}
          position={"absolute"}
          textAlign={"center"}
          mb={"7rem"}
        >
          THANH TOÁN THÀNH CÔNG!
        </Text>
        <Button 
          variant="outline" 
          colorScheme="blue" 
          mt={"5rem"}
          onClick={ handleClose}>
            
            Close
        </Button>
        </Box>
      ) : (
        <Image
        src={Momo.src}
        alt="Momo QR"
        borderRadius="md"
        mb={4}
        width={"50rem"}
        height={"45rem"}
      />
      )}
    </Box>
  </Box>)
}
</>
  );
};

export default PopUpBox;
