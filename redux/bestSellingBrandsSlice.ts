import { IProductLogo, IProductsLogo } from "@/serverTypes/serverTypes";
import { getBestSellingBrand } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBestSellingBrandsData = createAsyncThunk(
  "bestSellingBrands/fetchData",
  async () => {
    const response = await getBestSellingBrand();
    return response;
  }
);

interface IBestSellingBrandsInRedux {
  bestBrands: IProductsLogo;
  status: "idle" | "loading" | "succeeded" | "failed";
}
const initialState: IBestSellingBrandsInRedux = {
  bestBrands: [],
  status: "idle",
};

export const bestSellingBrandsSlice = createSlice({
  name: "bestSellingBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellingBrandsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestSellingBrandsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bestBrands = action.payload;
      })
      .addCase(fetchBestSellingBrandsData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
