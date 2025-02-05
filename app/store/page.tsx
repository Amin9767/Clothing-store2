"use client";
import { useCallback, useEffect, useState } from "react";
import { getDiscount } from "../../services/api";
import RandomComponent from "../../components/randomComponent/RandomComponent";
import BannerComponent from "../../components/bannerComponent/BannerComponent";
import BannerComponent2 from "../../components/bannerComponent2/BannerComponent2";
import BestSelling from "../../components/bestSellingBrands/BestSelling";
import { TProductsDiscount } from "../../serverTypes/serverTypes";
import MagazineComponent from "../../components/magazineComponent/MagazineComponent";
import CategoryComponent from "@/components/category/CategoryComponent";
import MainSlide from "@/components/mainSlide/MainSlide";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderData } from "@/redux/sliderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategoryData } from "@/redux/categorySlice";
import { fetchBestSellingBrandsData } from "@/redux/bestSellingBrandsSlice";
import { fetchDiscountData } from "@/redux/discountSlice";

export default function Home() {
  const [mainDiscount, setMainDiscount] = useState<TProductsDiscount[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const slider = useSelector((state: RootState) => state.slider.mainSlide);
  const category = useSelector((state: RootState) => state.category.main);
  const reduxBestSellingBrands = useSelector(
    (state: RootState) => state.bestSellingBrands.bestBrands
  );
  useEffect(() => {
    dispatch(fetchSliderData());
    dispatch(fetchCategoryData());
    dispatch(fetchBestSellingBrandsData());
    dispatch(fetchDiscountData());
  }, [dispatch]);

  const fetchData = useCallback(async () => {
    try {
      const discountsResponse = await getDiscount();

      if (discountsResponse) {
        console.log(discountsResponse);
        const getDiscount = discountsResponse.main;
        setMainDiscount(getDiscount);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <MainSlide mainDataSlider={slider} />
      <div>
        <CategoryComponent category={category} />
        <RandomComponent
          targetCategory="مردانه"
          targetSubCategory="پیراهن"
          count={6}
          py="14"
        />
        <BannerComponent2 />
        <RandomComponent
          targetCategory="زنانه"
          targetSubCategory="شال و روسری"
          count={6}
          py="14"
        />
        <BannerComponent />
        <BestSelling BestSellingBrands={reduxBestSellingBrands} py="14" />
        <MagazineComponent />
      </div>
    </div>
  );
}
