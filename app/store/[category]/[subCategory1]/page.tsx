"use client";
import CategoryComponent from "@/components/category/CategoryComponent";
import ProductsPageComponent from "@/components/productsPageComponent/ProductsPageComponent";
import { IProduct, TCategories, TProducts } from "@/serverTypes/serverTypes";
import { getCategoryList, getProducts } from "@/services/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function subCategory1Page() {
  const params = useParams();
  const getCat = decodeURIComponent(
    Array.isArray(params.category) ? params.category[0] : params.category
  );

  console.log(getCat);
  const getSubCat1 = decodeURIComponent(
    Array.isArray(params.subCategory1)
      ? params.subCategory1[0]
      : params.subCategory1
  );
  console.log("getsubcat1 =>", getSubCat1);

  const [category, setCategory] = useState<TCategories | []>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseCategory, ResponseProducts] = await Promise.all([
          getCategoryList(),
          getProducts(),
        ]);
        console.log(responseCategory);
        console.log(ResponseProducts);
        const targetCategoryList = responseCategory[getSubCat1] || [];
        console.log(targetCategoryList);
        setCategory(targetCategoryList);

        const getTargetProducts = ResponseProducts[getCat]?.[getSubCat1] || [];
        setProducts(getTargetProducts);

        const combinedProducts = getTargetProducts
          ? Object.values(getTargetProducts).flat()
          : [];
        const combinedProductsType: TProducts = combinedProducts.map(
          (item) => item as IProduct
        );
        setProducts(combinedProductsType);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات", error);
      }
    };
    fetchData();
  }, [getSubCat1, getCat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          getSubCat1 === "بلوز دخترانه" ||
          getSubCat1 === "شلوار و دامن دخترانه"
        ) {
          const ResponseProducts = await getProducts();
          const getTargetProducts =
            ResponseProducts[getCat].دخترانه?.[getSubCat1] || [];
          setProducts(getTargetProducts);
        } else if (
          getSubCat1 === "پیراهن پسرانه" ||
          getSubCat1 === "کاپشن پسرانه" ||
          getSubCat1 === "تیشرت پسرانه"
        ) {
          const ResponseProducts = await getProducts();
          const getTargetProducts =
            ResponseProducts[getCat].پسرانه?.[getSubCat1] || [];
          setProducts(getTargetProducts);
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات", error);
      }
    };
    fetchData();
  }, [getSubCat1]);

  return (
    <div>
      {getCat === "بچه گانه" && <CategoryComponent category={category} />}

      <ProductsPageComponent products={products.length ? products : []} />
    </div>
  );
}
