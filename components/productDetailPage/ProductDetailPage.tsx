"use client";
import React, { useContext } from "react";
import Container from "../container/Container";
import Image from "next/image";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IProductDetailProps } from "@/serverTypes/serverTypes";
import { useCartContext } from "@/contexts/CartContext";
import { UseAutoContext } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ProductDetailPage({
  targetProduct,
}: IProductDetailProps) {
  console.log(targetProduct);
  const { handleAddItemToCart } = useCartContext();
  const handleAddToCart = () => {
    if (targetProduct) {
      handleAddItemToCart(targetProduct);
    }
  };
  const { user } = UseAutoContext();
  return (
    <div>
      <Container>
        <div className="grid grid-cols-12 mt-8 md:mt-16 gap-4">
          <div className="col-span-12 md:col-span-6">
            {targetProduct ? (
              targetProduct.image && (
                <Image
                  src={targetProduct.image}
                  width={400}
                  height={200}
                  alt={targetProduct.title}
                />
              )
            ) : (
              <p>محصول یافت نشد</p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6 ">
            <h1 className="text-2xl font-light">{targetProduct?.title}</h1>
            <div className="flex items-center gap-2 mt-10 border-y p-4">
              <p className="ml-4">سایز :</p>
              <span className="border px-1 rounded-lg">M</span>
              <span className="border px-1 rounded-lg">L</span>
              <span className="border px-1 rounded-lg">XL</span>
              <span className="border px-1 rounded-lg">XXL</span>
            </div>
            <div className="flex text-green-400 justify-end items-center gap-2 p-4">
              <span className="text-3xl">{targetProduct?.price} </span>
              <span>تومان</span>
            </div>
            <div className="mt-8">
              <div className="flex items-center  gap-4 mb-2">
                <span className="text-xl">
                  <LiaShippingFastSolid />
                </span>
                <p> ارسال از 3 روز کاری</p>
              </div>
              <div className="flex items-center  gap-4 mb-2">
                <span className="text-xl">
                  <AiOutlineFileProtect />
                </span>
                <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
              </div>
            </div>
            <div className="mt-12 flex justify-end border-t p-4">
              {user ? (
                <button
                  onClick={handleAddToCart}
                  className="border border-red-400 text-red-500 px-4 py-2 text-xl rounded-md"
                >
                  افزودن به سبد خرید
                </button>
              ) : (
                <Link href={'/login'} className="border border-red-400 text-red-500 px-4 py-2 text-xl rounded-md">
                  ابتدا وارد شوید
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
