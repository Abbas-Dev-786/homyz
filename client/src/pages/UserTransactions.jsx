import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "react-query";
import { getTransactions } from "../api";

const UserTransactions = () => {
  const { data, isLoading, error } = useQuery(
    ["transactions"],
    getTransactions
  );

  return (
    <>
      <Typography variant="h5" textAlign="center" mb={3} gutterBottom>
        Your Recent Transactions
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
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow key={row._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.property.title}</TableCell>
                <TableCell>{row.property.address}</TableCell>
                <TableCell>{row.property.city}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  {row.status.startsWith("s") ? "✅" : "❌"}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTransactions;
