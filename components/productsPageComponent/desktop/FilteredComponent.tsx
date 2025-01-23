import { IMobileFilteredComponent } from "@/serverTypes/serverTypes";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function FilteredComponent({
  setIsPriceMenuOpen,
  isPriceMenuOpen,
  setMinPrice,
  setMaxPrice,
}: IMobileFilteredComponent) {
  return (
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
  );
}

export default FilteredComponent;
