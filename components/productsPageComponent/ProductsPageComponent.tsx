import { IoIosArrowBack } from "react-icons/io";
import Container from "../container/Container";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { TProducts } from "@/serverTypes/serverTypes";

interface IProductsProps {
  products: TProducts;
  category?: string;
  error?: string;
}

export default function ProductsPageComponent({
  products,
  category,
}: IProductsProps) {
  console.log(category);
  console.log(products);
  const [sortedProducts, setSortedProducts] = useState(products);
  const params = useParams();
  console.log(params);
  const catParams = params.category;
  console.log("categoryParams =>", catParams);
  const subParams = Array.isArray(params.subCategory1)
    ? params.subCategory1[0]
    : params.subCategory1;
  const getSub = decodeURIComponent(subParams);
  console.log("subCategory =>", getSub);
  const path = usePathname();
  // const decoded = decodeURIComponent(path.split("/").pop() || "");
  // console.log(decoded);
  const [isOpenMenu, setIsOpenMenu] = useState<"filter" | "sort" | null>(null);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [isPriceMenuOpen, setIsPriceMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // وضعیت بارگذاری

  useEffect(() => {
    try {
      let filtered = [...products];
      console.log("Original Products:", products);

      if (minPrice !== "") {
        filtered = filtered.filter((item) => item.price >= Number(minPrice));
        console.log("Filtered by Min Price:", filtered);
      }

      if (maxPrice !== "") {
        filtered = filtered.filter((item) => item.price <= Number(maxPrice));
        console.log("Filtered by Max Price:", filtered);
      }

      setSortedProducts(filtered);
    } catch (error) {
      console.error("خطا در فیلتر کردن محصولات:", error);
    }
  }, [minPrice, maxPrice, products]);

  const handleToggleMenu = (menu: "filter" | "sort") => {
    setIsOpenMenu((prev) => (prev === menu ? null : menu));
  };
  const handleSort = useCallback(
    (sortType: string) => {
      const sorted = [...sortedProducts];
      switch (sortType) {
        // case "new":
        //   sorted.sort((a, b) => {
        //     const dateA = new Date(a.createdAt);
        //     const dateB = new Date(b.createdAt);
        //     return dateB.getTime() - dateA.getTime();
        //   });
        //   break;
        case "price":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "cheapest":
          sorted.sort((a, b) => a.price - b.price);
          break;

        default:
          break;
      }
      setSortedProducts(sorted);
    },
    [sortedProducts]
  );

  useEffect(() => {
    setSortedProducts(products);
  }, [products, getSub]);

  return (
    <div>
      <Container>
        <div className="m-5">
          {/* فیلتر های موبایل*/}

          <div className="grid grid-cols-12 border md:hidden">
            <div className="relative col-span-6 border-l">
              <button
                className="w-full flex items-center justify-center p-1"
                onClick={() => handleToggleMenu("filter")}
              >
                فیلتر
              </button>
              {isOpenMenu === "filter" && (
                <ul
                  className="bg-white w-full absolute top-7 flex items-center flex-col justify-center 
                border-l p-4 gap-4 shadow-lg rounded-md"
                >
                  <li
                    onClick={() => setIsPriceMenuOpen(!isPriceMenuOpen)}
                    className="border cursor-pointer border-[#d5d5d5] p-2 rounded-md flex items-center justify-between w-full"
                  >
                    <p className="font-semibold text-xs md:text-base"> قیمت</p>
                    <span>
                      <IoIosArrowBack />
                    </span>
                  </li>
                  {isPriceMenuOpen && (
                    <li className="flex flex-col gap-2 w-full p-2">
                      <input
                        type="number"
                        placeholder="حداقل قیمت"
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border p-2 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="حداکثر قیمت"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border p-2 rounded-md"
                      />
                    </li>
                  )}
                  <li className="border opacity-50 cursor-not-allowed border-[#d5d5d5] p-2 rounded-md flex items-center justify-between w-full">
                    <p className="font-semibold text-xs md:text-base ">
                      زمان ارسال
                    </p>
                    <span>
                      <IoIosArrowBack />
                    </span>
                  </li>

                  <li className="border opacity-50 cursor-not-allowed border-[#d5d5d5] p-2 rounded-md flex items-center justify-between w-full">
                    <p className="font-semibold text-xs md:text-base">سایز </p>
                    <span>
                      <IoIosArrowBack />
                    </span>
                  </li>
                  <li className="border opacity-50 cursor-not-allowed border-[#d5d5d5] p-2 rounded-md flex items-center justify-between w-full">
                    <p className="font-semibold text-xs md:text-base">برند</p>
                    <span>
                      <IoIosArrowBack />
                    </span>
                  </li>
                  <li className="border opacity-50 cursor-not-allowed border-[#d5d5d5] p-2 rounded-md flex items-center justify-between w-full">
                    <p className="font-semibold text-xs md:text-base">
                      طیف رنگ{" "}
                    </p>
                    <span>
                      <IoIosArrowBack />
                    </span>
                  </li>
                </ul>
              )}
            </div>
            <div className="relative col-span-6 ">
              <button
                className="w-full flex items-center justify-center p-1"
                onClick={() => handleToggleMenu("sort")}
              >
                مرتب سازی
              </button>
              {isOpenMenu === "sort" && (
                <ul
                  className="bg-white w-full absolute top-7 col-span-6 flex flex-col items-center justify-center
                 gap-4 p-4 shadow-lg rounded-md"
                >
                  <li
                    onClick={() => {
                      handleSort("price");
                      setIsOpenMenu(null); // بستن منو
                    }}
                    className="cursor-pointer border border-[#d5d5d5] p-2 rounded-md w-full font-semibold text-xs md:text-base"
                  >
                    گرانترین
                  </li>
                  <li
                    onClick={() => {
                      handleSort("cheapest");
                      setIsOpenMenu(null); // بستن منو
                    }}
                    className="cursor-pointer border border-[#d5d5d5] p-2 rounded-md w-full font-semibold text-xs md:text-base"
                  >
                    ارزان ترین
                  </li>
                  <li
                    className=" border border-[#d5d5d5] p-2 rounded-md w-full
                     font-semibold text-xs md:text-base opacity-50 cursor-not-allowed"
                  >
                    جدید ترین
                  </li>

                  <li className="cursor-not-allowed opacity-50 border border-[#d5d5d5] p-2 rounded-md w-full font-semibold text-xs md:text-base">
                    پربازدید ترین
                  </li>

                  <li className="cursor-not-allowed opacity-50 border border-[#d5d5d5] p-2 rounded-md w-full font-semibold text-xs md:text-base">
                    پرفروش ترین
                  </li>
                  <li className="cursor-not-allowed opacity-50 border border-[#d5d5d5] p-2 rounded-md w-full font-semibold text-xs md:text-base">
                    پر تخفیف ترین
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* لیست محصولات */}

          <div className="grid grid-cols-12 mt-6 gap-2">
            <div className="hidden md:flex col-span-2 h-full p-2  flex-col gap-4">
              <div
                onClick={() => setIsPriceMenuOpen(!isPriceMenuOpen)}
                className="border cursor-pointer border-[#d5d5d5] p-2 rounded-md flex items-center justify-between"
              >
                <p className="font-semibold"> قیمت</p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>
              {isPriceMenuOpen && (
                <li className="flex flex-col gap-2 w-full p-2">
                  <input
                    type="number"
                    placeholder="حداقل قیمت"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="حداکثر قیمت"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border p-2 rounded-md"
                  />
                </li>
              )}
              <div className="opacity-50 cursor-not-allowed  border border-[#d5d5d5] p-2 rounded-md flex items-center justify-between">
                <p className="font-semibold">زمان ارسال</p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>

              <div className="opacity-50 cursor-not-allowed border border-[#d5d5d5] p-2 rounded-md flex items-center justify-between">
                <p className="font-semibold">سایز </p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>
              <div className="opacity-50 cursor-not-allowed border border-[#d5d5d5] p-2 rounded-md flex items-center justify-between">
                <p className="font-semibold">برند</p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>
              <div className="opacity-50 cursor-not-allowed border border-[#d5d5d5] p-2 rounded-md flex items-center justify-between">
                <p className="font-semibold">طیف رنگ </p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>
              <div className="opacity-50 cursor-not-allowed border border-[#d5d5d5] p-2 rounded-md flex items-center justify-between">
                <p className="font-semibold"> نوع</p>
                <span>
                  <IoIosArrowBack />
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 my-6">
              <div className=" gap-6 mb-2 hidden md:flex ">
                <h2 className="font-normal">مرتب سازی:</h2>
                <ul className="flex items-center  gap-6  w-full">
                  <li
                    onClick={() => handleSort("price")}
                    className="cursor-pointer"
                  >
                    گرانترین
                  </li>
                  <li
                    onClick={() => handleSort("cheapest")}
                    className="cursor-pointer"
                  >
                    ارزان ترین
                  </li>
                  <li
                    onClick={() => handleSort("new")}
                    className="opacity-50 cursor-not-allowed"
                  >
                    جدید ترین
                  </li>
                  <li
                    onClick={() => handleSort("mostVisited")}
                    className="opacity-50 cursor-not-allowed"
                  >
                    پربازدید ترین
                  </li>
                  <li
                    onClick={() => handleSort("bestSelling")}
                    className="opacity-50 cursor-not-allowed"
                  >
                    پرفروش ترین
                  </li>
                </ul>
              </div>
              <div className="w-full h-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2 border-t pt-6">
                {sortedProducts && sortedProducts.length > 0 ? (
                  sortedProducts.map((item, index) => {
                    console.log(item.title);
                    return (
                      <Link
                        key={item.id}
                        href={`/store/${catParams}/${getSub}/${item.title}`}
                        className=""
                      >
                        <div
                          key={index}
                          className="h-full w-full flex flex-col  justify-between items-center shadow-lg rounded-lg overflow-hidden"
                        >
                          <Image
                            src={item.image}
                            width={200}
                            height={150}
                            alt={item.title}
                            className="rounded-t-lg h-2/3  object-cover"
                          />
                          <div className="bg-white w-full justify-between items-center gap-4 p-4 flex flex-col ">
                            <h3 className="break-words font-normal line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="flex justify-end items-center gap-1">
                              <span className="text-green-300 font-bold flex justify-end">
                                {item.price}
                              </span>
                              <span className="text-xs">تومان</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-center text-xl font-bold">
                      محصولی یافت نشد
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
