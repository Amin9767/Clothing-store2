"use client";
import { getBrands, getProducts } from "@/services/api";
import { IBrands, IBrandsResponse, IProduct } from "@/serverTypes/serverTypes";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ProductDetailPage from "@/components/productDetailPage/ProductDetailPage";

export default function DetailPage() {
  const [targetProduct, setTargetProduct] = useState<IProduct | null>(null);
  const [brand, setBrand] = useState<IProduct | null>(null);

  const params = useParams();
  console.log(params);
  const getCategory = params.category || "men";
  const getCat = decodeURIComponent(
    Array.isArray(params.category) ? params.category[0] : params.category
  );
  console.log(getCat);

  const paramsProductId = params.productId;
  const decodeProductId =
    typeof paramsProductId === "string"
      ? decodeURIComponent(paramsProductId)
      : "";
  console.log(decodeProductId);
  const decodeSubCategory =
    typeof params.subCategory1 === "string"
      ? decodeURIComponent(params.subCategory1)
      : "";
  console.log(decodeSubCategory);

  const fetchData = useCallback(async () => {
    let whatCat = "";
    if (decodeSubCategory.includes("دخترانه")) {
      whatCat = "دخترانه";
    } else if (decodeSubCategory.includes("پسرانه")) {
      whatCat = "پسرانه";
    }
    console.log(whatCat);
    try {
      if (getCategory === "brands") {
        const responseBrands: IBrandsResponse = await getBrands();
        const combined = Object.values(responseBrands).flat();
        console.log(combined);
        const targetBrand = combined.find(
          (item: IBrands) => item.title === decodeSubCategory
        );
        console.log(targetBrand);
        const allBrands = targetBrand?.products;
        if (allBrands) {
          const targetBrandItem = allBrands.find(
            (item) => item.title === decodeProductId
          );
          if (targetBrandItem) {
            console.log(targetBrandItem);
            setBrand(targetBrandItem);
          }
        }
      } else if (getCat === "بچه گانه") {
        const response = await getProducts();
        if (
          decodeSubCategory === "بلوز دخترانه" ||
          decodeSubCategory === "شلوار و دامن دخترانه" ||
          decodeSubCategory === "پیراهن پسرانه" ||
          decodeSubCategory === "تیشرت پسرانه" ||
          decodeSubCategory === "کاپشن پسرانه"
        ) {
          console.log(response);
          const getTargetProducts =
            response?.[getCat]?.[whatCat]?.[decodeSubCategory];
          console.log(getTargetProducts);

          const getTargetProduct = getTargetProducts.find(
            (item) => item.title === decodeProductId
          );
          getTargetProduct && setTargetProduct(getTargetProduct);
          console.log(getTargetProduct);
        } else {
          const getTargetProducts = response?.[getCat]?.[whatCat];
          console.log(getTargetProducts);
          console.log(response?.[getCat]?.[whatCat]);
          const flatProducts = Object.values(
            response?.[getCat]?.[whatCat]
          ).flat();
          console.log(flatProducts);
          const targetProduct =
            flatProducts.find((item) => item.title === decodeProductId) || null;
          console.log("Target Product:", targetProduct);
          setTargetProduct(targetProduct);
        }
      } else {
        const response = await getProducts();
        console.log(response);
        const getTargetProducts = response?.[getCat]?.[decodeSubCategory];
        console.log(getTargetProducts);
        const targetProduct =
          getTargetProducts.find(
            (item: { title: string }) => item.title === decodeProductId
          ) || null;
        console.log("Target Product:", targetProduct);
        setTargetProduct(targetProduct);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [decodeProductId, decodeSubCategory, getCat]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ProductDetailPage targetProduct={targetProduct ? targetProduct : brand} />
  );
}
