import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  featuredClassContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    textDecoration: "none",
    height: "490px",
  },
  card: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
  },
  cardRoot: {
    position: "relative",
  },
  cardMedia: {
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    width: "100%",
    backgroundBlendMode: "darken",
    backgroundColor: "rgba(0,0,0,0.575)",
  },
  cardContent: {
    color: "white",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardContentRoot: {
    position: "relative",
    backgroundColor: "transparent",
  },
}));
