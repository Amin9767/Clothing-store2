import React from "react";
import Carousel from "../carousel/Carousel";
import Image from "next/image";
import { TProductsBrand } from "@/serverTypes/serverTypes";
import Link from "next/link";
import Container from "../container/Container";

interface BrandProps {
  productsBrand: TProductsBrand;
  targetBrand: string; //
  category: string;
  py: string;
}

export default function Brand({
  productsBrand,
  targetBrand,
  py,
}: BrandProps) {
  const findTargetBrand =
    productsBrand?.find((brand) => brand.title === targetBrand) || null;

  // console.log(findTargetBrand);
  // console.log(targetBrand);
  // console.log(productsBrand);
  return (
    <div>
      <div className="hidden md:block">
        <Container>
          {findTargetBrand?.products && (
            <div className="my-20 flex flex-col gap-6  grid-cols-12">
                <div className="flex  justify-center items-center gap-2 col-span-3">
                  <h2 className="text-lg md:text-2xl font-bold">
                    <span className="ml-4">برند</span> {findTargetBrand.title}
                  </h2>
                  <Link
                    href={`/store/brands/${findTargetBrand.title}`}
                    passHref
                  >
                    <button className="bg-red-500 text-base flex items-center justify-center px-2 py-4 h-6 md:w-28 md:h-10 text-white rounded-md">
                      مشاهده همه
                    </button>
                  </Link>
                </div>
              <div className="w-full h-auto col-span-9 gap-2">
                <Carousel
                  data={findTargetBrand.products}
                  renderItem={(item) => {
                    return (
                      <Link
                        href={`/store/brands/${findTargetBrand.title}/${item.title}`}
                      >
                        <div
                          key={item.id}
                          className="w-36 h-52 md:h-72 md:w-56  flex flex-col justify-center items-center shadow-md relative rounded-md md:rounded-md overflow-hidden"
                        >
                          <Image
                            src={item.image}
                            width={200}
                            height={200}
                            alt={item.title}
                            className="w-full h-full overflow-hidden object-cover"
                          />
                          <div className="absolute left-0 top-0 flex items-center justify-center flex-col w-10 h-12 bg-red-500 text-white text-xs font-bold rounded-t-md ml-2 clip-path">
                            <span>%20</span>
                          </div>
                          <div className="bg-slate-100 w-full h-1/3 md:h-auto justify-between gap-2 p-2 flex flex-col md:flex-row">
                            <h3 className="line-clamp-2 font-medium">
                              {item.title}
                            </h3>
                            <div className="text-green-400 flex items-center justify-center gap-1">
                              <span className="font-bold">{item.price}</span>
                              <span>تومان</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }}
                  slidesPerView={4}
                  spaceBetween={10}
                  loop={false}
                  autoPlay={false}
                  navigation={true}
                  py={py}
                  breakpoints={{
                    280: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 2,
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
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
      <div className="block md:hidden">
        {findTargetBrand?.products && (
          <div className="my-20 flex flex-col gap-6  grid-cols-12">
            <Container>
              <div className="flex  justify-center items-center gap-2 col-span-3">
                <h2 className="text-lg md:text-2xl font-bold">
                  <span className="ml-4">برند</span> {findTargetBrand.title}
                </h2>
                <Link href={`/store/brands/${findTargetBrand.title}`} passHref>
                  <button className="bg-red-500 text-base flex items-center justify-center px-2 py-4 h-6 md:w-28 md:h-10 text-white rounded-md">
                    مشاهده همه
                  </button>
                </Link>
              </div>
            </Container>
            <div className="w-full h-auto col-span-9 gap-2">
              <Carousel
                data={findTargetBrand.products}
                renderItem={(item) => {
                  // console.log(item);
                  return (
                    <Link
                      href={`/store/brands/${findTargetBrand.title}/${item.title}`}
                    >
                      <div
                        key={item.id}
                        className="w-36 h-52 md:h-auto flex flex-col justify-center items-center shadow-md relative rounded-lg md:rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          width={200}
                          height={200}
                          alt={item.title}
                          className="w-full h-full overflow-hidden object-cover"
                        />
                        <div className="absolute left-0 top-0 flex items-center justify-center flex-col w-10 h-12 bg-red-500 text-white text-xs font-bold rounded-t-md ml-2 clip-path">
                          <span>%20</span>
                        </div>
                        <div className="bg-slate-100 w-full h-1/3 md:h-auto justify-between gap-2 p-2 flex flex-col md:flex-row">
                          <h3 className="line-clamp-2 font-medium">
                            {item.title}
                          </h3>
                          <div className="text-green-400 flex items-center justify-center gap-1">
                            <span className="font-bold">{item.price}</span>
                            <span>تومان</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }}
                slidesPerView={4}
                spaceBetween={10}
                loop={false}
                autoPlay={false}
                navigation={true}
                py={py}
                breakpoints={{
                  280: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 2,
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
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
