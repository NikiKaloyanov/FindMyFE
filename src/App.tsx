import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import Landing from "./pages/Landing";
import { RoomsHookContext } from "./hooks/useHooksContext.tsx";
import Settings from "./components/Settings";

const defaultTheme = createTheme();

function App() {
  const content = (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<SignInSide />} />
          <Route index path={"/app"} element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );

  return <RoomsHookContext children={content} />;
}

export default App;
