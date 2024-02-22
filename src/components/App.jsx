import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Movies,
  MovieInformation,
  Actors,
  Navbar,
  Profile,
  TvSeriesInformation,
} from "./";
import useStyles from "./styles";
import { CssBaseline } from "@mui/material";
import useAlan from "./Alan";
const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar />

      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Routes>
            <Route exact path="/" element={<Movies />} />
            <Route exact path="/movie/:id" element={<MovieInformation />} />
            <Route exact path="/series/:id" element={<TvSeriesInformation />} />
            <Route exact path="/actors/:id" element={<Actors />} />
            <Route exact path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
