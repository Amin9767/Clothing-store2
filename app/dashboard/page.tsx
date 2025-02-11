"use client";

import { UseAutoContext } from "@/contexts/AuthContext";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function CustomerPanel() {
  const [isShowSidebarItem, setIsShowSidebarItem] =
    useState<string>("dashboard");
  const [isActiveItem, setIsActiveItem] = useState<string>("dashboard");
  const { user } = UseAutoContext();
  console.log(user);
  const cartItems = useSelector((state: RootState) => state.cart.cart) || [];
  console.log(cartItems);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* سایدبار */}
      <aside className=" md:w-64 bg-white shadow-md p-4">
        <h2 className=" md:text-xl font-bold text-gray-700 mb-2 md:mb-4">
          پنل مشتری
        </h2>
        <ul className="flex flex-col md:gap-4 ">
          <li
            onClick={() => {
              setIsShowSidebarItem("dashboard");
              setIsActiveItem("dashboard");
            }}
            className={`${
              isActiveItem === "dashboard"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }block p-1 md:p-2   hover:bg-gray-200 rounded-sm cursor-pointer `}
          >
            داشبورد
          </li>
          <li
            onClick={() => {
              setIsShowSidebarItem("myOrders");
              setIsActiveItem("myOrders");
            }}
            className={`${
              isActiveItem === "myOrders"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }block p-1 md:p-2  hover:bg-gray-200  rounded-sm cursor-pointer `}
          >
            سفارشات من
          </li>
          <li
            onClick={() => {
              setIsShowSidebarItem("products");
              setIsActiveItem("products");
            }}
            className={`${
              isActiveItem === "products"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }block p-1 md:p-2  hover:bg-gray-200  rounded-sm cursor-pointer `}
          >
            محصولات
          </li>
          <li
            onClick={() => {
              setIsShowSidebarItem("profile");
              setIsActiveItem("profile");
            }}
            className={`block p-1 md:p-2 ${
              isActiveItem === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            } hover:bg-gray-200  rounded-sm cursor-pointer `}
          >
            پروفایل
          </li>
        </ul>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-4">
          {isShowSidebarItem === "products" ? (
            cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white w-full flex flex-col md:flex-row gap-1 md:p-2 max-h-96  md:h-40 justify-between items-center border border-gray-300 p-4 rounded-lg "
                >
                  <div className=" h-1/3 md:w-1/3 md:h-full flex justify-center items-center">
                    <Image
                      className="h-full object-contain"
                      width={150}
                      height={100}
                      alt=""
                      src={item.image}
                    />
                  </div>
                  <div className="w-full  flex flex-col gap-4 md:gap-2 md:w-1/2">
                    <h2 className="font-normal text-sm md:text-base">
                      {" "}
                      {item.title}
                    </h2>
                    <div className="flex flex-col  gap-4">
                      <div className="flex gap-4 ">
                        <div className="flex">
                          <span className="text-sm md:text-base">رنگ : </span>
                          <span className="font-normal text-sm md:text-base">
                            {" "}
                            قرمز{" "}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-sm md:text-base">سایز : </span>
                          <span className="font-semibold">M</span>
                        </div>
                      </div>
                      <div className="flex xs:gap-4  items-center justify-between">
                        <div className="flex  gap-2 flex-grow w-1/3 justify-end">
                          <span className="font-normal text-sm md:text-base text-green-400">
                            {item.price * item.quantity}
                          </span>
                          <span className="text-sm md:text-base"> تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>محصولی موجود نیست</p>
            )
          ) : isShowSidebarItem === "dashboard" ? (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-6 shadow rounded-md">
                <h2 className="md:text-lg font-bold text-gray-700">
                  تعداد محصولات
                </h2>
                <p className="md:text-2xl font-semibold text-blue-500">
                  {cartItems.length}
                </p>
              </div>
              <div className="bg-white p-6 shadow rounded-md">
                <h2 className="md:text-lg font-bold text-gray-700">
                  تعداد سفارشات
                </h2>
                <p className="md:text-2xl font-semibold text-green-500">0</p>
              </div>
              <div className="bg-white p-6 shadow rounded-md">
                <h2 className="md:text-lg font-bold text-gray-700">
                  تعداد کاربران
                </h2>
                <p className="md:text-2xl font-semibold text-purple-500">0</p>
              </div>
            </section>
          ) : isShowSidebarItem === "myOrders" ? (
            <div className="w-full flex items-center justify-center ">
              <p className="text-xl font-bold">به زودی... </p>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center ">
              <p className="text-xl font-bold">به زودی... </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
