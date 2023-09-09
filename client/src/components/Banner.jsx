import FlexBetween from "./FlexBetween";
import { Container, Typography } from "@mui/material";
import HeroImg from "./HeroImg";
import Searchbar from "./Searchbar";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <FlexBetween gap={5}>
          <div>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              <span className="ui">Discover</span> <br /> Most Suitable Property
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Find a variety of properties that suit you very easily. Forget all
              difficulties in finding a residence for you.
            </Typography>

            <Searchbar />
          </div>
          <HeroImg img="./images/banner.jpg" banner />
        </FlexBetween>
      </Container>
    </div>
  );
};

export default Banner;
