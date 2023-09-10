import PropTypes from "prop-types";
import { Box } from "@mui/material";

const HeroImg = ({ img, banner }) => {
  return (
    <Box
      className="hero-img"
      sx={{ display: banner ? { xs: "none", sm: "block" } : "block" }}
    >
      <img src={img} width="100%" />
    </Box>
  );
};

HeroImg.propTypes = {
  img: PropTypes.string,
  banner: PropTypes.bool,
};

export default HeroImg;
