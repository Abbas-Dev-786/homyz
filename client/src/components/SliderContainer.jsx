import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SectionText from "./SectionText";
import PropertyCard from "./PropertyCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "react-query";
import { getTop10Properties } from "../api";

const mainText = "popular residencies";
const subText = "best choices";

const SliderContainer = () => {
  const { data, error, isLoading } = useQuery(
    ["top10Properties"],
    getTop10Properties
  );

  return (
    <Box component="div">
      <SectionText mainText={mainText} subText={subText} />

      {isLoading && (
        <CircularProgress
          sx={{ display: "block", mx: "auto", my: 5 }}
          color="warning"
          size={30}
        />
      )}

      {error && (
        <Typography variant="body1" textAlign="center" color="orangered">
          {error.message}
        </Typography>
      )}

      {!error && (
        <Container maxWidth="xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
          >
            {data?.map((d, i) => (
              <SwiperSlide key={i}>
                <PropertyCard {...d} img={d?.images?.[0]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </Box>
  );
};

export default SliderContainer;
