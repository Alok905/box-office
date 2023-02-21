import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Starred from "./pages/Starred";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/starred" element={<Starred />}></Route>
        <Route path="/show/:id" element={<Show />}></Route>
        <Route path="/*" element={<div>Not found</div>}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
