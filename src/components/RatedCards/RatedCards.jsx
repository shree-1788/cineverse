import React from "react";
import { Typography, Box } from "@mui/material";
import useStyles from "./styles";
import { Movie } from "../index";

const RatedCards = ({ title, data }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, id) => (
          <Movie key={movie.id} movie={movie} i={id} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
