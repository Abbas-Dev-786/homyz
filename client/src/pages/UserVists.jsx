import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { deleteView, getME } from "../api";

const now = dayjs();
const UserVists = () => {
  const { data, isLoading, error } = useQuery(["me"], getME);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteView, {
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Visit Deleted Successfully");
    },
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleString().split(",").join(" at ");
  };

  return (
    <>
      <Typography variant="h5" textAlign="center" mb={3} gutterBottom>
        Visits you have Booked
      </Typography>

      {isLoading && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress color="warning" />
        </Box>
      )}

      {error && (
        <Typography variant="body1" textAlign="center" color="red">
          {error.message}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Visited At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.views?.map((row, i) => (
              <TableRow key={row._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.property.title}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{row.property.address}</TableCell>
                <TableCell>{row.property.city}</TableCell>
                <TableCell>{formatDate(row.startTime)}</TableCell>
                <TableCell>
                  {now.diff(row.startTime, "minute") < 0
                    ? "Pending"
                    : "Visited"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => mutate(row._id)}>
                    <DeleteRoundedIcon htmlColor="red" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserVists;
