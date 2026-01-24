import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/vzualvibemedia/products/White%20Elegant%20Kitchen%20Supplies%20And%20Tools%20Banner.png",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/vzualvibemedia/products/Special%20Collection%20Gadget%20and%20Electronic%20Banner.png",
  },
  {
    id: 3,
    image:
     "https://ik.imagekit.io/vzualvibemedia/products/Neutral%20Modern%20Fashion%20Collection%20Banner.png",
  },
];

const HomeBanner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[220px] md:h-[350px] rounded-xl"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.image}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
