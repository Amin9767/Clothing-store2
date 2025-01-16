"use client";
import { getProducts } from "@/app/_services/api";
import { GenderData, IProduct } from "@/app/serverTypes/serverTypes";
import React, { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchComponent = () => {
  const [results, setResults] = useState<IProduct[]>([]);

  const fetchData = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]); // اگر متن جستجو خالی باشد، نتایج پاک می‌شوند
      return;
    }

    const responseProduct = await getProducts();
    const getData: GenderData = responseProduct.clothes;

    let allMatchedItems: IProduct[] = [];
    Object.values(getData).forEach((genderCat) => {
      Object.values(genderCat).forEach((items) => {
        const matchedItems = items.filter(
          (item: IProduct) =>
            item.title.toLowerCase().includes(query.toLowerCase()) // استفاده از query به جای searchQuery
        );
        allMatchedItems = [...allMatchedItems, ...matchedItems];
      });
    });

    setResults(allMatchedItems); // تنظیم نتایج
  }, []);

  

  return (
    <div className="relative">
      <input
        placeholder="جستجو کنید..."
        type="text"
        className=" rounded-md w-full p-1 pr-8 outline-none bg-slate-100"
        onChange={(e) => fetchData(e.target.value)}
      />
      <CiSearch className="absolute right-2 top-2 text-lg font-bold" />
      {results.length > 0 && (
        <div className="absolute bg-white shadow-md rounded-md mt-2 w-full max-h-64 overflow-y-auto">
          {results.map((product, index) => (
            <div
              key={index}
              className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="font-bold text-sm">{product.title}</h3>
              <p className="text-xs text-gray-600">{product.price} تومان</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
