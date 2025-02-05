import React from "react";
import Carousel from "../carousel/Carousel";
import { ISlide, TSlides } from "@/serverTypes/serverTypes";
interface IManSlideProps {
  mainDataSlider: ISlide[];
}

export default function MainSlide({ mainDataSlider }: IManSlideProps) {
  return (
    <div>
      {mainDataSlider && (
        <Carousel
          data={mainDataSlider}
          renderItem={(item) => (
            <picture>
              <source srcSet={item.imageMobile} media="(max-width: 768px)" />
              <source srcSet={item.imageDesktop} media="(min-width: 769px)" />
              <img
                src={item.imageDesktop}
                alt="Description of image"
                className="w-full h-auto"
              />
            </picture>
          )}
        />
      )}
    </div>
  );
}
