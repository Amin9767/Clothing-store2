"use client";
import Link from "next/link";
import Container from "../container/Container";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { UseAutoContext } from "@/contexts/AuthContext";
import SearchComponent from "../search/SearchComponent";
import NavStore from "./NavStore";
import NavBlog from "./NavBlog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const { user, handleLogOut } = UseAutoContext();
  const path = usePathname();
  const isPathBlog = path.startsWith("/blog");
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  return (
    <div className={"w-full shadow-lg flex   items-center relative"}>
      <Container>
        <nav className="w-full flex items-center relative z-10 py-2">
          <div className="hidden md:flex md:flex-1 ">
            <Link href={"/store"}>
              <h2 className="font-bold font-lincoln text-3xl">MODKADE</h2>
              <p className="font-medium text-xl">دوست خوش پوش من</p>
            </Link>
          </div>
          <div className="md:flex w-full justify-center items-center mx-auto md:flex-col gap-2 md:flex-1">
            <SearchComponent />
            {isPathBlog ? <NavBlog /> : <NavStore />}
          </div>
          <div className="hidden md:flex items-center justify-end gap-8 font-bold flex-1">
            {/* cart */}
            <Link href={"/cart"}>
              <div className="relative">
                <IoCartOutline className="text-xl " />
                <p className="bg-red-500 text-sm rounded-full px-1 text-white absolute -top-4 -right-1">
                  {cartItems.length > 0 ? cartItems.length : ""}
                </p>
              </div>
            </Link>

            {/* user */}
            {user ? (
              <div className="relative">
                <ul className="group bg-gray-100 p-2 rounded-md">
                  <li className="flex gap-2">
                    {user?.userName || "نام کاربری موجود نیست"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </li>
                  <ul
                    className="flex flex-col w-52 gap-2 absolute opacity-0 invisible shadow-lg bg-white  p-2 left-0
                   rounded-md group-hover:opacity-100 group-hover:visible transition-opacity duration-300 group-hover:cursor-pointer
                   mt-2"
                  >
                    <li className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>

                      <Link
                        href={`${user ? "/dashboard" : ""}`}
                        className="font-light "
                      >
                        حساب کاربری مشتری
                      </Link>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>

                      <Link
                        href={`${user ? "/dashboard" : ""}`}
                        className="font-light"
                      >
                        سفارش ها
                      </Link>
                    </li>
                    <li
                      onClick={handleLogOut}
                      className="flex items-center gap-2 font-light cursor-pointer hover:bg-gray-200 p-2 rounded-md "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                        />
                      </svg>
                      <p>خروج</p>
                    </li>
                  </ul>
                </ul>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href={"/login"}>وارد شوید</Link>
                <Link href={"/register"}>ثبت نام</Link>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </div>
  );
}
