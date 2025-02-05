import { ISliderState, TSlides } from "@/serverTypes/serverTypes";
import { getSlider } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSliderData = createAsyncThunk<TSlides, void>(
  "slider/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSlider();
      console.log(response);
      return response; // حالا response یک TSlides خواهد بود
    } catch (error: any) {
      return rejectWithValue(error.message || "خطای ناشناخته رخ داده است");
    }
  }
);

const initialState: ISliderState = {
  mainSlide: [],
  kids: [],
  women: [],
  men: [],
  status: "idle",
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSliderData.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.mainSlide = action.payload.mainSlide;
          state.kids = action.payload["بچه گانه"];
          state.men = action.payload["مردانه"];
          state.women = action.payload["زنانه"];
        }
      )
      .addCase(fetchSliderData.rejected, (state) => {
        state.status = "failed";
        console.log("خطا در دریافت اطلاعات");
      });
  },
});
