import React from "react";
import { useGetTvSeriesDetailsQuery } from "../../services/TMDB";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Rating } from "@mui/material";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";
import { MovieList } from "../";
import { useGetTvSeriesRecommendationsQuery } from "../../services/TMDB";
const TvSeriesInformation = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetTvSeriesDetailsQuery({ id });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: recommendations } = useGetTvSeriesRecommendationsQuery({
    tv_id: id,
    list: "/recommendations",
  });
  console.log(data);
  return (
    <Grid className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.original_name}
          className={classes.poster}
        />
      </Grid>
      <Grid item container lg={7} direction="column">
        <Typography variant="h3">
          {data?.original_name} &nbsp; ({data?.first_air_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item container className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30px",
                textDecoration: "none",
              }}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="image"
                className={classes.genreImage}
                height={30}
              />
              <Typography color="primary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2}></Rating>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.spoken_languages.length > 0
              ? `${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item container direction="column" marginTop="10px">
          {/* <Typography variant="h5">{data?.spoken_language[0].name}</Typography> */}
          <Typography variant="h6" gutterBottom>
            Status: {data?.status}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Np. of seasons: &nbsp; {data?.number_of_seasons}
          </Typography>
          <Typography variant="h6" gutterBottom>
            No. of episodes: &nbsp; {data?.number_of_episodes}
          </Typography>
        </Grid>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                        style={{
                          width: "100%",
                          maxWidth: "7em",
                          height: "8em",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
      </Grid>
      {/* <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
      </Box> */}
    </Grid>
  );
};

export default TvSeriesInformation;
