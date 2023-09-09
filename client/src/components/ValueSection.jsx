import { Box, Container, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import HeroImg from "./HeroImg";
import SectionText from "./SectionText";
import MyAccordion from "./Accordion";

const mainText = "value we give to you";
const subText = "our value";

const ValueSection = () => {
  return (
    <Container maxWidth="xl">
      <FlexBetween>
        <HeroImg img="./images/value.jpg" banner />

        <Box component="div" sx={{ width: { xs: "100%", sm: "60%" } }}>
          <SectionText mainText={mainText} subText={subText} section />
          <Typography variant="body2" color="GrayText" mb={5}>
            We always ready to help by providing the best services for you. We
            beleive a good blace to live can make your life better
          </Typography>
          <MyAccordion />
        </Box>
      </FlexBetween>
    </Container>
  );
};

export default ValueSection;
