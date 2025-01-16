import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  autoplayDelay?: number;
  loop?: boolean;
  navigation?: boolean;
  autoPlay?: boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
  py?: string;
}

const Carousel = <T,>({
  data,
  renderItem,
  slidesPerView = 1,
  spaceBetween = 0,
  autoplayDelay = 5000,
  loop = false,
  navigation = false,
  autoPlay = true,
  breakpoints = {},
  py,
}: CarouselProps<T>) => {
  // console.log(data);
  return (
    <Swiper
      spaceBetween={spaceBetween}
      centeredSlides={true}
      slidesPerView={slidesPerView}
      autoplay={
        autoPlay
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
            }
          : undefined
      }
      navigation={navigation}
      loop={loop}
      breakpoints={breakpoints}
      modules={[Autoplay, Pagination, Navigation]}
      className={`mySwiper !transform-none !flex bg-slate-100`}
      style={{ padding: `${py}px 0` }}
    >
      {data.map((item, index) => (
        <SwiperSlide className="flex items-center justify-center" key={index}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
