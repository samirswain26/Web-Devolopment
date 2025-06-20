import { useEffect, useState } from "react";
import apiClient from "../../service/apiClient";
import { Link, useNavigate } from "react-router";
import Mainpage from "./Mainpage";

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
      console.log("Tyring to login");
      const data = await apiClient.login(email, password);
      console.log(`login data: `, data);

      if (data.message === "Login Successful") {
        setLoginSuccess(true);
        setMessage("Login Successfully completed ");

        // Remove the message after 3 seconds
        setTimeout(() => {
          setMessage("");
          // navigate("/Mainpage")
        }, 3000);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("something went wrong");
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
              {
                <Link to={"/Mainpage"}>
                  {loading ? "Logging in..." : "Login"}
                </Link>
              }
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <p>
            Don't have an account!? <Link to={"/Signup"}>Signup Up</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
