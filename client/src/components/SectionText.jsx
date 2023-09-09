import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const SectionText = ({ subText, mainText, section }) => {
  const { palette } = useTheme();

  return (
    <Container
      maxWidth="xl"
      sx={{ my: 4 }}
      disableGutters={section ? true : false}
    >
      <Typography
        variant="h6"
        textTransform="capitalize"
        fontWeight={600}
        color={palette.my.sub}
        gutterBottom
      >
        {subText}
      </Typography>
      <Typography
        variant="h4"
        textTransform="capitalize"
        fontWeight={700}
        color={palette.my.main}
        gutterBottom
      >
        {mainText}
      </Typography>
    </Container>
  );
};

SectionText.propTypes = {
  subText: PropTypes.string,
  mainText: PropTypes.string,
  section: PropTypes.bool,
};

export default SectionText;
