import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../service/apiclient";
import Login from "./Login";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await apiClient.resetPassword(token, password, confPassword);
      if (data.message) {
        setPasswordChangeSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } else {
        setMessage("Failed to change the password");
      }
    } catch (error) {
      console.error("Error in resetPassword:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Reset password failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {message && <div style={styles.toast}>{message}</div>}
      {passwordChangeSuccess ? (
        <div>
          <p style={styles.successText}>{message}</p>
          <Login />
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.heading}>Reset Password</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="confPassword" style={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {error && <p style={styles.errorText}>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#0f172a",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
    color: "#334155",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "8px",
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: "16px",
    textAlign: "center",
    fontWeight: "bold",
  },
  toast: {
    position: "fixed",
    top: "20px",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    fontWeight: "bold",
  },
};

export default ResetPassword;
