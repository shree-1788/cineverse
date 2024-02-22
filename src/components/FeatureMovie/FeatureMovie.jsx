import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { Movie } from "../index";
import { useDispatch, useSelector } from "react-redux";

const FeatureMovie = ({ movie }) => {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className={classes.featuredClassContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          className={classes.cardMedia}
          alt={movie.title}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        />
        <Box padding="20px">
          <CardContent
            className={classes.cardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography variant="h5" gutterBottom>
              {movie.title || movie.original_name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeatureMovie;
