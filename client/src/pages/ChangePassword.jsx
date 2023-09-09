import { Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { updatePassword } from "../api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate } = useMutation(updatePassword, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Password changed Successfull");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password not matching");
      return;
    }

    mutate({ confirmPassword, password, currentPassword });

    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Change User Password
      </Typography>

      <Box
        component="form"
        display="flex"
        onSubmit={handleFormSubmit}
        flexDirection="column"
        gap={3}
        mt={5}
      >
        <TextField
          id="currentPassword"
          label="Current Password"
          variant="outlined"
          type="password"
          placeholder="Enter your Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="password"
          label="New Password"
          variant="outlined"
          type="password"
          placeholder="Enter your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          placeholder="Enter your Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained">
          Change Password
        </Button>
      </Box>
    </>
  );
};

export default ChangePassword;
