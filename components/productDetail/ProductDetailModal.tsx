import React from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { Product } from "../../types/product";
import ProductDetailView from "./ProductDetailView";

interface ProductDetailModalProps {
  product: Product;
  children: any;
}

export default function ProductDetailModal({
  
  product,
  children,
}: ProductDetailModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontSize={"3xl"}>Chi tiết</Text>
          </ModalHeader>

          <ModalBody>
            <ProductDetailView product={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
