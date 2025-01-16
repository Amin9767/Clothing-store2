"use client";
import { createContext, useContext, useState } from "react";
import {
  ICartContext,
  ICartContextProviderProps,
  ICartItem,
  IProduct,
  TCartItems,
} from "../serverTypes/serverTypes";

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartContextProvider = ({
  children,
}: ICartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<TCartItems>([]); // مقدار پیش‌فرض آرایه خالی است

  const handleAddItemToCart = (targetProduct: IProduct) => {
    console.log(targetProduct);
    if (!targetProduct && targetProduct === null) {
      console.error("No product selected to add to cart");
      return;
    }
    setCartItems((prev) => {
      const ProductExist = prev.some((item) => item.id == targetProduct.id);
      if (!targetProduct.id) {
        console.log("product does not have an Id");
        return prev;
      }
      if (ProductExist) {
        return prev.map((item) =>
          item.id === targetProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newProduct: ICartItem = { ...targetProduct, quantity: 1 };
      return [...prev, newProduct];
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCartItemPlus = (id: number) => {
    setCartItems((prev) => {
      const findItem = prev.find((item) => item.id === id);
      if (findItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return prev;
    });
  };

  const handleCartItemMines = (id: number) => {
    setCartItems((prev) => {
      const findItem = prev.find((item) => item.id === id);
      if (findItem && findItem.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev;
    });
  };
  const handleCartItemDelete = (id: number) => {
    setCartItems((prev) => {
      const findItem = prev.find((item) => item.id === id);
      if (findItem) {
        return prev.filter((item) => item.id !== id);
      }
      return prev;
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddItemToCart,
        setCartItems,
        handleCartItemPlus,
        handleCartItemMines,
        handleCartItemDelete,
        calculateTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
