import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <Box
      height="75vh"
      display="flex"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography variant="h5" fontWeight={600} color="red" gutterBottom>
        Oops! Your payment has been Failed.
      </Typography>
      <Typography variant="body1" color="GrayText">
        We have updated your transaction in our system.
      </Typography>
      <Typography variant="caption" color="GrayText" mb={4}>
        We appreciate your Passians! If you have any questions, please email us
        at&nbsp;
        <u>
          <a href="mailto:test@gmail.com" target="_blank" rel="noreferrer">
            test@gmail.com
          </a>
        </u>
        .
      </Typography>

      <NavLink to="/">
        <Button variant="contained">Back to home</Button>
      </NavLink>
    </Box>
  );
};

export default PaymentFailed;
//  <>
//       <h4>Oops! Your payment has been cancelled.</h4>
//       <p>
//         We appreciate your business! If you have any questions, please email us
//         at
//         <a href="mailto:orders@example.com">orders@example.com</a>.
//       </p>
//       <div>
//         <button> Go to Home page</button>
//       </div>
//     </>
