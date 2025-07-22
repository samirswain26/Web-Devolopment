import { useEffect, useState } from "react";
import apiClient from "../../service/apiclient.js";
import { Link, useNavigate } from "react-router";
import Mainpage from "./Mainpage";

import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Trying to login");
      const data = await apiClient.login(email, password);
      console.log("login data:", data);

      if (data.message === "user Logged In Successfully") {
        // Extract user and tokens
        const user = data.data.user;
        const accessToken = data.data.accessToken;
        const refreshToken = data.data.refreshToken;

        if (!user || !accessToken) {
          throw new Error("Invalid login response. User or token missing.");
        }

        // Set cookies
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 1 });

        setLoginSuccess(true);
        setMessage("Login Successfully");

        // Delay redirect so success message is visible
        setTimeout(() => {
          setMessage("");
          navigate("/Mainpage");
        }, 2000);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            center: "50px",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
      {loginSuccess ? (
        <>
          {/* <p style={{ color: "White", fontWeight: "bold" }}>{message}</p> */}
          <Mainpage />
        </>
      ) : (
        <>
          <h1>Welcome to login page</h1>
          <form onSubmit={handleSubmit}>
            <div className="Email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <p>
            Don't have an account!? <Link to={"/Signup"}>Signup Up</Link>
          </p>
          <p>
            <Link to={"/ForgotPassword"}> Forgot Password </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
