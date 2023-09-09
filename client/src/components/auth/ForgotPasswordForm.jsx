import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { Typography } from "@mui/material";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";
import { forgotPassword } from "../../api";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(
        "Mail has been sent to your email address. Please check and follow the next steps"
      );
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required to reset the password");
      return;
    }

    mutate({ email });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Forgot Password
      </Typography>
      <Typography variant="body2" textAlign="center">
        We will send a password reset mail to your email account. After
        submitting your email address please check your inbox. Then click on the
        link to complete the process
      </Typography>

      <AuthInput
        label="Email"
        id="email"
        variant="outlined"
        type="email"
        placeholder="Enter Email address"
        value={email}
        set={setEmail}
        fullWidth
        required
      />
      <AuthBtn
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 2 }}
        fullWidth
      >
        Send Mail
      </AuthBtn>
    </form>
  );
};

export default ForgotPasswordForm;
