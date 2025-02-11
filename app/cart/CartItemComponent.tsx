import { ICartItem } from "@/serverTypes/serverTypes";
import Image from "next/image";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface ICartItemProps {
  item: ICartItem;
  index: number;
  handleUpdateQuantity: (id: number, change: number) => void;
  handleRemove: (id: number) => void;
}

export default function CartItemComponent({
  item,
  index,
  handleUpdateQuantity,
  handleRemove,
}: ICartItemProps) {
  return (
    <div
      key={index}
      className="w-full flex flex-col md:flex-row gap-2 max-h-96  md:h-40 justify-between items-center border border-gray-300 p-4 rounded-lg "
    >
      <div className=" h-1/3 md:w-1/3 md:h-full flex justify-center items-center">
        <Image
          className="h-full object-contain"
          width={150}
          height={100}
          alt=""
          src={item.image}
        />
      </div>
      <div className="w-full  flex flex-col gap-4 md:gap-2 md:w-1/2">
        <h2 className="font-normal text-sm md:text-base"> {item.title}</h2>
        <div className="flex flex-col  gap-4">
          <div className="flex gap-4 ">
            <div className="flex">
              <span className="text-sm md:text-base">رنگ : </span>
              <span className="font-normal text-sm md:text-base"> قرمز </span>
            </div>
            <div className="flex">
              <span className="text-sm md:text-base">سایز : </span>
              <span className="font-semibold">M</span>
            </div>
          </div>
          <div className="flex xs:gap-4  items-center justify-between">
            <div className="flex flex-grow md:flex-grow-0 md:w-1/2   px-2 md:gap-4 items-center rounded-lg border  justify-between">
              <button
                onClick={() => handleUpdateQuantity(item.id, 1)}
                className="text-xl font-semibold"
              >
                +
              </button>
              <p className="font-normal">{item.quantity}</p>
              <button
                onClick={() => handleUpdateQuantity(item.id, -1)}
                className="text-xl font-semibold"
              >
                -
              </button>
              <MdOutlineDeleteOutline
                onClick={() => handleRemove(item.id)}
                className="text-xl text-red-500 cursor-pointer"
              />
            </div>
            <div className="flex  gap-2 flex-grow w-1/3 justify-end">
              <span className="font-normal text-sm md:text-base text-green-400">
                {Number.isNaN(Number(item.price)) ||
                Number.isNaN(Number(item.quantity))
                  ? 0
                  : (Number(item.price) || 0) * (Number(item.quantity) || 1)}
              </span>

              <span className="text-sm md:text-base"> تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
