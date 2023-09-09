import { Container, Divider, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Logo from "./navbar/Logo";

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <FlexBetween
        component="footer"
        flexDirection={{ xs: "column", md: "row" }}
        py={3}
        gap={3}
      >
        <Logo sm color="#e48922" />
        <Logo color="#e48922" />
        <Typography variant="body1" textAlign="center">
          Our Vision is to make all people <br /> the best place to live for
          them.
        </Typography>
        <div>
          <Typography variant="h5" color="#e48922" fontWeight={700}>
            Information
          </Typography>
          <Typography
            variant="body2"
            color="grey"
            textAlign="center"
            gutterBottom
          >
            Our Addresses
          </Typography>
        </div>
      </FlexBetween>
      <Divider />
      <Typography variant="h6" textAlign="center" p={1}>
        Made with 💙 by Abbas Bhanpura wala
      </Typography>
    </Container>
  );
};

export default Footer;
