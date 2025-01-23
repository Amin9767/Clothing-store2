import React from "react";

interface ISortedComponentProps {
  handleSort: (title: string) => void;
}

function SortedComponent({ handleSort }: ISortedComponentProps) {
  return (
    <div className=" gap-6 mb-2 hidden md:flex ">
      <h2 className="font-normal">مرتب سازی:</h2>
      <ul className="flex items-center  gap-6  w-full">
        <li onClick={() => handleSort("price")} className="cursor-pointer">
          گرانترین
        </li>
        <li onClick={() => handleSort("cheapest")} className="cursor-pointer">
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
  );
}

export default SortedComponent;
