import Image from "next/image";
import React from "react";
import Container from "../container/Container";
import { IBlogImage } from "@/serverTypes/serverTypes";

interface IBlogImagesProps {
  blogImages: IBlogImage[];
}

export default function BlogImagesComponent({ blogImages }: IBlogImagesProps) {
  const defaultImage = "/magazine/Blog_1.webp"; // تصویر پیش‌فرض

  return (
    <div className="bg-gray-700 py-10 mb-10">
      <Container>
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-7 rounded-md overflow-hidden group relative">
            <Image
              src={blogImages[0]?.image || defaultImage}
              width={800}
              height={800}
              alt="blog"
              className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-purple-400/50"></div>
          </div>
          <div className="col-span-5 h-[27rem] rounded-md overflow-hidden flex flex-col gap-1">
            <div className="w-full h-1/2 rounded-md overflow-hidden group relative">
              <Image
                src={blogImages[1]?.image || defaultImage}
                width={800}
                height={400}
                alt="blog"
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110 object-cover"
              />
              <div className="absolute inset-0 bg-blue-400/50"></div>
            </div>
            <div className="flex h-1/2 gap-1 justify-between">
              <div className="w-1/2 h-full rounded-md overflow-hidden group relative">
                <Image
                  src={blogImages[2]?.image || defaultImage}
                  width={600}
                  height={200}
                  alt="blog"
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-400/50"></div>
              </div>
              <div className="w-1/2 h-full rounded-md overflow-hidden group relative">
                <Image
                  src={blogImages[3]?.image || defaultImage}
                  width={600}
                  height={200}
                  alt="blog"
                  className="w-full object-cover h-auto transform transition-transform duration-300 group-hover:scale-110 "
                />
                <div className="absolute inset-0 bg-orange-400/50"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
