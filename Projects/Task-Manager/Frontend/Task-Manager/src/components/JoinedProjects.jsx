import { useEffect, useState } from "react";
import apiClient from "../../service/apiclient";
import { useNavigate } from "react-router";

function Project() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const GetProjectsIamin = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await apiClient.IAmInTheProject();
      setProject(res?.data?.projects || []);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load projects";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlebackTomainpage = () => {
    navigate("/Mainpage");
  };

  useEffect(() => {
    GetProjectsIamin();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Projects You've Joined</h2>
      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {project.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div>
          {project.map((proj) => (
            <div key={proj._id} style={styles.card}>
              <h3>{proj.Name}</h3>
              <p>
                <span style={styles.label}>Description:</span>{" "}
                {proj.description}
              </p>
              <p>
                <span style={styles.label}>Status:</span> {proj.status}
              </p>
              <p>
                <span style={styles.label}>Admin:</span> {proj.admin}
              </p>
              <p>
                <span style={styles.label}>Total Members:</span>{" "}
                {proj.totalMembers}
              </p>
              <p>
                <span style={styles.label}>Your Role:</span> {proj.userRole}
              </p>
              <button
                style={styles.button}
                onClick={() =>
                  navigate("/Project-Dash", { state: { project: proj } })
                }
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <button style={styles.backButton} onClick={handlebackTomainpage}>
        ⬅ Back to Mainpage
      </button>
    </div>
  );
}

export default Project;

const styles = {
  container: {
    maxWidth: "100%",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #7e30cbff 100%)",
    // background: "rgba(184, 7, 7, 1)",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    color: "#ffffff",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
  },
  card: {
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(8px)",
    color: "#f4f4f4",
  },
  label: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  button: {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    color: "#fff",
    cursor: "pointer",
    marginTop: "14px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease",
  },
  backButton: {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(to right, #757f9a, #d7dde8)",
    color: "#333",
    cursor: "pointer",
    display: "block",
    margin: "40px auto 0",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  hr: {
    border: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "20px",
  },
};
