"use client";
import Link from "next/link";
import Container from "../container/Container";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";
import { UseAutoContext } from "@/contexts/AuthContext";
import SearchComponent from "../search/SearchComponent";
import NavStore from "./NavStore";
import NavBlog from "./NavBlog";

export default function Navbar() {
  const { cartItems = [] } = useCartContext() || {};
  const { user, handleLogOut } = UseAutoContext();
  const path = usePathname();
  const isPathBlog = path.startsWith("/blog");

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
          <div className="hidden md:flex items-center justify-end gap-4 font-bold flex-1">
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
              <div className="flex gap-4">
                <p>{user?.userName || "نام کاربری موجود نیست"}</p>
                <button onClick={handleLogOut} className="font-light">
                  خروج
                </button>
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
