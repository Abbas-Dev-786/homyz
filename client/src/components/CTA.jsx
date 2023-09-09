import { Box, Button, Container, Typography } from "@mui/material";

const Cta = () => {
  return (
    <Box
      bgcolor="#3A55C7"
      p={7}
      my={5}
      border="8px solid #566BC9"
      borderRadius={2}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          color="white"
          textAlign="center"
          fontWeight={600}
        >
          Get Started with Homyz
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.587)"
          textAlign="center"
          gutterBottom
        >
          Subscribe and find super attractive price quotes from us.
          <br />
          Find your residence soon
        </Typography>
        <Button variant="outlined" color="inherit">
          <a
            href="mailto:abbasbhanpura.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Get Started
          </a>
        </Button>
      </Container>
    </Box>
  );
};

export default Cta;
