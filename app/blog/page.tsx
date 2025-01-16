"use client";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/container/Container";
import Image from "next/image";
import {
  getBlogArticles,
  getBlogCategoryImages,
  getBlogImages,
} from "../../services/api";
import BlogCategoryImageComponent from "../../components/blogCategoryImageComponent/BlogCategoryImageComponent";
import {
  IArticle,
  TArticles,
  TBlogImages,
} from "../../serverTypes/serverTypes";
import BlogImagesComponent from "../../components/blogImagesComponent/BlogImagesComponent";

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
        console.log(blogCatImagesResponse);
        setBlogCatImages(blogCatImagesResponse.blogCategoryImages);
        console.log(blogCatImagesResponse.blogCategoryImages);
      } else {
        console.log("دیتایی موجود نیست");
      }
      if (blogImagesResponse) {
        console.log(blogImagesResponse.blogImages.main);
        setMainBlogImages(blogImagesResponse.blogImages.main);
      } else {
        console.log("دیتایی موجود نیست");
      }
      if (blogArticlesResponse && blogArticlesResponse.blogArticles) {
        const getArticles = blogArticlesResponse.blogArticles;

        // تبدیل به آرایه
        const convertToArray = Object.values(getArticles).flat() as TArticles;
        console.log("آرایه مقالات:", convertToArray);

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

        console.log("ارایه با ایتم های یکتا", updatedShuffleArray);

        setBlogArticles(updatedShuffleArray);
      } else {
        console.log("دیتای blogArticlesResponse.blogArticles موجود نیست");
      }
    } catch (error) {
      console.log("خطا در فراخوانی API ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <BlogImagesComponent blogImages={mainBlogImages} />
      <Container>
        <BlogCategoryImageComponent blogCatImages={blogCatImages} />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-8">
            {blogArticles && blogArticles.length > 0 ? (
              blogArticles.map((article) => {
                console.log(article);
                return (
                  <div
                    key={article.id}
                    className="bg-slate-100 h-40 p-4 flex items-center gap-6 rounded-lg"
                  >
                    <div className="w-1/3 h-full flex items-center ">
                      <Image
                        src={article?.image}
                        width={800}
                        height={400}
                        alt="article-image"
                        className="rounded-lg h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 flex flex-col justify-between gap-4 h-full">
                      <h3 className="font-normal">{article.title}</h3>
                      <p className="line-clamp-3">{article.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>اطلاعاتی یافت نشد</div>
            )}
          </div>
          <div className="col-span-4 min-h-screen bg-slate-100 p-4">
            <h2>آخرین مطالب</h2>
            <div className="mt-4">
              <div className=" flex gap-2">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={"/magazine/Blog_1.webp"}
                    width={150}
                    height={300}
                    alt="blog-sidebar-image"
                    className="h-20"
                  />
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <h3 className="font-medium">
                    با 20 طراح مد معرف جهان آشنا شوید
                  </h3>
                  <span className="text-red-600">20 اردیبهشت 1403</span>
                </div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
