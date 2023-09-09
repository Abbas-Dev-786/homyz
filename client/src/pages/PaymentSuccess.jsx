import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Box
      height="75vh"
      display="flex"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography variant="h5" fontWeight={600} color="green" gutterBottom>
        Transaction Successfull!
      </Typography>
      <Typography variant="body1" color="GrayText">
        We have updated your transaction in our system.
      </Typography>
      <Typography variant="caption" color="GrayText" mb={3}>
        We appreciate your Passians! If you have any questions, please email us
        at&nbsp;
        <u>
          <a href="mailto:test@gmail.com" target="_blank" rel="noreferrer">
            test@gmail.com
          </a>
        </u>
        .
      </Typography>

      <NavLink to="/user/transactions">
        <Button variant="contained">View Transactions</Button>
      </NavLink>
    </Box>
  );
};

export default PaymentSuccess;
