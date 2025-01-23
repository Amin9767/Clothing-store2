"use client";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/container/Container";
import {
  getBlogArticles,
  getBlogCategoryImages,
  getBlogImages,
} from "../../services/api";
import BlogCategoryImageComponent from "../../components/blogComponents/BlogCategoryImageComponent";
import {
  IArticle,
  TArticles,
  TBlogImages,
} from "../../serverTypes/serverTypes";
import BlogImagesComponent from "../../components/blogComponents/BlogImagesComponent";
import BlogArticles from "@/components/blogComponents/BlogArticles";

export default function Blog() {
  const [blogCatImages, setBlogCatImages] = useState([]);
  const [mainBlogImages, setMainBlogImages] = useState<TBlogImages | []>([]);
  const [blogArticles, setBlogArticles] = useState<TArticles | []>([]);
  const fetchData = useCallback(async () => {
    try {
      const [blogCatImagesResponse, blogImagesResponse, blogArticlesResponse] =
        await Promise.all([
          getBlogCategoryImages(),
          getBlogImages(),
          getBlogArticles(),
        ]);
      if (blogCatImagesResponse) {
        setBlogCatImages(blogCatImagesResponse.blogCategoryImages);
      } else {
        console.log("دیتایی موجود نیست");
      }
      if (blogImagesResponse) {
        setMainBlogImages(blogImagesResponse.blogImages.main);
      } else {
        console.log("دیتایی موجود نیست");
      }
      if (blogArticlesResponse && blogArticlesResponse.blogArticles) {
        const getArticles = blogArticlesResponse.blogArticles;

        // تبدیل به آرایه
        const convertToArray = Object.values(getArticles).flat() as TArticles;

        // یونیک کردن ایدی ها
        const seenIds = new Set<number>();
        let idCounter =
          Math.max(...convertToArray.map((item: IArticle) => item.id)) + 1; // شروع از بزرگ‌ترین id موجود

        const updatedShuffleArray = convertToArray.map((item) => {
          if (seenIds.has(item.id)) {
            // اگر id تکراری است، مقدار جدید اختصاص بده
            return { ...item, id: idCounter++ };
          }
          seenIds.add(item.id); // اگر id یکتا بود، آن را اضافه کن
          return item;
        });

        setBlogArticles(updatedShuffleArray);
      } else {
        console.log("دیتای blogArticlesResponse.blogArticles موجود نیست");
      }
    } catch (error) {
      console.error("خطا در فراخوانی API ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <BlogImagesComponent blogImages={mainBlogImages} />
      <Container>
        <BlogCategoryImageComponent blogCatImages={blogCatImages} />
        <BlogArticles blogArticles={blogArticles} />
      </Container>
    </>
  );
}
