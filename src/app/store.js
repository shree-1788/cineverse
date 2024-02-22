import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import movieOrTvReducer from "../features/currentMovieOrTv";
import userReducer from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
    currentMovieOrTv: movieOrTvReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
