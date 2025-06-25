import { useEffect, useState } from "react";
import apiClient from "../../service/apiclient";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .profile()
      .then((res) => setProfile(res.user)) // if needed use data instead of user to retrive the data from the database
      .catch((err) => setError(err.message || "unauthorized"));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile.fullname}</h2>
      <p>
        <strong>Username:</strong> {profile.username} <br />
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
}

export default Profile;
