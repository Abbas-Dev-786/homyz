import PropTypes from "prop-types";
import { Input } from "./AuthComponents";

const AuthInput = ({ set, ...props }) => {
  return (
    <Input
      {...props}
      onChange={(e) => {
        set(e.target.value);
      }}
    />
  );
};

AuthInput.propTypes = {
  set: PropTypes.func,
};

export default AuthInput;
