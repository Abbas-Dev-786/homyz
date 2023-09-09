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
  Button,
} from "@mui/material";
import { useQuery } from "react-query";
import { getME } from "../api";
import { NavLink } from "react-router-dom";

const UserProperties = () => {
  const { data, isLoading, error } = useQuery(["me"], getME);

  return (
    <>
      <Typography variant="h5" textAlign="center" mb={3} gutterBottom>
        Properties you have purchased
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
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.propertiesPurchased?.map((row, i) => (
              <TableRow key={row._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.price}</TableCell>

                <TableCell>
                  <NavLink
                    to={`/properties/city/${row.city}/property/${row.id}`}
                  >
                    <Button variant="contained" size="small">
                      View
                    </Button>
                  </NavLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserProperties;
