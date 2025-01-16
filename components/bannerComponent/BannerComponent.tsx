import Image from "next/image";
import React from "react";
import Container from "../container/Container";

export default function BannerComponent() {
  return (
    <div>
      <div className="hidden md:block">
        <Container>
        <div className="grid grid-cols-12 gap-4 flex-col">
          <div className="md:flex grid gap-4 col-span-12">
            <div className="col-span-6">
              <Image
                src={"/mainBanner/_Tile_01-Down.webp"}
                width={800}
                height={800}
                alt="banner"
                className="w-full rounded-md object-cover"
              />
            </div>
            <div className="col-span-6">
              <Image
                src={"/mainBanner/_Tile_02-Down.webp"}
                width={800}
                height={800}
                alt="banner"
                className="w-full object-cover rounded-md"
              />
            </div>
          </div>
          <div className="col-span-12">
            <Image
              src={"/mainBanner/Tile_Dey_6_.webp"}
              width={1200}
              height={600}
              alt="banner"
              className="w-full rounded-md h-20 md:h-auto object-cover"
            />
          </div>
          <div className="col-span-12 ">
            <Image
              width={1200}
              height={600}
              src={"/mainBanner/Tile_Dey_4_.webp"}
              alt="banner"
              className="w-full object-cover rounded-md h-20 md:h-auto"
            />
          </div>
        </div>
        </Container>
      </div>
      <div className="block md:hidden">
        <div className="grid grid-cols-12 gap-4 flex-col">
          <div className="md:flex grid gap-4 col-span-12">
            <div className="col-span-6">
              <Image
                src={"/mainBanner/_Tile_01-Down.webp"}
                width={800}
                height={800}
                alt="banner"
                className="w-full  object-cover"
              />
            </div>
            <div className="col-span-6">
              <Image
                src={"/mainBanner/_Tile_02-Down.webp"}
                width={800}
                height={800}
                alt="banner"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-12">
            <Image
              src={"/mainBanner/Tile_Dey_6_.webp"}
              width={1200}
              height={600}
              alt="banner"
              className="w-full h-20 md:h-auto object-cover"
            />
          </div>
          <div className="col-span-12 ">
            <Image
              width={1200}
              height={600}
              src={"/mainBanner/Tile_Dey_4_.webp"}
              alt="banner"
              className="w-full object-cover h-20 md:h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
