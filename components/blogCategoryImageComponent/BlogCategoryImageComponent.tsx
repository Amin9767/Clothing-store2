import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface IBlogCategoryImageComponentProps {
  blogCatImages: IBlogCatImage[];
}

interface IBlogCatImage {
  id: number;
  title: string;
  image: string;
}
export default function BlogCategoryImageComponent({
  blogCatImages,
}: IBlogCategoryImageComponentProps) {
  console.log(blogCatImages);
  const router = useRouter();

  const navigateToCategory = (categoryTitle: string) => {
    const categoryMap: Record<string, string> = {
      "مد واستایل آقایان": "/blog/men",
      "مد و استایل خانم ها": "/blog/women",
      "مد و استایل کودکانه": "/blog/children",
    };
    return categoryMap[categoryTitle ]|| "/blog";
  };

  const handleClickCategory = (
    category: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    const categoryTitle = category.currentTarget.textContent?.trim();
    if (categoryTitle) {
      const path = navigateToCategory(categoryTitle);
      router.push(path);
    }
  };

  return (
    <div className="my-10 flex flex-wrap gap-4 justify-between items-center ">
      {blogCatImages.map((item) => {
        return (
          <div
            key={item.id}
            className="flex justify-center flex-col items-center gap-2 flex-grow"
          >
            <div className="w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-500  pointer-events-auto">
              <Image
                src={item.image}
                width={500}
                height={500}
                alt="blog-image"
                className="object-cover w-full h-full"
              />
            </div>
            <h1
              className=" text-sm md:text-base cursor-pointer"
              onClick={handleClickCategory}
            >
              {item.title}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
