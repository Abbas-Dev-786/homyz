import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Carousel from "../components/Carousel";
import PropertyDetail from "../components/PropertyDetail";
import MapBox from "../components/MapBox";
import { getProperty } from "../api";
import PageLoader from "../components/PageLoader";

const Property = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["property", id], getProperty);

  if (error) return <PageLoader error={error} />;

  if (isLoading) return <PageLoader />;

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }} disableGutters>
      <Carousel images={data.images} />
      <Grid container my={3} spacing={5}>
        <Grid item xs={12} md={6}>
          <PropertyDetail {...data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapBox
            location={data.location}
            address={data.address}
            zoomLevel={13}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Property;
