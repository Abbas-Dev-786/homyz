import { Typography, TextField, Box, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import { updateME } from "../../api";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const {
    user: { user },
    updateUserStorage,
  } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const { mutate, isLoading } = useMutation(updateME, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      updateUserStorage(data);
      toast.success("Data updatation successfull");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = { firstName, lastName };

    if (firstName === user?.firstName && lastName === user?.lastName) {
      toast.error("Same values");
      return;
    }

    mutate({ id: user._id, data });
  };

  return (
    <>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Edit User Profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleFormSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
        mt={5}
      >
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          fullWidth
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Enter your Last name"
          fullWidth
        />

        <Typography variant="caption" color="red">
          <b>NOTE:-</b> Email addresses could not be change.
        </Typography>

        <Button type="submit" variant="contained" disabled={isLoading}>
          Change Profile Details
        </Button>
      </Box>
    </>
  );
};

export default ProfileForm;
