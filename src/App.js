import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage/index";
import HomePage from "scenes/homePage/index";
import ProfilePage from "scenes/profilePage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route 
          path="/home" 
          element={isAuth ? <HomePage /> : <Navigate to="/"/> }></Route>
          {/* for the profile path we need the userid for specific profile-params given to backend */}
          <Route 
          path="/profile/:userId" 
          element={ isAuth ? <ProfilePage /> : <Navigate to="/" /> }></Route>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
