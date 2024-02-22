import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  useGetGenreListMovieQuery,
  useGetGenreListTvQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { selectMovieOrTv } from "../../features/currentMovieOrTv";

const categoriesMovies = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const categoriesTvSeries = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Airing Today", value: "airing_today" },
];

const blueLogo =
  // "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  "https://fontmeme.com/permalink/240220/05974bfdcffde3de1b3a9b580bf86e35.png";

const redLogo =
  // "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  "https://fontmeme.com/permalink/240220/81a6d656e697a72e577bdbbca951c847.png";

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const theme = useTheme();
  const classes = useStyles();
  const { data, error, isFetching } = useGetGenreListMovieQuery();
  const { data: tvData, isFetching: isTvFetching } = useGetGenreListTvQuery();

  const dispatch = useDispatch();
  const [wish, setWish] = useState("movie");
  const handleChange = (event, newWish) => {
    setWish(newWish);
    dispatch(selectMovieOrTv(newWish));
  };
  const categoryValue =
    wish === "movie" ? categoriesMovies : categoriesTvSeries;
  const dataMap = wish === "movie" ? data : tvData;

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <Box>
        <ToggleButtonGroup
          color="primary"
          value={wish}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="movie">Movies</ToggleButton>
          <ToggleButton value="tv">TV Series</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categoryValue.map(({ label, value }) => {
          return (
            <Link key={value} className={classes.links} to="/">
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(value))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    alt="image"
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          dataMap.genres.map(({ name, id }) => {
            return (
              <Link key={id} className={classes.links} to="/">
                <ListItemButton
                  onClick={() => dispatch(selectGenreOrCategory(id))}
                  button
                >
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      alt="image"
                      className={classes.genreImage}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            );
          })
        )}
      </List>
    </>
  );
};

export default Sidebar;
