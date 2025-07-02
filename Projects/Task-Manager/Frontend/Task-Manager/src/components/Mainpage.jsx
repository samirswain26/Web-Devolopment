import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../../service/apiclient";

function Mainpage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showList, setShowList] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/Login");
    window.location.reload();
  };

  const handleToProfile = () => {
    navigate("/Profile");
    window.location.reload();
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setMessage("");
    setError("");
    setLoading(false);
    setName("");
    setDescription("");
    if (showForm && showList) {
      setShowList(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("In the handle for SubmitEvent..");
      const res = await apiClient.createProject(Name, description);
      console.log("Response:", res);

      if (res.message === "Project Created") {
        setMessage("Project Created Successfully!");
        setError("");
        setName("");
        setDescription("");

        setTimeout(() => {
          setShowForm(false);
        }, 2000);
      } else {
        setError(res.message || "Project creation failed");
        setMessage("");
      }
    } catch (error) {
      console.log("Error:", error.response?.data);
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Request failed";

      if (status === 400 || status === 401) {
        setError(msg);
      } else if (status === 500) {
        setError("Server Error: " + msg);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProjects = async (e) => {
    e.preventDefault();
    setShowList(!showList);
    setError("");
    setLoading(false);

    if (!showList) {
      try {
        const res = await apiClient.myProjects();
        console.log("Projects:", res);

        // Check if the data exists...
        if (res && res.data && res.data.length > 0) {
          setProjectList(res.data);
        } else {
          setProjectList([]);
        }
      } catch (error) {
        console.error("Error in fetching projects: ", error);
        const msg = error.response?.data?.message || "Could not load projects";
        console.log(msg);
        setError(msg);
      }
    }
  };

  return (
    <div>
      <h1>This is the main page</h1>
      <p>
        Back to login Page{" "}
        <button onClick={handleBackToLogin} style={styles.linkBtn}>
          Login
        </button>
      </p>
      <p>
        Profile Page{" "}
        <button onClick={handleToProfile} style={styles.linkBtn}>
          Profile
        </button>
      </p>

      <br />

      <button onClick={handleToggleForm}>
        {showForm ? "Close Form" : "Create Project"}
      </button>

      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.header}>
              Create Project
              <button onClick={handleToggleForm} style={styles.closeBtn}>
                ×
              </button>
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div style={styles.inputGroup}>
                <label htmlFor="Name">Title: </label>
                <input
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="description">Description: </label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !Name || !description}
                style={loading ? styles.btnDisabled : styles.btnSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* Success Message */}
            {message && <div style={styles.successMsg}>{message}</div>}

            {/* Error Message */}
            {error && <div style={styles.errorMsg}>{error}</div>}
          </div>
        </div>
      )}

      <button onClick={handleToggleProjects}>
        {showList ? "Close Projects" : "Show Project"}
      </button>

      {showList && (
        <div style={{ marginTop: "20px" }}>
          <h3>My Projects</h3>
          {projectList.length > 0 ? (
            <ul>
              {projectList.map((project, index) => (
                <li key={project._id || index}>
                  <strong>{project.Name}</strong> - {project.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#111",
    color: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 10px #000",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
  linkBtn: {
    color: "blue",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
  },
  btnSubmit: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDisabled: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
  successMsg: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    borderRadius: "4px",
  },
  errorMsg: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
  },
};

export default Mainpage;
