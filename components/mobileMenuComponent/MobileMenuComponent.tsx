"use client";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function MobileMenuComponent() {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  return (
    <div className="fixed bottom-4 left-0 w-full flex justify-center items-center z-50 md:hidden">
      <div className="bg-[#87cefa] rounded-full w-[90%] flex justify-between items-center px-6 py-3  shadow-md shadow-gray-600">
        {/* آیکون‌های سمت راست */}
        <Link href={"/cart"}>
          <div className="flex flex-col items-center relative">
            <IoCartOutline className="text-2xl text-gray-600" />
            <p className="bg-red-500 text-sm rounded-full px-1 text-white absolute -top-4 -right-1">
              {cartItems.length > 0 ? cartItems.length : ""}
            </p>
            <span className="text-sm text-black">سبد خرید</span>
          </div>
        </Link>

        {/* دکمه برجسته وسط */}
        <Link href={"/"}>
          <div className="relative flex items-center justify-center ">
            <div className="absolute my-auto left-1/2 transform -translate-x-1/2 bg-blue-500 w-14 h-14 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
              <Image
                src="/mobileMenuIcon.svg"
                width={24}
                height={24}
                alt="menu-icon"
              />
            </div>
          </div>
        </Link>

        {/* آیکون‌های سمت چپ */}
        <div className="flex flex-col items-center">
          <Image
            src={"/mobileProfileIcon.svg"}
            width={24}
            height={24}
            alt="mobile-icon"
          />
          <span className="text-sm text-black">پروفایل</span>
        </div>
      </div>
    </div>
  );
}
