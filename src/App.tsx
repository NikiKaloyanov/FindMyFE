import './App.css'
import Sidebar from "./Components/Sidebar";
import {Grid} from "@mui/material";

function App() {

  return (
    <Grid container>
        <Grid item>
            <Sidebar/>
        </Grid>
    </Grid>
  )
}

export default App
