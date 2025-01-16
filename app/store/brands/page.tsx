"use client";
import Container from "@/components/container/Container";
import { getBrands } from "@/services/api";
import { IBrands, IBrandsResponse } from "@/serverTypes/serverTypes";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export default function page() {
  const [brands, setBrands] = useState<IBrands[] | []>([]);
  const fetchData = useCallback(async () => {
    try {
      const brandsResponse: IBrandsResponse = await getBrands();
      if (brandsResponse) {
        console.log(brandsResponse);
        const combined = Object.values(brandsResponse).flat();
        console.log(combined);
        setBrands(combined);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Container>
      <div className=" ">
        <h1 className="my-12 text-2xl font-bold">برند های موجود در مدیسه</h1>
        <div className="h-auto flex justify-between flex-wrap gap-4 p-4 border-t ">
          {brands.map((item, index) => {
            return (
              <Link key={item.id} href={`/store/brands/${item.title}`}>
                <div
                  key={index}
                  className="w-52 h-auto flex flex-col  justify-between shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="bg-white  justify-between gap-4 p-4 flex flex-col ">
                    <h3 className="break-words line-clamp-2">{item.title}</h3>
                    <div className="flex justify-end items-center gap-1">
                      <span className="text-green-300 font-bold flex justify-end"></span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
