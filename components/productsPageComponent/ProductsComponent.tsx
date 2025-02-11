import { cartSlice } from "@/redux/cartSlice";
import { IProduct, TProducts } from "@/serverTypes/serverTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

interface IProductsProps {
  sortedProducts: TProducts;
  category?: string;
  error?: string;
  catParams: string | string[];
  getSub: string;
}

function ProductsComponent({
  sortedProducts,
  catParams,
  getSub,
}: IProductsProps) {
  const dispatch = useDispatch();
  const addToCartHandler = useCallback(
    (item: IProduct, e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(cartSlice.actions.add(item));
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [dispatch]
  );

  return (
    <div className="w-full h-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2 border-t pt-6">
      {sortedProducts && sortedProducts.length > 0 ? (
        sortedProducts.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/store/${catParams}/${getSub}/${item.title}`}
              className=""
            >
              <div className="h-full w-full flex flex-col  justify-between items-center shadow-lg rounded-lg overflow-hidden relative group">
                <Image
                  src={item.image}
                  width={200}
                  height={150}
                  alt={item.title}
                  className="rounded-t-lg h-2/3  object-cover"
                />
                <div className="bg-white w-full justify-between items-center gap-4 p-4 flex flex-col ">
                  <h3 className="break-words font-normal line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-end items-center gap-1">
                    <span className="text-green-300 font-bold flex justify-end">
                      {item.price}
                    </span>
                    <span className="text-xs">تومان</span>
                  </div>
                </div>
                <button
                  className="bg-blue-400 text-white rounded px-1 md:px-2 absolute top-10 right-3 hidden md:group-hover:block active:bg-blue-600"
                  onClick={(e) => addToCartHandler(item, e)}
                >
                  +
                </button>
                
              </div>
            </Link>
          );
        })
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-center text-xl font-bold">محصولی یافت نشد</p>
        </div>
      )}
    </div>
  );
}

export default ProductsComponent;
