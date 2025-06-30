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
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="Forgotemail">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submit..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        <Link to={"/Login"}> Back to Login </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
