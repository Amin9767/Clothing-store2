import { TArticles } from "@/serverTypes/serverTypes";
import Image from "next/image";
import React from "react";
interface IBlogArticlesProps {
  blogArticles: TArticles;
}

function BlogArticles({blogArticles}: IBlogArticlesProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8 flex flex-col gap-8">
        {blogArticles && blogArticles.length > 0 ? (
          blogArticles.map((article) => {
            console.log(article);
            return (
              <div
                key={article.id}
                className="bg-slate-100 h-96 md:h-40 md:p-4 flex flex-col md:flex-row items-center gap-6 rounded-lg"
              >
                <div className="w-full md:w-1/3 h-2/4 md:h-full flex items-center ">
                  <Image
                    src={article?.image}
                    width={800}
                    height={400}
                    alt="article-image"
                    className="rounded-lg h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-2 md:p-0 flex flex-col justify-between gap-4 h-full">
                  <h3 className="font-normal">{article.title}</h3>
                  <p className="line-clamp-3 opacity-70 md:opacity-100">
                    {article.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>اطلاعاتی یافت نشد</div>
        )}
      </div>
      <div className="col-span-12 md:col-span-4 min-h-screen bg-slate-100 p-4">
        <h2>آخرین مطالب</h2>
        <div className="mt-4">
          <div className="flex gap-4">
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
              <h3 className="text-sm font-medium md:text-base ">
                با 20 طراح مد معرف جهان آشنا شوید
              </h3>
              <span className="text-red-600 text-sm">20 اردیبهشت 1403</span>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogArticles;
