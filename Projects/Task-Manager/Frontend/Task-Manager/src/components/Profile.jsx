// import { useEffect, useState } from "react";
// import apiClient from "../../service/apiclient";
// import { Link, useNavigate } from "react-router-dom";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     apiClient
//       .profile()
//       .then((res) => setProfile(res.user)) // if needed use data instead of user to retrive the data from the database
//       .catch((err) => setError(err.message || "unauthorized"));
//   }, []);

//   const handleLogout = async () => {
//     setLoading(true);

//     try {
//       const response = await apiClient.logout();
//       console.log("Logout Successfully", response);

//       navigate("/");
//     } catch (error) {
//       console.error("Logout error: ", error);
//       setError("Failed to logout. please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleback = async () => {
//     navigate(-1);
//   };

//   if (error) return <p>Error: {error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div>
//       <h2>Welcome, {profile.fullname}</h2>
//       <p>
//         <strong>Username:</strong> {profile.username} <br />
//         <strong>Email:</strong> {profile.email}
//       </p>
//       <p></p>
//       <div style={{ marginTop: "20px" }}>
//         {/* <Link to={"/Mainpage"}> Back </Link> */}
//         <button onClick={handleback}>Back</button>
//         {/* Add some spacing between links */}
//         <span style={{ margin: "0 20px" }}>|</span>
//         <button
//           onClick={handleLogout}
//           disabled={loading}
//           style={{
//             backgroundColor: "#dc3545",
//             color: "white",
//             border: "none",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: "14px",
//           }}
//         >
//           {loading ? "logfing out..." : "Logout"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Profile;

// import { useEffect, useState } from "react";
// import apiClient from "../../service/apiclient";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     apiClient
//       .profile()
//       .then((res) => setProfile(res.user))
//       .catch((err) => setError(err.message || "Unauthorized"));
//   }, []);

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await apiClient.logout();
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error: ", error);
//       setError("Failed to logout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   if (error) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <p style={styles.error}>Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <p>Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Welcome, {profile.fullname}</h2>
//         <div style={styles.info}>
//           <p>
//             <strong>Username:</strong> {profile.username}
//           </p>
//           <p>
//             <strong>Email:</strong> {profile.email}
//           </p>
//         </div>
//         <div style={styles.buttonContainer}>
//           <button
//             onClick={handleBack}
//             style={{ ...styles.button, backgroundColor: "#007bff" }}
//           >
//             ⬅ Back
//           </button>
//         </div>
//         <div style={styles.buttonContainer}>
//           <button
//             onClick={handleLogout}
//             disabled={loading}
//             style={{
//               ...styles.button,
//               backgroundColor: "#dc3545",
//               cursor: loading ? "not-allowed" : "pointer",
//               opacity: loading ? 0.8 : 1,
//             }}
//           >
//             {loading ? "Logging out..." : "Logout"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#05162fff",
//     padding: "20px",
//   },
//   card: {
//     background: "#fff",
//     padding: "100px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   heading: {
//     fontSize: "24px",
//     marginBottom: "20px",
//     color: "#333",
//   },
// };

import { useEffect, useState } from "react";
import apiClient from "../../service/apiclient";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .profile()
      .then((res) => setProfile(res.user))
      .catch((err) => setError(err.message || "Unauthorized"));
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiClient.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
      setError("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.error}>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome, {profile.fullname}</h2>
        <div style={styles.info}>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>

        <div style={styles.buttonRow}>
          <button
            onClick={handleBack}
            style={{ ...styles.button, backgroundColor: "#007bff" }}
          >
            ⬅ Back
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: "#dc3545",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#05162fff",
    padding: "20px",
  },
  card: {
    background: "#ffffffdd",
    padding: "60px 40px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#333",
  },
  info: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  button: {
    flex: 1,
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};
