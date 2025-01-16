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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-16">
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
      <div className="block md:hidden">
        <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-4 my-16">
          {productsDiscount?.map((discount) => {
            return (
              <Link key={discount.id} href={`/store/${getCat}/${whatCat}`}>
                <div className="col-span-12">
                  <Image
                    src={discount.image}
                    width={800}
                    height={400}
                    layout="responsive"
                    alt="discount"
                    className=" w-full object-cover"
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
