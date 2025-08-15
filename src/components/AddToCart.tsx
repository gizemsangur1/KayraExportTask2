"use client";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/fakestore";
import React, { useCallback } from "react";

function AddToCartComponent({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const t = useTranslations("products");

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      );
    },
    [dispatch, product]
  );

  return (
    <button
      onClick={handleAddToCart}
      className="mt-2 w-full bg-slate-700 text-white py-2 rounded-2xl hover:bg-slate-800 transition-colors"
    >
      {t("addToCart")}
    </button>
  );
}

export default React.memo(AddToCartComponent);
