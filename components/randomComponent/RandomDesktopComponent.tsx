import React from "react";
import Container from "../container/Container";
import Link from "next/link";
import Carousel from "../carousel/Carousel";
import Image from "next/image";
import { IProduct, IRandomProps } from "@/serverTypes/serverTypes";

export default function RandomDesktopComponent({
  targetProducts,
  targetCategory,
  targetSubCategory,
  count,
  py,
}: { targetProducts: IProduct[] } & IRandomProps) {
  return (
    <div className="hidden md:block">
      <Container>
        {targetProducts.length > 0 ? (
          <div className=" flex flex-col gap-10  grid-cols-12 my-16">
            <div className="flex  justify-center items-center gap-4 col-span-3">
              <h2 className="text-lg md:text-2xl font-bold">
                {targetSubCategory}
              </h2>
              <Link href={`/${targetCategory}/${targetSubCategory}`} passHref>
                <button className="bg-red-500  md:w-28 h-8 px-1 text-white rounded-md">
                  مشاهده همه
                </button>
              </Link>
            </div>
            <div className="w-full h-auto  col-span-9 gap-2">
              <Carousel
                data={targetProducts}
                renderItem={(item) => (
                  <Link
                    key={item.id}
                    href={`/store/${targetCategory}/${targetSubCategory}/${item.title}`}
                  >
                    <div className="w-36 h-52 md:w-56 md:h-72 flex flex-col justify-center items-center  shadow-lg relative rounded-2xl overflow-hidden">
                      <Image
                        src={item.image}
                        width={200}
                        height={200}
                        alt={item.title}
                        className="w-full h-full overflow-hidden object-cover"
                      />
                      <div className="absolute left-0 top-0 flex items-center justify-center flex-col w-6 h-8  md:w-10 md:h-12 bg-red-500 text-white text-xs md:font-bold rounded-t-md ml-2 clip-path">
                        <span>%20</span>
                      </div>
                      <div className="bg-white w-full h-1/3 justify-between md:h-auto: gap-2 p-2 flex flex-col md:flex-row">
                        <h3 className="line-clamp-2 font-medium">
                          {item.title}
                        </h3>
                        <div className="text-green-400 flex items-center gap-1">
                          <span className=" font-bold">{item.price}</span>
                          <span className="text-xs">تومان</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                slidesPerView={4}
                spaceBetween={10}
                loop={false}
                autoPlay={false}
                navigation={true}
                breakpoints={{
                  280: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
                py={py}
              />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
