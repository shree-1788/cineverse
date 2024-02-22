import React, { useState, useEffect } from "react";
import {
  useGetPopularMoviesQuery,
  useGetPopularTvQuery,
} from "../../services/TMDB";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { MovieList, Pagination } from "../";
import {
  selectGenreOrCategory,
  selectSearchQuery,
} from "../../features/currentGenreOrCategory";
import { FeatureMovie } from "../index";

const Movies = () => {
  const [page, setPage] = React.useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { movieOrTvName } = useSelector((state) => state.currentMovieOrTv);

  const { data, error, isFetching } = useGetPopularMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });
  const { data: tvData, isFetching: isTvFetching } = useGetPopularTvQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  if (movieOrTvName === "movie" ? isFetching : isTvFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (
    movieOrTvName === "movie" ? !data.results.length : !tvData.results.length
  ) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for somethig else
        </Typography>
      </Box>
    );
  }
  // if (error) return "An error has occured";

  return (
    <div>
      {" "}
      {movieOrTvName === "movie" ? (
        <>
          <FeatureMovie movie={data.results[0]} />
          <MovieList movies={data} excludeFirst />
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.total_pages}
          />
        </>
      ) : (
        <>
          <FeatureMovie movie={tvData.results[0]} />
          <MovieList movies={tvData} excludeFirst />

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={tvData.total_pages}
          />
        </>
      )}
    </div>
  );
};

export default Movies;
