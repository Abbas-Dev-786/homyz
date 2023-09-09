import PropTypes from "prop-types";
import { Box, Container } from "@mui/material";
const AuthBox = ({ children }) => {
  return (
    <Box component="div" className="auth-container">
      <Container
        maxWidth="xs"
        sx={{ mx: 2 }}
        // component="form"
        className="auth-box"
      >
        {children}
      </Container>
    </Box>
  );
};

AuthBox.propTypes = {
  children: PropTypes.any,
};

export default AuthBox;
