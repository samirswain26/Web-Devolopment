import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Mainpage from "./components/Mainpage.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import Profile from "./components/Profile.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import VerificationResult from "./components/VerifyEmail.jsx";
import Project from "./components/JoinedProjects.jsx";
import DashBoard from "./components/ProjectDashBoard.jsx";
import Tasks from "./components/Tasks.jsx";
import PrivacyPolicy from "./components/privacy.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route path="/email-verified" element={<VerificationResult />} />
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
        <Route
          path="/Project"
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
        <Route
          path="/Task"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/Project-Dash"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
