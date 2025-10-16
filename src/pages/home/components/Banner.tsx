import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useRef, useState } from "react";

const images = [
  "https://vanminh76.vn/wp-content/uploads/2024/03/D.png",
  "https://vanminh76.vn/wp-content/uploads/2024/03/D.png",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
    console.log(swiperRef);
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };
  return (
    <div className="relative group">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        className="w-full h-[750px]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="h-[750px] w-full aspect-video" src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute flex gap-2 items-center bottom-5 left-[50%] translate-x-[-50%] z-5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`w-4 border border-black h-4 cursor-pointer rounded-full ${index === currentIndex ? "bg-black" : ""} duration-300`}
          ></button>
        ))}
      </div>
      <button
        onClick={handleNextSlide}
        className="bg-black/50 py-4 group-hover:opacity-100 opacity-0 text-white absolute top-1/2 z-10 cursor-pointer hover:bg-black/80 duration-300 px-1 right-3 -translate-y-1/2"
      >
        <RightOutlined className="text-4xl" />
      </button>
      <button
        onClick={handlePrevSlide}
        className="bg-black/50 py-4 text-white absolute group-hover:opacity-100 opacity-0 top-1/2 z-10 cursor-pointer hover:bg-black/80 duration-300 px-1 left-3 -translate-y-1/2"
      >
        <LeftOutlined className="text-4xl" />
      </button>
    </div>
  );
};

export default Banner;
