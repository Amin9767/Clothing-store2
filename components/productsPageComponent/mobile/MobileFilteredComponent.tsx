import { IMobileFilteredComponent } from "@/serverTypes/serverTypes";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function MobileFilteredComponent({
  handleToggleMenu,
  isOpenMenu,
  setIsPriceMenuOpen,
  isPriceMenuOpen,
  setMinPrice,
  setMaxPrice,
}: IMobileFilteredComponent) {
  return (
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
            <p className="font-semibold text-xs md:text-base ">زمان ارسال</p>
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
            <p className="font-semibold text-xs md:text-base">طیف رنگ </p>
            <span>
              <IoIosArrowBack />
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MobileFilteredComponent;
