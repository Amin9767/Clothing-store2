"use client";
import { useCallback, useEffect, useState } from "react";
import {
  getBestSellingBrand,
  getCategoryList,
  getDiscount,
  getProducts,
} from "../../services/api";
import RandomComponent from "../../components/randomComponent/RandomComponent";
import BannerComponent from "../../components/bannerComponent/BannerComponent";
import BannerComponent2 from "../../components/bannerComponent2/BannerComponent2";
import BestSelling from "../../components/bestSellingBrands/BestSelling";
import { IProductsLogo, TCategories } from "../../serverTypes/serverTypes";
import MagazineComponent from "../../components/magazineComponent/MagazineComponent";
import CategoryComponent from "@/components/category/CategoryComponent";
import MainSlide from "@/components/mainSlide/MainSlide";
import { useSliderContext } from "@/contexts/sliderContext";
type TProductsDiscount = IProductDiscount[];
interface IProductDiscount {
  id: number;
  image: string;
  createdAt: string;
}

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [mainDiscount, setMainDiscount] = useState<TProductsDiscount | []>([]);
  const [mainPageCategory, setMainPageCategory] = useState<TCategories | []>(
    []
  );
  console.log(mainPageCategory);
  const [mainBestSellingBrands, setMainBestSellingBrands] = useState<
    IProductsLogo | []
  >([]);

  const { slideData } = useSliderContext();

  const fetchData = useCallback(async () => {
    try {
      const [categoryResponse, discountsResponse, bestSellingBrandsResponse] =
        await Promise.all([
          getCategoryList(),
          getDiscount(),
          getBestSellingBrand(),
        ]);

      if (categoryResponse) {
        console.log(categoryResponse);
        const getCategory = categoryResponse.main;
        setMainPageCategory(getCategory);

        console.log(getCategory);
      }
      if (discountsResponse) {
        console.log(discountsResponse);
        const getDiscount = discountsResponse.main;
        setMainDiscount(getDiscount);

        console.log(getDiscount);
      }
      if (bestSellingBrandsResponse) {
        console.log(bestSellingBrandsResponse);
        const getBestSellingBrand = bestSellingBrandsResponse;
        setMainBestSellingBrands(getBestSellingBrand);

        console.log(getDiscount);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(latestProducts);
  return (
    <div>
      <MainSlide mainDataSlider={slideData} />

        <div >
          <CategoryComponent category={mainPageCategory} />
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
          <BestSelling BestSellingBrands={mainBestSellingBrands} py="14" />
          <MagazineComponent />
        </div>
    </div>
  );
}
