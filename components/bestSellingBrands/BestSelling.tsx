import Image from "next/image";
import React from "react";
import Carousel from "../carousel/Carousel";
import { IProductsLogo } from "@/serverTypes/serverTypes";
import Container from "../container/Container";
interface IBestSellingBrandsProps {
  BestSellingBrands: IProductsLogo;
  py: string;
}
export default function BestSelling({
  BestSellingBrands,
  py,
}: IBestSellingBrandsProps) {
  return (
    <div>
      <div className="hidden md:block">
        <Container>
          <div className=" my-20 grid grid-cols-12">
            <div className="flex  justify-center items-center w-full col-span-12 mb-8">
              <h2 className="text-xl md:text-2xl  font-bold">
                پرفروش ترین برندها در مدکده
              </h2>
            </div>
            <div className="w-full h-auto col-span-12 gap-2">
              {BestSellingBrands && (
                // console.log(BestSellingBrands),
                <Carousel
                  data={BestSellingBrands}
                  renderItem={(item) => {
                    // console.log(item);
                    return (
                      <div className="w-36 h-40 md:w-60 md:h-52 flex flex-col items-center justify-center gap-6 bg-brands-bg  shadow-md relative rounded-lg md:rounded-2xl p-2">
                        <div className="w-full h-1/2">
                          <Image
                            src={item.logo}
                            width={150}
                            height={100}
                            alt={item.logo}
                            className="w-full h-auto object-cover"
                          />
                        </div>

                        <div className=" w-full flex flex-col items-center justify-center gap-4 p-4 ">
                          <span className="text-green-300 md:font-bold">
                            ({item.star})
                          </span>
                          <span>
                            <Image
                              src={item.starImage}
                              width={100}
                              height={50}
                              alt={"star image"}
                            />
                          </span>
                        </div>
                      </div>
                    );
                  }}
                  slidesPerView={4}
                  spaceBetween={10}
                  loop={true}
                  autoPlay={true}
                  navigation={true}
                  autoplayDelay={3000}
                  breakpoints={{
                    280: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },

                    640: {
                      slidesPerView: 2,
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
                  py={py}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
      <div className="block md:hidden">
        <div className=" my-20 grid grid-cols-12">
          <div className="flex  justify-center items-center w-full col-span-12 mb-8">
            <h2 className="text-xl md:text-2xl  font-bold">
              پرفروش ترین برندها در مدکده
            </h2>
          </div>
          <div className="w-full h-auto col-span-12 gap-2">
            {BestSellingBrands && (
              // console.log(BestSellingBrands),
              <Carousel
                data={BestSellingBrands}
                renderItem={(item) => {
                  // console.log(item);
                  return (
                    <div className="w-36 h-40 md:w-60 md:h-52 flex flex-col items-center justify-center gap-6 bg-brands-bg  shadow-md relative rounded-lg md:rounded-2xl p-2">
                      <div className="w-full h-1/2">
                        <Image
                          src={item.logo}
                          width={150}
                          height={100}
                          alt={item.logo}
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      <div className=" w-full flex flex-col items-center justify-center gap-4 p-4 ">
                        <span className="text-green-300 md:font-bold">
                          ({item.star})
                        </span>
                        <span>
                          <Image
                            src={item.starImage}
                            width={100}
                            height={50}
                            alt={"star image"}
                          />
                        </span>
                      </div>
                    </div>
                  );
                }}
                slidesPerView={4}
                spaceBetween={10}
                loop={true}
                autoPlay={true}
                navigation={true}
                autoplayDelay={3000}
                breakpoints={{
                  280: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },

                  640: {
                    slidesPerView: 2,
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
                py={py}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
