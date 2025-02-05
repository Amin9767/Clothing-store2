import { IDiscount } from "@/serverTypes/serverTypes";
import { getDiscount } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDiscountData = createAsyncThunk(
  "discount/fetchData",
  async () => {
    const response = await getDiscount();
    return response;
  }
);

export interface IDiscountRedux {
  main: IDiscount[];
  men: IDiscount[];
  kids: IDiscount[];
  women: IDiscount[];
  [key: string]: any;

  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IDiscountRedux = {
  main: [],
  men: [],
  kids: [],
  women: [],
  status: "idle",
};

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiscountData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kids = action.payload["بچه گانه"];
        state.men = action.payload["مردانه"];
        state.women = action.payload["زنانه"];
      })
      .addCase(fetchDiscountData.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
      });
  },
});
