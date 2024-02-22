import React, { useEffect } from "react";
import { userSelector } from "../../features/auth";
import { useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import RatedCards from "../RatedCards/RatedCards";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    accountId: user.id,
    listName: "favorite/movies",
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      accountId: user.id,
      listName: "watchlist/movies",
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h6" gutterBottom>
          You have no favorite movies
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
