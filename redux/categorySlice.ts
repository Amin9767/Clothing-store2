import { ICategoryInRedux } from "@/serverTypes/serverTypes";
import { getCategoryList } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategoryData = createAsyncThunk(
  "category/fetchData",
  async () => {
    const response = await getCategoryList();
    return response;
  }
);

const initialState: ICategoryInRedux = {
  main: [],
  kids: [],
  women: [],
  men: [],
  boys: [],
  girls: [],
  status: "idle",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.catStatus = "loading";
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.catStatus = "succeeded";
        state.main = action.payload.main
        state.kids = action.payload["بچه گانه"];
        state.men = action.payload["مردانه"];
        state.women = action.payload["زنانه"];
        state.boys = action.payload["پسرانه"];
        state.girls = action.payload["دخترانه"];
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.catStatus = "failed";
        console.log(action.error);
      });
  },
});
