"use client";
import BlogImagesComponent from "@/components/blogImagesComponent/BlogImagesComponent";
import Container from "@/components/container/Container";
import { getBlogArticles, getBlogImages } from "@/services/api";
import { TArticles, TBlogCategoryKeys } from "@/serverTypes/serverTypes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface IBlogImagesResponse {
  blogImages: {
    [key: string]: { id: number; image: string }[];
  };
}

export default function BlogCategory() {
  const params = useParams();
  
  const paramsCategory: TBlogCategoryKeys =
    params.category as TBlogCategoryKeys;
  console.log(paramsCategory);
  const [blogImages, setBlogImages] = useState<{ id: number; image: string }[]>(
    []
  );
  const [articles, setArticles] = useState<TArticles | []>([]);
  const fetchData = useCallback(async () => {
    const blogImagesResponse: IBlogImagesResponse = await getBlogImages();
    if (blogImagesResponse && paramsCategory) {
      const imagesForCategory = blogImagesResponse.blogImages[paramsCategory];
      console.log(imagesForCategory);
      if (imagesForCategory) {
        setBlogImages(imagesForCategory);
      } else {
        console.log("دسته‌بندی مورد نظر یافت نشد");
      }
    } else {
      console.log("دیتایی موجود نیست");
    }
    const [blogArticlesResponse] = await Promise.all([getBlogArticles()]);
    if (blogArticlesResponse) {
      console.log(blogArticlesResponse.blogArticles[paramsCategory]);
      setArticles(blogArticlesResponse.blogArticles[paramsCategory]);
    }
  }, [paramsCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <BlogImagesComponent blogImages={blogImages} />
      <Container>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 flex flex-col gap-8">
            {articles.map((article) => {
              return (
                <Link
                  key={article.id}
                  href={`/blog/${paramsCategory}/${article.title}`}
                >
                  <div className="bg-slate-100 h-40 p-4 flex items-center gap-6 rounded-lg">
                    <div className="w-1/3 h-full flex items-center ">
                      <Image
                        src={article.image}
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
                </Link>
              );
            })}
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
