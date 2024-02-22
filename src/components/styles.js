import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    height: "80px",
    marginTop: "60px",
    marginLeft: "240px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      flexWrap: "wrap",
    },
  },
  content: {
    flexGrow: "1",
    padding: "2em",
  },
}));
