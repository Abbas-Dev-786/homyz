import { useMemo } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../api";
import { useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
// import useBookmark from "../hooks/useBookmark";

const genNextPage = (lastPage, allPages) => {
  const nextPage = lastPage.data.hasNextPage ? allPages.length + 1 : undefined;

  return nextPage;
};

const selectDataFields = (obj) => {
  const data = obj.pages.flatMap((el) => el.data.docs);
  const totalDocs = obj.pages[0].data.totalDocs;

  return { data, totalDocs };
};

const Properties = () => {
  const { city } = useParams();
  // const { bookmarks } = useBookmark();

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(
    ["properties", city],
    ({ pageParam = 1 }) => getProperties({ page: pageParam, city }),
    {
      getNextPageParam: genNextPage,
      select: selectDataFields,
    }
  );

  const propertiesData = useMemo(() => data?.data, [data]);

  if (error) return <PageLoader error={error} />;

  if (isLoading) return <PageLoader />;

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center">
        <Searchbar />
      </Box>

      <Typography
        variant="body1"
        textTransform="capitalize"
        fontWeight={700}
        textAlign="center"
        mt={5}
        color="orange"
      >
        {city
          ? `In ${city} we have ${data.totalDocs} properties`
          : `we have total ${data.totalDocs} properties on our portal`}
      </Typography>
      <InfiniteScroll
        dataLength={propertiesData.length}
        next={fetchNextPage}
        hasMore={data.totalDocs !== propertiesData.length}
        scrollableTarget="scrollableDiv"
        loader={
          <Box height={50} mb={5} display="flex" justifyContent="center">
            <CircularProgress color="warning" />
          </Box>
        }
        endMessage={
          <Typography variant="body1" color="orange" textAlign="center" mb={5}>
            {propertiesData.length
              ? "Yay! You have seen it all"
              : ` No Property exists in ${city}`}
          </Typography>
        }
      >
        <Grid container spacing={3} mt={3}>
          {propertiesData.map((el) => (
            <Grid key={el._id} item xs={12} sm={6} md={4} xl={3}>
              <PropertyCard {...el} img={el.images[0]} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default Properties;
