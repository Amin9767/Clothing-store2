import { IBrands } from "@/serverTypes/serverTypes";
import { getBrands } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBrandsData = createAsyncThunk(
  "brands/fetchData",
  async () => {
    const response = await getBrands();
    return response;
  }
);

export interface IBrandsInRedux {
  men: IBrands[];
  kids: IBrands[];
  women: IBrands[];
  [key: string]: any;

  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IBrandsInRedux = {
  men: [],
  kids: [],
  women: [],
  status: "idle",
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kids = action.payload["بچه گانه"];
        state.men = action.payload["مردانه"];
        state.women = action.payload["زنانه"];
      })
      .addCase(fetchBrandsData.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
      });
  },
});
