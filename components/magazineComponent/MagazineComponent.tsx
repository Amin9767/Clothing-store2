import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";

export default function MagazineComponent() {
  return (
    <div>
      <div className="hidden md:block">
        <Container>
          <div>
            <h2 className="text-2xl font-bold text-center my-8">مجله مدکده</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4 rounded-md overflow-hidden">
                  <Image
                    src={"/magazine/Blog_2.webp"}
                    width={600}
                    height={200}
                    alt="magazine"
                    className="h-auto object-cover md:h-auto"
                  />
                </div>
                <div className="col-span-12 md:col-span-8 rounded-md overflow-hidden">
                  <Link href={"/blog/men/انواع کاپشن مردانه مدل 2025"}>
                    <Image
                      src={"/magazine/Blog_1.webp"}
                      width={1200}
                      height={400}
                      alt="magazine"
                      className="sm:h-44 object-cover md:h-auto"
                    />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8 rounded-md overflow-hidden">
                  <Image
                    src={"/magazine/Blog_4.webp"}
                    width={800}
                    height={600}
                    alt="magazine"
                    className="sm:h-44 w-full object-cover md:h-auto"
                  />
                </div>
                <div className="col-span-12 md:col-span-4 rounded-md overflow-hidden">
                  <Image
                    src={"/magazine/Blog_3.webp"}
                    width={600}
                    height={200}
                    alt="magazine"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="block md:hidden">
        <div>
          <h2 className="text-2xl font-bold text-center my-8">مجله مدکده</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 rounded-md overflow-hidden">
                <Image
                  src={"/magazine/Blog_2.webp"}
                  width={400}
                  height={200}
                  alt="magazine"
                  layout="responsive"
                  className="sm:h-96 object-cover md:h-auto w-full"
                />
              </div>
              <div className="col-span-12 md:col-span-8 rounded-md overflow-hidden">
                <Link href={"/blog/men/انواع کاپشن مردانه مدل 2025"}>
                  <Image
                    src={"/magazine/Blog_1.webp"}
                    width={1200}
                    height={400}
                    alt="magazine"
                    className="sm:h-52 object-cover md:h-auto w-full"
                  />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8 rounded-md overflow-hidden">
                <Image
                  src={"/magazine/Blog_4.webp"}
                  width={800}
                  height={600}
                  alt="magazine"
                  className="sm:h-52 object-cover md:h-auto w-full"
                />
              </div>
              <div className="col-span-12 md:col-span-4 rounded-md overflow-hidden">
                <Image
                  src={"/magazine/Blog_3.webp"}
                  width={800}
                  height={400}
                  layout="responsive"
                  alt="magazine"
                  className="w-full sm:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
