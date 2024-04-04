import {Home} from "./pages/Home";
import { About } from "./pages/About";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Profile} from "./pages/Profile";
import {Header} from "./components/Header";
import {PrivateRoute} from "./components/PrivateRoute";
import {CreateListing} from "./pages/CreateListing";
import {UpdateListing} from "./pages/UpdateListing";
import {Listing } from "./pages/Listing ";
import { Search } from "./pages/Search";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        <Route path="/listing/:id" element={<Listing  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
