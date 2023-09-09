import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

const Input = styled(TextField)(() => ({
  background: "#37373E",
  borderRadius: 5,

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  "& label": {
    color: "#ccc",
  },
  input: {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
  },
}));

const AuthBtn = styled(Button)(() => ({
  backgroundColor: "#ccc",
  color: "black",
  fontWeight: 600,
  fontSize: 16,
  "&:hover": { background: "white" },
}));

export { Input, AuthBtn };
