import { createSlice } from "@reduxjs/toolkit";

export const movieOrTvSlice = createSlice({
  name: "movieOrTv",
  initialState: {
    movieOrTvName: "movie",
  },
  reducers: {
    selectMovieOrTv: (state, action) => {
      state.movieOrTvName = action.payload;
    },
  },
});

export const { selectMovieOrTv } = movieOrTvSlice.actions;
export default movieOrTvSlice.reducer;
