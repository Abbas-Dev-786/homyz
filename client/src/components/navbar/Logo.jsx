import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Logo = ({ sm, color }) => {
  return (
    <Box
      className="logo"
      sx={{
        display: sm ? { xs: "flex", md: "none" } : { xs: "none", md: "flex" },
      }}
    >
      <Typography variant="h6" color={color} noWrap>
        <NavLink to="/">Homyz</NavLink>
      </Typography>
    </Box>
  );
};

Logo.propTypes = {
  sm: PropTypes.bool,
  color: PropTypes.string,
};

export default Logo;
