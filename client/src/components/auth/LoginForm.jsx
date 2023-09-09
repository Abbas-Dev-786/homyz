import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";
import GoogleBtn from "./GoogleBtn";
import { LoginUser } from "../../api";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserStorage } = useAuth();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(LoginUser, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      setUserStorage(data);

      toast.success("Login Successfull");

      navigate("/");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!(email && password)) {
      toast.error("All fields are required");
      return;
    }

    mutate({ email, password });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Login Here
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
      <AuthInput
        label="Password"
        id="password"
        variant="outlined"
        type="password"
        placeholder="Enter Password"
        value={password}
        set={setPassword}
        fullWidth
        required
      />

      <Typography variant="caption" textAlign="right" color="primary">
        <Link to="/forgotPassword">
          <u>Forgot Password?</u>
        </Link>
      </Typography>

      <AuthBtn
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 2 }}
        fullWidth
      >
        Login
      </AuthBtn>

      <GoogleBtn text="Login" />

      <Typography variant="body2" textAlign="center">
        Does not have account?{" "}
        <Link to="/register">
          <u>Register Here</u>
        </Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
