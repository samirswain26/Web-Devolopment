// import { useEffect, useState } from "react";
// import apiClient from "../../service/apiclient.js";
// import { Link, useNavigate } from "react-router";
// import Mainpage from "./Mainpage";

// import Cookies from "js-cookie";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [message, setMessage] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       console.log("Trying to login");
//       const data = await apiClient.login(email, password);
//       console.log("login data:", data);

//       if (data.message === "user Logged In Successfully") {
//         // Extract user and tokens
//         const user = data.data.user;
//         const accessToken = data.data.accessToken;
//         const refreshToken = data.data.refreshToken;

//         if (!user || !accessToken) {
//           throw new Error("Invalid login response. User or token missing.");
//         }

//         // Set cookies
//         Cookies.set("user", JSON.stringify(user), { expires: 1 });
//         Cookies.set("accessToken", accessToken, { expires: 1 });
//         Cookies.set("refreshToken", refreshToken, { expires: 1 });

//         setLoginSuccess(true);
//         setMessage("Login Successfully");

//         // Delay redirect so success message is visible
//         setTimeout(() => {
//           setMessage("");
//           navigate("/Mainpage");
//         }, 2000);
//       } else {
//         setError("Login failed");
//       }
//     } catch (error) {
//       console.log("Login error:", error);
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Invalid credentials");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {message && (
//         <div
//           style={{
//             position: "fixed",
//             top: "10px",
//             center: "50px",
//             backgroundColor: "green",
//             color: "white",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//             zIndex: 1000,
//           }}
//         >
//           {message}
//         </div>
//       )}
//       {loginSuccess ? (
//         <>
//           {/* <p style={{ color: "White", fontWeight: "bold" }}>{message}</p> */}
//           <Mainpage />
//         </>
//       ) : (
//         <>
//           <h1>Welcome to login page</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="Email">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="password">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//           </form>
//           <p>
//             Don't have an account!? <Link to={"/Signup"}>Signup Up</Link>
//           </p>
//           <p>
//             <Link to={"/ForgotPassword"}> Forgot Password </Link>
//           </p>
//         </>
//       )}
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../service/apiclient";
import Cookies from "js-cookie";
import Mainpage from "./Mainpage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiClient.login(email, password);

      if (data.message === "user Logged In Successfully") {
        const user = data.data.user;
        const accessToken = data.data.accessToken;
        const refreshToken = data.data.refreshToken;

        Cookies.set("user", JSON.stringify(user), { expires: 1 });
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 1 });

        setLoginSuccess(true);
        setMessage("Login Successful!");

        setTimeout(() => {
          setMessage("");
          navigate("/Mainpage");
        }, 2000);
      } else {
        setError("Login failed");
      }
    } catch (error) {
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
    <div style={styles.wrapper}>
      {message && <div style={styles.success}>{message}</div>}
      {loginSuccess ? (
        <Mainpage />
      ) : (
        <div style={styles.card}>
          <img
            src="Logo.png"
            alt="logo"
            style={{ height: 40, marginBottom: 10 }}
          />
          <h2 style={styles.heading}>Log in to your account</h2>
          <p style={styles.subheading}>
            New to Learnyst?{" "}
            <a href="#" style={{ color: "#1a73e8", textDecoration: "none" }}>
              Try 14–day Free Trial
            </a>
          </p>
          {/* <button style={styles.googleBtn}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: 18, marginRight: 8 }}
            />
            Continue with Google
          </button>
          <div style={styles.divider}>OR</div> */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="email" style={styles.label}>
              Email*
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>
              Password*
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            {error && <p style={styles.error}>{error}</p>}
          </form>

          <div style={styles.footer}>
            <Link to="/ForgotPassword" style={styles.link}>
              Forgot Password?
            </Link>
            <p style={{ marginTop: 10 }}>
              Need a Learnyst account?{" "}
              <Link to="/Signup" style={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    background: "linear-gradient(to right, #6f42c1, #a18cd1)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px 30px",
    borderRadius: 12,
    width: 360,
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 13,
    marginBottom: 20,
    color: "#6c757d",
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: "10px",
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
    marginBottom: 20,
  },
  divider: {
    margin: "10px 0",
    fontSize: 12,
    color: "#999",
  },
  form: {
    textAlign: "left",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    display: "block",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6f42c1",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  success: {
    position: "fixed",
    top: "15px",
    backgroundColor: "green",
    color: "white",
    padding: "10px 25px",
    borderRadius: "6px",
    zIndex: 1000,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: "#1a73e8",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default Login;
