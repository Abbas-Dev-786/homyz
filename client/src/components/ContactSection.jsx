import { Box, Container, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FlexBetween from "./FlexBetween";
import HeroImg from "./HeroImg";
import SectionText from "./SectionText";

const mainText = "easy to contact us";
const subText = "Contact us";

const contactsData = [
  { type: "Call", data: "0123-456-789", icon: <PhoneIcon /> },
  { type: "Mail", data: "abbasbhanpura.dev@gmail.com", icon: <MailIcon /> },
  { type: "Linkedin", data: "Abbas Bhanpura wala", icon: <LinkedInIcon /> },
  { type: "Github", data: "Abbas-Dev-786", icon: <GitHubIcon /> },
  { type: "Insta", data: "abbas-bhanpura-wala", icon: <InstagramIcon /> },
];

const ContactSection = () => {
  return (
    <Container maxWidth="xl">
      <FlexBetween mt={{ xs: 1, sm: 10 }}>
        <Box component="div" sx={{ width: { xs: "100%", sm: "60%" } }}>
          <SectionText mainText={mainText} subText={subText} section />
          <Typography variant="body2" color="GrayText" mb={5}>
            We always ready to help by providing the best services for you. We
            beleive a good blace to live can make your life better
          </Typography>

          {contactsData.map((el) => (
            <Box
              key={el.type}
              display="flex"
              alignItems="center"
              mb={1}
              gap={3}
            >
              <Box
                component="div"
                p={1}
                display="flex"
                alignItems="center"
                bgcolor="#F0EDFB"
                color="#3A55C7"
                borderRadius={1}
              >
                {el.icon}
              </Box>
              <Typography variant="body2">{el.data}</Typography>
            </Box>
          ))}
        </Box>
        <HeroImg img="./images/contact.jpg" banner />
      </FlexBetween>
    </Container>
  );
};

export default ContactSection;
