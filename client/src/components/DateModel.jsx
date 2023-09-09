import PropTypes from "prop-types";
import { useState } from "react";
import dayjs from "dayjs";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { createView } from "../api";

const DateModel = ({ open, set }) => {
  const { id } = useParams();
  const [dateAndTime, setDateAndTime] = useState(dayjs());

  const { mutate } = useMutation(createView, {
    onError: (err) => {
      // console.log(err);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Your visit Booked Successfully.");
      set(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ startTime: dateAndTime, id });
  };

  return (
    <Modal
      open={open}
      onClose={() => set(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 200, sm: 300, md: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={600}
          component="h2"
          gutterBottom
        >
          Book Your Visit for The Property
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["MobileDateTimePicker"]}>
            <DemoItem label="Select Date and Time">
              <DateTimePicker
                value={dateAndTime}
                minDate={dayjs()}
                onChange={(newValue) => setDateAndTime(newValue)}
                defaultValue={dayjs()}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, display: "block", mx: "auto" }}
          onClick={handleSubmit}
        >
          Book Visit
        </Button>
      </Box>
    </Modal>
  );
};

DateModel.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.func,
};

export default DateModel;
