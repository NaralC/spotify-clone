"use client";

import AuthModal from "@/components/auth-modal";
import SubscriptionModal from "@/components/subscription-modal";
import UploadModal from "@/components/upload-modal";
import { ProductWithPrice } from "@/types";
import { FC, useEffect, useState } from "react";

const ModalProvider: FC<{ products: ProductWithPrice[] }> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {};
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscriptionModal products={products} />
    </>
  );
};

export default ModalProvider;
