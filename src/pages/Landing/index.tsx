import "./Landing.css";
import {Grid} from "@mui/material";
import Sidebar from "../../components/Sidebar";

const Landing = () => {
  return <Grid container className="app">
    <Grid item xs={2} className="app">
      <Sidebar />
    </Grid>
    <Grid item xs={10} className="app">
      <Sidebar />
    </Grid>
  </Grid>;
};

export default Landing;
