import { useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../../service/apiclient";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Trying to signup");
      const data = await apiClient.signup(username, email, password, fullname);
      console.log(`Signup date : ${data}`);
      setMessage("verification token was send to your email.");

      //   clear Form
      setUsername("");
      setEmail("");
      setFullname("");
      setFullname("");

      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      setError("Signup failed. Try again");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handlesubmit}>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="Email">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="fullname">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "signup..." : "signup"}
        </button>
        <p>
          Already have an accont? <Link to={"/Login"}>Login</Link>
        </p>

        {message && (
          <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>
        )}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
