import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../service/apiclient";
import Login from "./Login";

function ResetPassword() {
  const { token } = useParams(); //gets token from the url...
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState("");
  const [passwordChangeSuccess, setpasswordChangeSuccess] = useState(false);
  const navigate = useNavigate();

  console.log("Token from useParams :", token);
  console.log("Type of Token :", typeof token);
  console.log("Token length :", token?.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(
      "About to call resetPassword with :",
      token,
      password,
      confPassword,
    );

    if (password !== confPassword) {
      setError("password do not match");
      return;
    }
    try {
      const data = await apiClient.resetPassword(token, password, confPassword);
      console.log(`Reset password Data: ${data}`);

      if (data.message === data.message) {
        setpasswordChangeSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } else {
        setMessage("Failed to changed the password");
      }
    } catch (error) {
      console.log(error);
      console.error("Error in resetpassword :", error);
      if (error.response && error.response.data & error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Reset password failed");
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
      )}{" "}
      {passwordChangeSuccess ? (
        <>
          <p style={{ color: "White", fontWeight: "bold" }}>{message}</p>
          <Login />
        </>
      ) : (
        <>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="password">
              <label htmlFor="password">password</label>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="conf password">
              <label htmlFor="confpasword">confirm password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Submit..." : "Submit"}
            </button>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default ResetPassword;
