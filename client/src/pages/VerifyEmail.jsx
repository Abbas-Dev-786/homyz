import { Typography } from "@mui/material";
import AuthBox from "../components/auth/AuthBox";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../api";

const VerifyEmail = () => {
  const { token } = useParams();
  const {
    data: message,
    error,
    isLoading,
  } = useQuery(["verifyEmail", token], verifyEmail);

  return (
    <AuthBox>
      <Typography variant="body1" textAlign="center" fontWeight={600}>
        {isLoading && "Checking....."}
        {error ? error.message : message}
      </Typography>
    </AuthBox>
  );
};

export default VerifyEmail;
