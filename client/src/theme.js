import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    my: {
      main: "#1f3e72",
      sub: "orange",
    },
  },
});

export default responsiveFontSizes(theme);
