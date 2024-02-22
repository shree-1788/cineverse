import React, { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils/index";
import {
  selectGenreOrCategory,
  selectSearchQuery,
} from "../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: "f36f2727ffbb99f122e801adf0fb62e22e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "chooseGenre") {
          const genre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (genre) {
            // navigate("/");
            console.log("genre", genre);
            // window.location.href = "/";
            dispatch(selectGenreOrCategory(genre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            // navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "search") {
          //   navigate("/");
          dispatch(selectSearchQuery(query));
        }
      },
    });
  }, []);
};

export default useAlan;
