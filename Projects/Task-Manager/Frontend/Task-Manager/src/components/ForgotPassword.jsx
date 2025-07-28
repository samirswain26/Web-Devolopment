import { useState } from "react";
import apiClient from "../../service/apiclient";
import { Link } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Trying to forgot password");
      console.log(typeof email);
      const data = await apiClient.forgot(email);
      console.log("Forgot data: ", data);
    } catch (error) {
      console.log(error);
      setError("Forgot password Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div style={styles.container}>
    //   <div style={styles.card}>
    //     <h1 style={styles.heading}>Forgot Password</h1>
    //     <form style={styles.form} onSubmit={handleSubmit}>
    //       <div className="Forgotemail">
    //         <label htmlFor="email">email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit" disabled={loading}>
    //         {loading ? "Submit..." : "Submit"}
    //       </button>
    //       {error && <p style={{ color: "red" }}>{error}</p>}
    //     </form>
    //     <p>
    //       <Link to={"/Login"}> Back to Login </Link>
    //     </p>
    //   </div>
    // </div>

    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <div style={styles.lockIcon}>🔒</div>
        </div>

        <h1 style={styles.heading}>Forgot Password?</h1>
        <p style={styles.subtitle}>
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            // onSubmit={handleSubmit}
            disabled={loading || !email}
            style={loading || !email ? styles.buttonDisabled : styles.button}
          >
            {loading ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner}></span>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {error && (
            <div style={styles.errorMessage}>
              <span style={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Remember your password?
            <a href="/Login" style={styles.link}>
              {" "}
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "48px 40px",
    borderRadius: "20px",
    boxShadow:
      "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    width: "100%",
    maxWidth: "440px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  iconContainer: {
    marginBottom: "24px",
  },
  lockIcon: {
    fontSize: "48px",
    opacity: "0.8",
  },
  successIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#10b981",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 auto 24px auto",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#1f2937",
    letterSpacing: "-0.025em",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "32px",
    lineHeight: "1.5",
  },
  successText: {
    fontSize: "16px",
    color: "#374151",
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  instructionText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "32px",
    lineHeight: "1.5",
  },
  form: {
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "16px",
    transition: "all 0.2s ease",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "14px 24px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px 24px",
    backgroundColor: "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    transition: "all 0.2s ease",
    marginBottom: "16px",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  backButton: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "14px",
    marginTop: "16px",
  },
  errorIcon: {
    fontSize: "16px",
  },
  footer: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e5e7eb",
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
};
