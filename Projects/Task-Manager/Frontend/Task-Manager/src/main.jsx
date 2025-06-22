import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Mainpage from "./components/Mainpage.jsx";
import Signup from "./components/Signup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
