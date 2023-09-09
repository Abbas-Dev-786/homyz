import {
  Autocomplete,
  Box,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useQuery } from "react-query";
import { getCities } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery(["cities"], getCities);

  const handleSearch = (e) => {
    e.preventDefault();

    city && navigate(`/properties/city/${city}`);
  };

  return (
    <Box
      bgcolor="white"
      component="form"
      width={{ xs: "80vw", sm: 400 }}
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent="space-between"
      mt={3}
      px={2}
      py={1}
      borderRadius={1}
      onSubmit={handleSearch}
    >
      <Autocomplete
        disablePortal={true}
        id="search-bar"
        options={data || []}
        autoHighlight={true}
        size="small"
        freeSolo
        fullWidth
        inputValue={city}
        getOptionLabel={(option) => option._id ?? option}
        sx={{
          background: "transparent",
        }}
        onInputChange={(_, newCity) => {
          setCity(newCity);
        }}
        renderInput={(params) => (
          <TextField
            label="Search for places"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon color="primary" />
                </InputAdornment>
              ),
            }}
            {...params}
          />
        )}
      />

      <Button variant="contained" size="small" type="submit">
        Search
      </Button>
    </Box>
  );
}

export default Searchbar;
