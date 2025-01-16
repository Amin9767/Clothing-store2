"use client";
import Container from "@/components/container/Container";
import { getBlogArticles } from "@/services/api";
import { TBlogCategoryKeys } from "@/serverTypes/serverTypes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type TArticles = IArticle[];
interface IArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}
export default function Article() {
  const params = useParams();
  console.log(params.article);
  console.log(params.category);
  const paramsCat: TBlogCategoryKeys = params.category as TBlogCategoryKeys;
  const paramsArticle: string = params.article as string;
  const [article, setArticle] = useState<IArticle | null>(null);
  const decodedParamsArticle = useMemo(
    () => decodeURIComponent(paramsArticle),
    [paramsArticle]
  );
  console.log(decodedParamsArticle);

  const fetchData = useCallback(async () => {
    const [responseArticle] = await Promise.all([getBlogArticles()]);
    if (responseArticle) {
      const articles: TArticles = responseArticle.blogArticles[paramsCat];
      console.log(articles);
      const targetArticle = articles.find(
        (article) => article.title === decodedParamsArticle
      );
      if (targetArticle) {
        setArticle(targetArticle);
      } else {
        console.log("دیتایی یافت نشد");
        return <p>مقاله ای یافت نشد</p>;
      }
      console.log(targetArticle);
    }
  }, [decodedParamsArticle]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="my-12">
      <Container>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 flex flex-col gap-8">
            <div
              key={article?.id}
              className="bg-slate-100 p-6 gap-6 rounded-lg"
            >
              <h3 className="font-semibold text-xl mb-4">{article?.title}</h3>
              <div className="w-full h-auto my-8">
                <Image
                  src={article?.image || ""}
                  width={600}
                  height={600}
                  layout="responsive"
                  alt="article-image"
                  className="rounded-lg object-cover "
                />
              </div>
              <p className="text-lg leading-9">{article?.description}</p>
            </div>
          </div>
          <div className="col-span-4 min-h-screen bg-slate-100 p-4">
            <h2>آخرین مطالب</h2>
            <div className="mt-4">
              <div className="flex gap-2">
                <div className="rounded-lg overflow-hidden h-20">
                  <Image
                    src={"/magazine/Blog_1.webp"}
                    width={300}
                    height={300}
                    layout="responsive"
                    alt="blog-sidebar-image"
                    className="object-cover"
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
