import { ICartItem, IProduct } from "@/serverTypes/serverTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cart: ICartItem[];
}

const initialState: ICartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
      else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; change: number }>
    ) => {
      let { id, change } = action.payload;
      let item = state.cart.find((item) => item.id == id);

      if (item) item.quantity += change;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
