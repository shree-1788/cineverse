import React from "react";
import { Button, Typography, Box } from "@mui/material";

const Pagination = ({ page, setPage, totalPages }) => {
  const prevChange = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  const nextChange = () => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        onClick={prevChange}
        style={{
          paddingRight: "10px",
          marginRight: "20px",
          marginBottom: "20px",
        }}
      >
        Prev
      </Button>
      <Typography variant="h5">{page} </Typography>
      <Button
        variant="contained"
        onClick={nextChange}
        style={{
          paddingRight: "10px",
          marginLeft: "20px",
          marginBottom: "20px",
        }}
      >
        Next
      </Button>
      {page > totalPages && <Typography>No more movies</Typography>}
    </Box>
  );
};

export default Pagination;
