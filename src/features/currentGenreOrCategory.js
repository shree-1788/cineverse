import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategorySlice = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    selectSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, selectSearchQuery } =
  genreOrCategorySlice.actions;
export default genreOrCategorySlice.reducer;
