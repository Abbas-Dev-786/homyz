import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// const images = ["banner.jpg", "contact.jpg", "value.jpg"];

const Carousel = ({ images }) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={image}
            alt="property-img"
            width="100%"
            className="carousel-image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Carousel.propTypes = {
  images: PropTypes.array,
};

export default Carousel;
