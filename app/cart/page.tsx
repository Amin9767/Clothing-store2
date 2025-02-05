"use client";
import Container from "../../components/container/Container";
import Image from "next/image";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, IProduct } from "@/serverTypes/serverTypes";
import { cartSlice } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
export default function CartPage() {
  // useEffect(() => {
  //   setIsClient(true);
  //   if(!user){
  //     router.push('/login')

  //   }
  // },[user,router]);

  // if (!isClient || !user) return null

  const dispatch = useDispatch();

  const cartItems = useSelector((state:RootState) => state.cart.cart);
  console.log(cartItems);

  const handleUpdateQuantity = (id: number, change: number) => {
    dispatch(cartSlice.actions.updateQuantity({ id, change }));
  };

  const handleTotalPrice = () => {
    return cartItems.reduce(
      (total: number, item: ICartItem) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemove = (id: number) => {
    dispatch(cartSlice.actions.remove(id));
  };

  return (
    <div>
      <Container>
        <div className="grid grid-cols-12 mt-20 gap-4">
          <div className="col-span-8 flex flex-col gap-4">
            {cartItems.map((item: ICartItem, index: number) => {
              return (
                <div
                  key={index}
                  className="flex justify-between border p-4 rounded-lg "
                >
                  <div>
                    <Image width={100} height={100} alt="" src={item.image} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-normal"> {item.title}</h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 ">
                        <div className="flex">
                          <span>رنگ : </span>
                          <span className="font-normal"> قرمز </span>
                        </div>
                        <div className="flex">
                          <span>سایز : </span>
                          <span className="font-semibold">M</span>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center rounded-lg border p-2 justify-between">
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
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-normal">
                      {item.price * item.quantity}{" "}
                    </span>
                    <span> تومان</span>
                  </div>
                </div>
              );
            })}
          </div>
          {cartItems && cartItems.length > 0 ? (
            <div className="col-span-4">
              <div className="border rounded-lg p-4 bg-[#F9F9F9]">
                <h3 className="pb-2 font-normal">خلاصه سفارش</h3>
                <div className="border-t py-2 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>قیمت کل مرسولات</p>
                    <span className="font-normal">{handleTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <p> مجموع تخفیف </p>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="font-light">قابل پرداخت</p>
                  <div className="flex gap-2 items-center">
                    <span className="font-light">{handleTotalPrice()}</span>
                    <span className="text-xs">تومان</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className=" w-full bg-blue-500 px-4 py-2 text-2xl rounded-lg text-white">
                    پرداخت
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="col-span-12 flex items-center justify-center text-2xl">
              سبد خرید شما خالی است
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
