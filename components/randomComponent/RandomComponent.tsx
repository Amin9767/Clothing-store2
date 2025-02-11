import React, { useCallback, useEffect, useState } from "react";
import {
  IProduct,
  IRandomProps,
  
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
  

  const [targetProducts, setTargetProducts] = useState<IProduct[] | []>([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await getProducts();
      const getTargetProducts =
        response?.[targetCategory]?.[targetSubCategory] || [];
      const shuffled = getTargetProducts.sort(() => Math.random() - 0.5);
      const selectedProducts = shuffled.slice(0, count);
      setTargetProducts(selectedProducts);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [
    targetCategory,
    targetSubCategory,
    count,
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
