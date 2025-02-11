"use client";
import Container from "../../components/container/Container";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem } from "@/serverTypes/serverTypes";
import { cartSlice } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { UseAutoContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./addressComponent"), { ssr: false });

export default function CartPage() {
  const [showMap, setShowMap] = useState(false);
  const [isClient, setIsClient] = useState(false); // برای بررسی اینکه کد در سمت کلاینت است

  const { user } = UseAutoContext();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  console.log(cartItems);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart: ICartItem[] = JSON.parse(savedCart);
        if (parsedCart.length > 0) {
          dispatch(cartSlice.actions.setCart(parsedCart));
        }
      }
    }
  }, [dispatch, isClient]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleUpdateQuantity = (id: number, change: number) => {
    dispatch(cartSlice.actions.updateQuantity({ id, change }));
  };

  const handleTotalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total: number, item: ICartItem) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const handleRemove = (id: number) => {
    dispatch(cartSlice.actions.remove(id));
    const updatedCart = cartItems.filter((item) => item.id !== id); // فیلتر کردن آیتم حذف‌شده
    if (updatedCart.length>0) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem("cart");
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center  mt-8 md:mt-20 gap-8 ">
          <div className="w-full md:w-2/3 flex flex-col  gap-4 ">
            {!showMap &&
              cartItems.map((item: ICartItem, index: number) => {
                return (
                  <CartItemComponent
                    item={item}
                    index={index}
                    handleRemove={handleRemove}
                    handleUpdateQuantity={handleUpdateQuantity}
                    key={item.id}
                  />
                );
              })}
            {showMap && <Map />}
          </div>
          {cartItems && cartItems.length > 0 ? (
            <div className="md:w-1/3 w-full col-span-12 md:col-span-4">
              <div className="border rounded-lg p-4 bg-[#F9F9F9]">
                <h3 className="pb-2 font-normal">خلاصه سفارش</h3>
                <div className="border-t py-2 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>قیمت کل مرسولات</p>
                    <span className="font-normal">{handleTotalPrice}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <p> مجموع تخفیف </p>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="font-light">قابل پرداخت</p>
                  <div className="flex gap-2 items-center">
                    <span className="font-light">{handleTotalPrice}</span>
                    <span className="text-xs">تومان</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link
                    href={`${user ? "#" : "/login"}`}
                    className="flex items-center justify-center w-full bg-blue-500 px-4 py-2 text-2xl rounded-lg text-white"
                    onClick={() => setShowMap(true)}
                  >
                    تکمیل فرم ارسال
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="col-span-12 flex items-center justify-center text-2xl">
                سبد خرید شما خالی است
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
