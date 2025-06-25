import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Mainpage from "./components/Mainpage.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import Profile from "./components/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route
          path="/Mainpage"
          element={
            <PrivateRoute>
              <Mainpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
