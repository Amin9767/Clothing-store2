import React from "react";


interface IMobileSortedComponentProps {
  handleToggleMenu: (menu: "filter" | "sort") => void;
  isOpenMenu: string | null;
  handleSort: (value: string) => void;
  setIsOpenMenu: (menu: "filter" | "sort" | null) => void;
}

function MobileSortedComponent({
  handleToggleMenu,
  isOpenMenu,
  handleSort,
  setIsOpenMenu,
}: IMobileSortedComponentProps) {
  return (
    <>
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
    </>
  );
}

export default MobileSortedComponent;
