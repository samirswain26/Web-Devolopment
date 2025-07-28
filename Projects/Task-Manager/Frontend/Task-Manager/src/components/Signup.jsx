// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import apiClient from "../../service/apiclient";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const data = await apiClient.signup(username, email, password, fullname);
//       console.log(`Signup date : ${data}`);
//       setMessage(data.message);

//       //   clear Form
//       setUsername("");
//       setEmail("");
//       setFullname("");
//       setFullname("");

//       setTimeout(() => {
//         navigate("/Login");
//       }, 2000);
//     } catch (error) {
//       setError("Signup failed. Try again");
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Taskyst</h2>
//       <h1>Signup Page</h1>
//       <form onSubmit={handlesubmit}>
//         <div className="username">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="Email">
//           <label htmlFor="email">email</label>
//           <input
//             type="text"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="fullname">
//           <label htmlFor="fullname">Fullname</label>
//           <input
//             type="text"
//             name="fullname"
//             id="fullname"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             required
//           />
//         </div>
//         <div className="password">
//           <label htmlFor="password">Password</label>
//           <input
//             type="text"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "signup..." : "signup"}
//         </button>
//         <p>
//           Already have an accont? <Link to={"/Login"}>Login</Link>
//         </p>

//         {message && (
//           <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>
//         )}
//         {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../../service/apiclient";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await apiClient.signup(username, email, password, fullname);
      console.log(`Signup data:`, data);

      // Set success message from backend or default
      setMessage(data.message || "Verification token was sent to your email.");

      // Clear form
      setUsername("");
      setEmail("");
      setFullname("");
      setPassword("");

      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      console.log("Full error object:", error);

      let errorMessage = "Signup failed. Please try again.";

      // Handle different types of errors
      if (error.response) {
        console.log("Error response status:", error.response.status);
        console.log("Error response data:", error.response.data);

        // Check if the response is HTML (like your backend is sending)
        if (
          typeof error.response.data === "string" &&
          error.response.data.includes("<!DOCTYPE")
        ) {
          // Extract error message from HTML
          const htmlContent = error.response.data;

          // Look for error message in the HTML content
          const errorPatterns = [
            /<pre>Error:\s*([^<]+)<\/pre>/i,
            /Error:\s*([^<\n]+)/i,
            /<title>([^<]+)<\/title>/i,
          ];

          for (const pattern of errorPatterns) {
            const match = htmlContent.match(pattern);
            if (match && match[1]) {
              errorMessage = match[1].trim();
              break;
            }
          }

          // If no specific error found, use status-based messages
          if (errorMessage === "Signup failed. Please try again.") {
            switch (error.response.status) {
              case 400:
                errorMessage =
                  "Invalid data provided. Please check your inputs.";
                break;
              case 409:
                errorMessage =
                  "User already exists with this email or username.";
                break;
              case 422:
                errorMessage =
                  "Validation failed. Please fill all fields correctly.";
                break;
              case 500:
                errorMessage = "Server error. Please try again later.";
                break;
              default:
                errorMessage = `Request failed with status ${error.response.status}`;
            }
          }
        }
        // Handle JSON error responses
        else if (
          error.response.data &&
          typeof error.response.data === "object"
        ) {
          errorMessage =
            error.response.data.message ||
            error.response.data.error ||
            errorMessage;
        }
        // Handle plain text responses
        else if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        }
      }
      // Handle JSON parsing errors (like the one you're seeing)
      else if (error.message && error.message.includes("Unexpected token")) {
        errorMessage =
          "Server returned invalid response. Please check your input data.";
      }
      // Network error or no response
      else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }
      // Other errors
      else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.signupContainer}>
        <div style={styles.signupCard}>
          <div style={styles.cardBorder}></div>

          <div style={styles.brandSection}>
            <div style={styles.brandLogo}>
              <div style={styles.logoCircle}>T</div>
              <span style={styles.brandName}>TASKYST</span>
            </div>
          </div>

          <div style={styles.signupHeader}>
            <h1 style={styles.signupTitle}>Start your journey</h1>
            <p style={styles.signupSubtitle}>
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handlesubmit} style={styles.signupForm}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.formLabel}>
                Username*
              </label>
              <input
                type="text"
                name="username"
                id="username"
                style={styles.formInput}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.formLabel}>
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                style={styles.formInput}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="fullname" style={styles.formLabel}>
                Full Name*
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                style={styles.formInput}
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.formLabel}>
                Password*
              </label>
              <div style={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  style={styles.passwordInput}
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#374151";
                    e.target.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#6b7280";
                    e.target.style.background = "none";
                  }}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.signupButton,
                ...(loading ? styles.signupButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 10px 20px rgba(102, 126, 234, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {loading ? (
                <div style={styles.loadingSpinner}>
                  <div style={styles.spinner}></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {message && (
              <div style={{ ...styles.message, ...styles.successMessage }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                {message}
              </div>
            )}
            {error && (
              <div style={{ ...styles.message, ...styles.errorMessage }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            <p style={styles.loginLink}>
              Already have an account?{" "}
              <Link
                to="/Login"
                style={styles.link}
                onMouseEnter={(e) => {
                  e.target.style.color = "#5a67d8";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#667eea";
                  e.target.style.textDecoration = "none";
                }}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;

const styles = {
  signupContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  },
  signupCard: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    padding: "48px",
    width: "100%",
    maxWidth: "440px",
    position: "relative",
    overflow: "hidden",
  },
  cardBorder: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
  },
  brandSection: {
    textAlign: "center",
    marginBottom: "32px",
  },
  brandLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  logoCircle: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },
  brandName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  signupHeader: {
    textAlign: "center",
    marginBottom: "32px",
  },
  signupTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },
  signupSubtitle: {
    color: "#666",
    fontSize: "16px",
    margin: 0,
    lineHeight: "1.5",
  },
  signupForm: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "24px",
  },
  formLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    letterSpacing: "0.025em",
  },
  formInput: {
    width: "100%",
    padding: "16px 20px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#1a1a1a",
    background: "#fff",
    transition: "all 0.2s ease",
    outline: "none",
    boxSizing: "border-box",
  },
  formInputFocus: {
    borderColor: "#667eea",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
  },
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    padding: "16px 56px 16px 20px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#1a1a1a",
    background: "#fff",
    transition: "all 0.2s ease",
    outline: "none",
    boxSizing: "border-box",
  },
  passwordToggle: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordToggleHover: {
    color: "#374151",
    background: "#f3f4f6",
  },
  signupButton: {
    width: "100%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "56px",
    boxSizing: "border-box",
  },
  signupButtonDisabled: {
    opacity: "0.7",
    cursor: "not-allowed",
  },
  loadingSpinner: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  message: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  successMessage: {
    background: "#f0f9f4",
    color: "#166534",
    border: "1px solid #bbf7d0",
  },
  errorMessage: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  },
  loginLink: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    margin: 0,
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
  linkHover: {
    color: "#5a67d8",
    textDecoration: "underline",
  },
};
