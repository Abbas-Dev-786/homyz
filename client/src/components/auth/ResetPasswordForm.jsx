import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { Typography } from "@mui/material";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(resetPassword, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Password Reset Succesfull. Please Login");

      navigate("/login");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Both fields are mandatory.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password not matching.");
      return;
    }

    mutate({ password, confirmPassword, token });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Reset Password
      </Typography>

      <AuthInput
        label="Password"
        id="password"
        variant="outlined"
        type="password"
        placeholder="Enter your new Password"
        value={password}
        set={setPassword}
        fullWidth
        required
      />

      <AuthInput
        label="Confirm Password"
        id="confirmPassword"
        variant="outlined"
        type="password"
        placeholder="Confirm your new Password"
        value={confirmPassword}
        set={setconfirmPassword}
        fullWidth
        required
      />

      <AuthBtn
        type="submit"
        variant="contained"
        disabled={isLoading}
        size="large"
        sx={{ mt: 2 }}
        fullWidth
      >
        Reset Password
      </AuthBtn>
    </form>
  );
};

export default ResetPasswordForm;
