import { Link, useNavigate } from "react-router";

function Mainpage() {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/Login");
    window.location.reload();
  };
  const handleToProfile = () => {
    navigate("/Profile");
    window.location.reload();
  };
  return (
    <div>
      <h1>This is the main page</h1>
      <p>
        Back to login Page{" "}
        <button
          onClick={handleBackToLogin}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </p>
      <p>
        Profile Page{" "}
        <button
          onClick={handleToProfile}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Profile
        </button>
      </p>
    </div>
  );
}

export default Mainpage;
