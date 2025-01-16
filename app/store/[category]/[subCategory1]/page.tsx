"use client";
import CategoryComponent from "@/components/category/CategoryComponent";
import ProductsPageComponent from "@/components/productsPageComponent/ProductsPageComponent";
import {
  IBrands,
  IBrandsResponse,
  IProduct,
  TCategories,
  TProductCategory,
  TProducts,
} from "@/serverTypes/serverTypes";
import { getBrands, getCategoryList, getProducts } from "@/services/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function subCategory1Page() {
  const params = useParams();
  console.log(params);
  const getCat = decodeURIComponent(
    Array.isArray(params.category) ? params.category[0] : params.category
  );

  console.log("cat =>", getCat);
  const getSubCat1 = decodeURIComponent(
    Array.isArray(params.subCategory1)
      ? params.subCategory1[0]
      : params.subCategory1
  );
  console.log(getSubCat1);

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
        const targetCategoryList = responseCategory[getSubCat1] || [];
        console.log(targetCategoryList);
        setCategory(targetCategoryList);

        console.log(ResponseProducts);
        const getTargetProducts = ResponseProducts[getCat]?.[getSubCat1] || [];
        console.log(getTargetProducts);
        setProducts(getTargetProducts);

        const combinedProducts = getTargetProducts
          ? Object.values(getTargetProducts).flat()
          : [];
        console.log(combinedProducts);
        const combinedProductsType: TProducts = combinedProducts.map(
          (item) => item as IProduct
        );
        console.log(combinedProductsType);
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
          console.log(ResponseProducts);
          console.log(ResponseProducts);
          const getTargetProducts =
            ResponseProducts[getCat].دخترانه?.[getSubCat1] || [];
          console.log(getTargetProducts);
          setProducts(getTargetProducts);
          setProducts(getTargetProducts);
        } else if (
          getSubCat1 === "پیراهن پسرانه" ||
          getSubCat1 === "کاپشن پسرانه"
        ) {
          const ResponseProducts = await getProducts();
          console.log(ResponseProducts);
          const getTargetProducts =
            ResponseProducts[getCat].پسرانه?.[getSubCat1] || [];
          console.log(getTargetProducts);
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
