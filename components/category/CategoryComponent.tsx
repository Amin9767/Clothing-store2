import { ICategory, TCategories } from "@/serverTypes/serverTypes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import Container from "../container/Container";
import { GiTicTacToe } from "react-icons/gi";

interface TCategory {
  category: TCategories;
  categoryParams?: string;
}

// const categoryLinks: Record<string, string> = {
//   مردانه: "/store/men",
//   زنانه: "/store/women",
//   شلوار: "/store/women/شلوار",
//   "شال و روسری": "/store/women/شال و روسری",
//   پالتو: "/store/women/پالتو",
//   "لباس زیر و راحتی": "/store/women/لباس زیر و راحتی",
//   "بچه گانه": "/store/kids",
//   "لباس دخترانه": "/store/girls",
// };

export default function CategoryComponent({
  category,
  categoryParams,
}: TCategory) {
  console.log(category);
  console.log(categoryParams);
  const params = useParams();
  // // console.log(params);
  const getCat = params?.category
    ? decodeURIComponent(
        Array.isArray(params.category) ? params.category[0] : params.category
      )
    : "";
  console.log(getCat);
  const getSubParams1 = decodeURIComponent(
    Array.isArray(params.subCategory1)
      ? params.subCategory1[0]
      : params.subCategory1
  );
  console.log(getSubParams1);

  const baseLink = getCat ? `/store/${getCat}` : "/store";

  return (
    <Container>
      <div
        className={`flex flex-wrap gap-4 justify-between ${
          getCat === "store" ? "my-20" : "my-10"
        } `}
      >
        {category.map((item: ICategory) => {
          const normalizedTitle = item.title
            .trim()
            .replace(/-/g, "")
            .toLowerCase();
          const linkPath = getCat
            ? `${baseLink}/${encodeURIComponent(item.title)}`
            : `/store/${encodeURIComponent(item.title)}`;
          return item.isComingSoon ? (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 font-bold cursor-not-allowed opacity-50"
            >
              <div className="w-16 md:w-24">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  width={100}
                  height={100}
                  alt={item.title || "به زودی"}
                  className="rounded-md overflow-hidden w-16  md:w-24"
                />
                <h3 className="text-center mt-2 text-xs md:text-base">
                  {item.title || "به زودی"}
                </h3>
                <span className="text-sm block text-center text-red-500">
                  به زودی
                </span>
              </div>
            </div>
          ) : (
            <Link
              key={item.id}
              href={linkPath}
              className="flex flex-col items-center gap-2 font-bold cursor-pointer"
            >
              <div className="w-16 md:w-24">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  width={100}
                  height={100}
                  alt={item.title || "بدون عنوان"}
                  className="rounded-md overflow-hidden  w-16  md:w-24"
                />
                <h2 className="text-center mt-2 text-xs md:text-base">
                  {item.title || "نامشخص"}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
