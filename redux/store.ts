import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { sliderSlice } from "./sliderSlice";
import { categorySlice } from "./categorySlice";
import { brandsSlice } from "./brandsSlice";
import { bestSellingBrandsSlice } from "./bestSellingBrandsSlice";
import { discountSlice } from "./discountSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    slider: sliderSlice.reducer,
    category: categorySlice.reducer,
    brands: brandsSlice.reducer,
    bestSellingBrands: bestSellingBrandsSlice.reducer,
    discount: discountSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
