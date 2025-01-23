import { TProducts } from "@/serverTypes/serverTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="w-full h-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2 border-t pt-6">
      {sortedProducts && sortedProducts.length > 0 ? (
        sortedProducts.map((item, index) => {
          console.log(item.title);
          return (
            <Link
              key={item.id}
              href={`/store/${catParams}/${getSub}/${item.title}`}
              className=""
            >
              <div
                key={index}
                className="h-full w-full flex flex-col  justify-between items-center shadow-lg rounded-lg overflow-hidden"
              >
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
