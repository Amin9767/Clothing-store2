"use client";
import { TDiscounts } from "@/serverTypes/serverTypes";
import Image from "next/image";
import React from "react";
import Container from "../container/Container";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Arapey } from "next/font/google";
interface IDiscountProps {
  productsDiscount: TDiscounts;
}
export default function Discount({ productsDiscount }: IDiscountProps) {
  const params = useParams();
  console.log(params);
  const getCat = decodeURIComponent(
    Array.isArray(params.category) ? params.category[0] : params.category
  );
  console.log(getCat);
  let whatCat = "";

  if (getCat === "مردانه") {
    whatCat = "پیراهن";
  } else if (getCat === "زنانه") {
    whatCat = "شلوار";
  } else {
    whatCat = "";
  }
  return (
    <div>
      <div className="hidden md:block">
        <Container>
          <div className="flex md:flex-row items-center justify-between gap-4 my-16">
            {productsDiscount?.map((discount) => {
              return (
                <Link key={discount.id} href={`/store/${getCat}/شلوار`}>
                  <div>
                    <Image
                      src={discount.image}
                      width={350}
                      height={100}
                      alt="discount"
                      className=""
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
      <div className="md:hidden">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-4 my-16">
          {productsDiscount?.map((discount) => {
            return (
              <Link key={discount.id} href={`/store/${getCat}/${whatCat}`}>
                <div className="">
                  <Image
                    src={discount.image}
                    width={800}
                    height={400}
                    alt="discount"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
