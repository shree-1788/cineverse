import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetActorDetailsQuery } from "../../services/TMDB";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import useStyles from "./styles";
import {
  useGetActorMoviesByIdQuery,
  useGetActorTvSeriesByIdQuery,
} from "../../services/TMDB";
import { MovieList, Pagination } from "..";
import { useSelector } from "react-redux";

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery({ id });
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { tvOrMovieName } = useSelector((state) => state.currentMovieOrTv);
  // const history = useHistory();
  const navigate = useNavigate();
  // console.log(data);
  const { data: similarMovies, isFetching: isSimilarMoviesFetching } =
    useGetActorMoviesByIdQuery({ id, page });

  const { data: similarTvSeries, isFetching: isSimilarTvSeriesFetching } =
    useGetActorTvSeriesByIdQuery({ id, page });
  console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    console.log(error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} color="primary">
          <Typography variant="h3" component={Link} to="/">
            Go Back
          </Typography>
        </Button>
      </Box>
    );
  }

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          BORN ON: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="h8" align="center" gutterBottom>
          {data?.biography || "No biographt available"}
        </Typography>
        <Grid item>
          <Button
            variant="contained"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            <Typography variant="subtitle2" color="inherit">
              Back
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {tvOrMovieName === "tv" ? (
        <></>
      ) : (
        <Box margin="2rem 0">
          <Typography variant="h2">Movies</Typography>
          {similarMovies && (
            <MovieList movies={similarMovies} numberOfMovies={12} />
          )}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.total_pages}
          />
        </Box>
      )}
    </Grid>
  );
};

export default Actors;
