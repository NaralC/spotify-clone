"use client";

import Modal from "./modal";
import { FC, useState } from "react";
import { Price, ProductWithPrice } from "@/types";
import Button from "./button";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/lib/stripe/helpers";
import { getStripe } from "@/lib/stripe/stripeClient";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";

const SubscriptionModal: FC<{ products: ProductWithPrice[] }> = ({
  products,
}) => {
  const subscriptionModal = useSubscriptionModal();
  const { isLoading, subscription, user } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) subscriptionModal.onClose();
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in!");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed!");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No products available.</div>;

  const formatprice = (price: Price): string => {
    const priceString = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
  };

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available.</div>;
          }

          return product.prices.map((price) => (
            <Button
              onClick={() => handleCheckout(price)}
              className="mb-4"
              disabled={isLoading || price.id === priceIdLoading}
              key={price.id}
            >{`Subscribe to ${product.name} for ${formatprice(price)}`}</Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed!</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscriptionModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscriptionModal;
