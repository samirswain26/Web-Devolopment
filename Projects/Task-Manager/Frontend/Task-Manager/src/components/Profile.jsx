import { useEffect, useState } from "react";
import apiClient from "../../service/apiclient";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .profile()
      .then((res) => setProfile(res.user)) // if needed use data instead of user to retrive the data from the database
      .catch((err) => setError(err.message || "unauthorized"));
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await apiClient.logout();
      console.log("Logout Successfully", response);

      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
      setError("Failed to logout. please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile.fullname}</h2>
      <p>
        <strong>Username:</strong> {profile.username} <br />
        <strong>Email:</strong> {profile.email}
      </p>
      <p></p>
      <div style={{ marginTop: "20px" }}>
        <Link to={"/Mainpage"}> Back </Link>
        {/* Add some spacing between links */}
        <span style={{ margin: "0 20px" }}>|</span>
        <button
          onClick={handleLogout}
          disabled={loading}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "logfing out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
