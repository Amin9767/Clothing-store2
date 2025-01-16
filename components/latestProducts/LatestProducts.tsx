import React, { useCallback, useState } from "react";
import Carousel from "../carousel/Carousel";
import Image from "next/image";
import { TProductsBrand } from "@/serverTypes/serverTypes";
import { getProducts } from "@/services/api";



export default function LatestProducts() {
  
  return (
    <>
      <div className="my-20 flex flex-col gap-10  grid-cols-12">
        <div className="flex  justify-center items-center gap-4 col-span-3">
          <h2 className="text-2xl font-bold">
            <span className="ml-4">برند</span>
          </h2>
          <button className="bg-red-500 w-28 h-10 text-white rounded-md">
            مشاهده همه{" "}
          </button>
        </div>
        <div className="w-full h-auto col-span-9">
         
        </div>
      </div>
    </>
  );
}
