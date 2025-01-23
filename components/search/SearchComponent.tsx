import { getProducts } from "@/services/api";
import { IProduct, TGenderData } from "@/serverTypes/serverTypes";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      const getData: TGenderData = data;
      let allMatchedItems: IProduct[] = [];
      Object.values(getData).forEach((genderCat) => {
        Object.values(genderCat).forEach((items) => {
          if (Array.isArray(items)) {
            const matchedItems = items.filter((item: IProduct) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            allMatchedItems = [...allMatchedItems, ...matchedItems];
          }
        });
      });
      setResults(allMatchedItems);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات", error);
    }
  };
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // استفاده از useMemo برای بهینه‌سازی فیلتر کردن نتایج جستجو
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return results.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, results]);

  return (
    <div className="relative md:w-full">
      <input
        type="text"
        placeholder="جستجو..."
        className="rounded-md w-full p-1 pr-8 outline-none bg-slate-100"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <CiSearch className="absolute right-2 top-2 text-lg font-bold" />
      <ul className="absolute bg-white z-10 rounded-md flex flex-col gap-2 shadow-md overflow-y-auto max-h-64 w-full mt-2">
        {filteredResults.length > 0
          ? filteredResults.map((item, index) => {
              console.log(filteredResults);
              console.log(item);
              return (
                <Link key={index} href={`/store/${item.title}`}>
                  <li className="bg-slate-100 p-2">
                    <h3>{item.title}</h3>
                  </li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
}
