import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { AuthBtn } from "./AuthComponents";
import useAuth from "../../hooks/useAuth";
import { googleAuth } from "../../api";

const GoogleBtn = ({ text }) => {
  const { setUserStorage } = useAuth();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(googleAuth, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      setUserStorage(data);

      toast.success("Login Successfull");

      navigate("/");
    },
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => mutate(tokenResponse.code),
    onError: (errorResponse) => toast.error(errorResponse),
    flow: "auth-code",
  });

  return (
    <AuthBtn
      variant="contained"
      disabled={isLoading}
      startIcon={<GoogleIcon />}
      sx={{ background: "#f7f7f7" }}
      fullWidth
      onClick={() => login()}
    >
      {text} With Google
    </AuthBtn>
  );
};

GoogleBtn.propTypes = {
  text: PropTypes.string,
};

export default GoogleBtn;
