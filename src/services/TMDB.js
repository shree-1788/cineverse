import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    // get genre list (name -> genre)
    getGenreListMovie: builder.query({
      query: () => `genre/movie/list?&api_key=${API_KEY}`,
    }),

    // get movies based on search and genre
    getPopularMovies: builder.query({
      query: ({ genreIdOrCategoryName, searchQuery, page }) => {
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${API_KEY}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`;
        }
        return `movie/popular?page=${page}&api_key=${API_KEY}`;
      },
    }),

    // get movie details
    getMovie: builder.query({
      query: ({ id }) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),

    // get user specific list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`,
    }),

    // get movie recommendations
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${API_KEY}`,
    }),

    // get actor details  (name, birthday, etc)
    getActorDetails: builder.query({
      query: ({ id }) => `person/${id}?api_key=${API_KEY}`,
    }),

    // get actor movies by id
    getActorMoviesById: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`,
    }),

    // get popular TV series
    getPopularTv: builder.query({
      query: ({ genreIdOrCategoryName, searchQuery, page }) => {
        if (searchQuery) {
          return `search/tv?query=${searchQuery}&page=${page}&api_key=${API_KEY}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `tv/${genreIdOrCategoryName}?page=${page}&api_key=${API_KEY}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/tv?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`;
        }
        return `tv/popular?page=${page}&api_key=${API_KEY}`;
      },
    }),

    // get genre list Tv series
    getGenreListTv: builder.query({
      query: () => `genre/tv/list?&api_key=${API_KEY}`,
    }),

    // get tv series details
    getTvSeriesDetails: builder.query({
      query: ({ id }) =>
        `/tv/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),

    // get tv series recommendations
    getTvSeriesRecommendations: builder.query({
      query: ({ tv_id, list }) => `/tv/${tv_id}/${list}?api_key=${API_KEY}`,
    }),

    // get series by actor id
    getActorTvSeriesById: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetActorMoviesByIdQuery,
  useGetGenreListMovieQuery,
  useGetListQuery,
  useGetPopularTvQuery,
  useGetGenreListTvQuery,
  useGetTvSeriesDetailsQuery,
  useGetTvSeriesRecommendationsQuery,
  useGetActorTvSeriesByIdQuery,
} = tmdbApi;
