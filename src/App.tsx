import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import Landing from "./pages/Landing";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<SignInSide />} />
          <Route index path={"/app"} element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
