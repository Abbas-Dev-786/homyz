import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useTheme } from "@emotion/react";

const data = [
  {
    title: "Best Interest rate in the market",
    description:
      "Time is of the essence in the real estate market. With our streamlined processes, we strive to expedite the application and approval process, ensuring you get the best interest rate without unnecessary delays.",
    icon: <StarIcon />,
  },
  {
    title: "Access to Multiple Lenders",
    description:
      "As a leading real estate platform, we collaborate with an extensive network of reputable lenders. This access allows us to present you with a wide range of interest rate options, giving you the freedom to choose what suits you best.",
    icon: <SwitchAccountIcon />,
  },
  {
    title: "Competitive Rates",
    description:
      "Our team tirelessly scouts the market to identify the most competitive interest rates available. We understand that even a fraction of a percentage can make a substantial difference in your monthly mortgage payments and overall financial stability.",
    icon: <PriceChangeIcon />,
  },
];

const MyAccordion = () => {
  const { palette } = useTheme();

  return (
    <Box component="div">
      {data.map((el, i) => (
        <Accordion key={`accordion-${i}`} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#3A55C7" }} />}
            aria-controls={`panel${i + 1}a-content`}
            id={`panel${i + 1}a-header`}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <IconButton
                sx={{
                  backgroundColor: "#F0EDFB",
                  borderRadius: "3px",
                  color: "#3A55C7",
                  "&:hover": {
                    backgroundColor: "#F0EDFB",
                    color: "#3A55C7",
                  },
                }}
                disableRipple
              >
                {el.icon}
              </IconButton>
              <Typography
                variant="body1"
                fontWeight={600}
                flexGrow={1}
                color={palette.my.main}
                textAlign="center"
                textTransform="capitalize"
              >
                {el.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="GrayText">
              {el.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MyAccordion;
