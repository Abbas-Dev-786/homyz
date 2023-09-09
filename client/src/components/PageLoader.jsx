import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@mui/material";

const PageLoader = ({ error }) => {
  return (
    <Box
      height="75vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {error ? (
        <Typography variant="body1" color="orangered">
          {error.message}
        </Typography>
      ) : (
        <CircularProgress color="warning" size={70} />
      )}
    </Box>
  );
};

PageLoader.propTypes = {
  error: PropTypes.any,
};

export default PageLoader;
