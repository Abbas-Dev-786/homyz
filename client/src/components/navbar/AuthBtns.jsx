import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AuthBtns = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Button variant="contained" size="small">
        <Link to="/login">Login</Link>
      </Button>

      <Button
        variant="outlined"
        size="small"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Link to="/register"> Register</Link>
      </Button>
    </Box>
  );
};

export default AuthBtns;
