import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Carousel = () => {
  const slides = [
    {
      image: "banner1.jpg",
      text: "Fresh Fruits Everyday",
      color: "text-white",
    },
    {
      image: "banner2.jpg",
      text: "Support Local Sellers",
      color: "text-white",
    },
    {
      image: "banner3.jpg",
      text: "Best Deals Near You",
      color: "text-white",
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 lg:px-20 py-6">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-4 text-center">
                <h2
                  className={`text-xl md:text-3xl lg:text-4xl font-bold ${slide.color}`}
                >
                  {slide.text}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
