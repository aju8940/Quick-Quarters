import React from "react";
import Home from "./pages/Home";
import { About } from "./pages/About";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SingIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
