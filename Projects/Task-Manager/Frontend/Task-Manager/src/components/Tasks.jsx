import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../../service/apiclient";

function Task() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const project = location.state?.project;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileSizeMB, setFileSizeMB] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  // const [hiddenFileIds, setHiddenFileIds] = useState([]);
  const [status, setStatus] = useState(task.status || "Todo"); // ✅ [NEW] Track local task status

  // ✅ Check access permission
  useEffect(() => {
    const checkAccess = () => {
      try {
        const userCookie = Cookies.get("user");
        const usernameCookie = Cookies.get("username-localhost");
        const accessToken = Cookies.get("accessToken");

        let user = null;

        if (userCookie) {
          try {
            user = JSON.parse(userCookie);
          } catch {
            console.error("Invalid user cookie");
          }
        } else if (usernameCookie) {
          try {
            user = JSON.parse(usernameCookie);
          } catch {
            user = { username: usernameCookie };
          }
        }

        if (!user && accessToken) {
          alert("User not found, but token exists. Login again.");
          navigate("/login");
          return;
        }

        if (!user) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        if (!task || !project) {
          alert("Invalid task data. Redirecting back.");
          navigate(-1);
          return;
        }

        const isAssignedUser =
          (typeof task.assignedTo === "object" &&
            (task.assignedTo._id === user._id ||
              task.assignedTo.username === user.username)) ||
          task.assignedTo === user._id ||
          task.assignedTo === user.username;

        const isAdmin =
          project.admin === user._id || project.admin === user.username;

        if (isAssignedUser || isAdmin) {
          setIsAuthorized(true);
        } else {
          alert("Access denied.");
          navigate(-1);
        }
      } catch (err) {
        console.error("Access error:", err);
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  // ✅ Fetch attached files
  const fetchAttachedFiles = async () => {
    try {
      const res = await apiClient.getAttachedFiles(task.title);
      console.log("Fetched attached files:", res.files);
      if (res.success && res.files) {
        setAttachedFiles(res.files);
      }
    } catch (err) {
      console.error("Fetching attached files failed:", err);
    }
  };

  useEffect(() => {
    if (task?.title) {
      fetchAttachedFiles();
    }
  }, [task?.title]);

  // ✅ Upload file
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file || !task?.title) {
      setError("File and task title are required");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError("File size exceeds 10MB.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", task.title);

    try {
      const response = await apiClient.UploadFile(formData);
      setMessage("File uploaded successfully");
      await fetchAttachedFiles(); // ✅ refresh attached files

      if (status === "todo") {
        await apiClient.updatetask(task.Name, task.title, "In_Progress");
        setStatus("In_Progress");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await apiClient.updatetask(task.Name, task.title, newStatus);
      setStatus(newStatus);
      setMessage(`Task marked as ${newStatus}.`);
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  // ✅ Show loading
  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  // ✅ Show if unauthorized
  if (!isAuthorized) {
    return (
      <div style={styles.container}>
        <p>Access denied.</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.title}>{task.title}</h2>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Assigned To:</strong>{" "}
          {typeof task.assignedTo === "object"
            ? task.assignedTo.username ||
              task.assignedTo.email ||
              task.assignedTo._id
            : task.assignedTo}
        </p>
        <p>
          <strong>Status:</strong> {task.status || "Pending"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
      {/* ✅ File Upload */}
      <div>
        <h3>Upload Files</h3>
        {file && fileSizeMB && (
          <p>
            Selected: <strong>{file.name}</strong> ({fileSizeMB} MB)
          </p>
        )}
        <form onSubmit={handleFileUpload} encType="multipart/form-data">
          <input
            type="file"
            name="file"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              if (selectedFile) {
                const size = selectedFile.size / (1024 * 1024);
                setFileSizeMB(size.toFixed(2));
              } else {
                setFileSizeMB(null);
              }
            }}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      {/* ✅ Attached Files */}
      <div style={styles.attachedSection}>
        <h3 style={styles.sectionTitle}>Attached Files</h3>
        {attachedFiles.length === 0 ? (
          <p>No files attached yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {console.log("Attached File", attachedFiles)}
            {console.log("File entry:", file)}
            {attachedFiles
              // .filter((file) => !hiddenFileIds.includes(file._id))
              .map((file, index) => (
                <li key={file._id} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      File {index + 1} (
                      {typeof file.mimetype === "string"
                        ? file.mimetype.split("/")[1]
                        : "unknown"}
                      ) - {(file.size / 1024).toFixed(2)} KB
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      {status === "In_Progress" && (
        <button
          onClick={() => handleUpdateStatus("Completed")}
          style={{
            padding: "4px 8px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Mark as Completed
        </button>
      )}
      {/* ✅ Alerts */}
      {(error || message) && <div style={styles.overlayBlocker}></div>}
      {message && (
        <div style={styles.customBoxSuccess}>
          <p>{message}</p>
          <button onClick={() => setMessage("")} style={styles.closeBtnSmall}>
            ×
          </button>
        </div>
      )}
      {error && (
        <div style={styles.customBoxError}>
          <p>{error}</p>
          <button onClick={() => setError("")} style={styles.closeBtnSmall}>
            ×
          </button>
        </div>
      )}
    </>
  );
}

export default Task;

// ✅ Styles

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    marginTop: "30px",
    color: "#111",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "black",
  },
  attachedSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "30px",
    height: "50vh",
    overflowY: "auto",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginBottom: "10px",
    fontSize: "24px",
    color: "#333",
  },
  previewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },

  previewItem: {
    width: "150px",
    textAlign: "center",
    fontSize: "14px",
  },

  previewImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
  },
};
