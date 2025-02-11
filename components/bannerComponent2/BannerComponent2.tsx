import Image from "next/image";
import React from "react";
import Container from "../container/Container";
import Link from "next/link";

export default function BannerComponent2() {
  return (
    <div>
      <div className="hidden md:block">
        <Container>
          <div className="grid grid-cols-12 gap-4 my-20">
            <div className="col-span-12 md:col-span-8 h-auto  ">
              <Link href="/store/زنانه/لباس زیر و راحتی">
                <Image
                  width={800}
                  height={200}
                  src={"/products/main/_-Desktop_2.webp"}
                  alt="discount"
                  className="object-cover w-full h-full md:rounded-md overflow-hidden"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:rounded-md overflow-hidden">
              <Link href="/store/مردانه">
                <div className="w-full ">
                  <Image
                    width={600}
                    height={200}
                    className="w-full md:rounded-md overflow-hidden"
                    src={"/products/main/_Tile_03.webp"}
                    alt="discount"
                    loading="lazy"
                  />
                </div>
              </Link>
              <Link href="/store/زنانه">
                <Image
                  width={600}
                  height={200}
                  className="object-cover w-full md:rounded-md overflow-hidden"
                  src={"/products/main/_Tile_02.webp"}
                  alt="discount"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <div className="block md:hidden">
        <div className="grid grid-cols-12 gap-4 mt-20">
          <div className="col-span-12 md:col-span-8 h-auto  ">
            <Link href="/store/زنانه/لباس زیر و راحتی ">
              <Image
                width={800}
                height={200}
                src={"/products/main/_-Desktop_2.webp"}
                alt="discount"
                className="object-cover w-full h-full md:rounded-md overflow-hidden"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:rounded-md overflow-hidden">
            <Link href="/store/مردانه">
              <div className="w-full ">
                <Image
                  width={600}
                  height={200}
                  className="w-full md:rounded-md overflow-hidden"
                  src={"/products/main/_Tile_03.webp"}
                  alt="discount"
                  loading="lazy"
                />
              </div>
            </Link>
            <Link href="/store/زنانه">
              <Image
                width={600}
                height={200}
                className="object-cover w-full md:rounded-md overflow-hidden"
                src={"/products/main/_Tile_02.webp"}
                alt="discount"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
