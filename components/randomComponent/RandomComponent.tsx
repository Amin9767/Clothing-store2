import React, { useCallback, useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";
import Image from "next/image";
import {
  IProduct,
  IRandomProps,
  TProductsBrand,
} from "@/serverTypes/serverTypes";
import { getProducts } from "@/services/api";
import RandomMobileComponent from "./RandomMobileComponent";
import RandomDesktopComponent from "./RandomDesktopComponent";

export default function RandomComponent({
  targetCategory,
  targetSubCategory,
  count,
  py,
}: IRandomProps) {
  console.log(targetCategory);
  console.log(targetSubCategory);

  const [targetProducts, setTargetProducts] = useState<IProduct[] | []>([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await getProducts();
      console.log("Fetched Products:", response);
      const getTargetProducts =
        response?.[targetCategory]?.[targetSubCategory] || [];
      console.log("Target Products:", getTargetProducts);
      const shuffled = getTargetProducts.sort(() => Math.random() - 0.5);
      console.log("Shuffled Products:", shuffled);
      const selectedProducts = shuffled.slice(0, count);
      setTargetProducts(selectedProducts);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [
    targetCategory,
    targetSubCategory,
    count,
    getProducts,
    setTargetProducts,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <RandomDesktopComponent
        targetProducts={targetProducts}
        targetCategory={targetCategory}
        targetSubCategory={targetSubCategory}
        py={py}
        count={count}
      />
      <RandomMobileComponent
        targetProducts={targetProducts}
        targetCategory={targetCategory}
        targetSubCategory={targetSubCategory}
        py={py}
        count={count}
      />
    </div>
  );
}
