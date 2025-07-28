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
  // FIXED: Initialize status properly
  const [status, setStatus] = useState(task?.status || "Todo");

  // Task Notes related state
  const [showTaskNotesForm, setShowTaskNotesForm] = useState(false);
  const [taskNoteContent, setTaskNoteContent] = useState("");
  const [taskNotesList, setTaskNotesList] = useState([]);
  const [taskNotesLoading, setTaskNotesLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showTaskNotesForm) {
        setShowTaskNotesForm(false);
      }
    };

    if (showTaskNotesForm) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showTaskNotesForm]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && error) {
        setError(false);
      }
    };

    if (error) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [error]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && message) {
        setMessage(false);
      }
    };

    if (message) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [message]);

  const handleBackToProjectDashBoard = async () => {
    navigate(-1);
  };
  const handleToProfile = async () => {
    navigate("/Profile");
  };

  //  Handle toggle task notes form
  const handleToggleTaskNotesForm = () => {
    setShowTaskNotesForm((prev) => {
      const next = !prev;
      if (next) {
        // Reset when opening
        setTaskNoteContent("");
        setMessage("");
        setError("");
      }
      return next;
    });
  };

  //  Handle create task note
  const handleCreateTaskNote = async (e) => {
    e.preventDefault();
    setTaskNotesLoading(true);
    setError("");

    try {
      const res = await apiClient.createTaskNote(task.title, taskNoteContent);
      console.log("Creating Task Note response:", res);
      setMessage(res.message || "Task note created successfully!");

      setTaskNoteContent("");

      // Refresh task notes list
      await getTaskNotes(task.title);

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    } catch (error) {
      console.log("Create Task Note Error:", error.response?.data);
      const msg =
        error.response?.data?.message || "Failed to create task note!";
      setError(msg);
    } finally {
      setTaskNotesLoading(false);
    }
  };

  //  Get task notes
  const getTaskNotes = async (title) => {
    try {
      const res = await apiClient.getTaskNotes(title);
      console.log("Get Task Notes response:", res);
      setTaskNotesList(res?.data || []);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to get task notes.";
      setError(msg);
    }
  };

  // Check access permission
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

  //  Fetch attached files
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
      getTaskNotes(task.title); // Fetch task notes on component load
    }
  }, [task?.title]);

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
      await fetchAttachedFiles(); //  refresh attached files
      setFile("");
      //  FIXED: Proper case comparison and correct API call
      if (status === "Todo") {
        await apiClient.updatetask(task.title, "In Progress"); //  FIXED: Correct parameters
        setStatus("In Progress"); //  Update local state
        setMessage("File uploaded successfully ");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  //  FIXED: Handle update status function
  const handleUpdateStatus = async (newStatus) => {
    setMessage("");
    setError("");
    setLoading(true);

    //  Debug logs
    console.log("Updating task:", {
      title: task.title,
      currentStatus: status,
      newStatus: newStatus,
    });

    try {
      const res = await apiClient.updatetask(task.title, newStatus);
      console.log("Update task response is: ", res);

      if (res.success) {
        //  IMPORTANT: Update local status state immediately
        setStatus(newStatus);
        setMessage(res.message || `Task marked as ${newStatus}`);
      } else {
        setError("Failed to update task status");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to update task status";
      console.log("Error in handle update task is:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  //  Show loading
  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  //  Show if unauthorized
  if (!isAuthorized) {
    return (
      <div style={styles.container}>
        <p>Access denied.</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.Headcontainer}>
        <button style={styles.BackBtn} onClick={handleBackToProjectDashBoard}>
          ←
        </button>
        <h2 style={styles.title}>{task.title}</h2>
        <button style={styles.profileBtn} onClick={handleToProfile}>
          {/* profile */} 👤
        </button>
      </div>
      <div style={styles.TaskDetailcontainer}>
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
          <strong>Status:</strong> {status}{" "}
          {/*  FIXED: Use local status state instead of task.status */}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(task.updatedAt).toLocaleString()}
        </p>

        <div style={styles.statusButtonsContainer}>
          <button
            onClick={() => handleUpdateStatus("Todo")}
            disabled={loading}
            style={getStatusButtonStyle("Todo", status)}
          >
            Set Todo
          </button>
          <button
            onClick={() => handleUpdateStatus("In Progress")}
            disabled={loading}
            style={getStatusButtonStyle("In Progress", status)}
          >
            Set In Progress
          </button>
          <button
            onClick={() => handleUpdateStatus("Completed")}
            disabled={loading}
            style={getStatusButtonStyle("Completed", status)}
          >
            Set Completed
          </button>
        </div>

        <button
          onClick={handleToggleTaskNotesForm}
          style={styles.createTaskNotesBtn}
        >
          {showTaskNotesForm ? "Close Task Notes Form" : "Create Task Notes"}
        </button>
      </div>

      {/* File Upload */}
      <div style={styles.FileUploadcontainer}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Attached Files */}
      <div style={styles.attachedFilesSection}>
        <h3 style={styles.sectionTitle}>Attached Files</h3>
        {attachedFiles.length === 0 ? (
          <p>No files attached yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {console.log("Attached File", attachedFiles)}
            {attachedFiles.map((file, index) => (
              <li key={file._id} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
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

      {/*  Task Notes Section */}
      <div style={styles.taskNotesContainer}>
        {/* Create Task Notes Form Modal */}
        {showTaskNotesForm && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2
                style={{
                  margin: 0,
                  flex: 1,
                  textAlign: "center",
                  marginBottom: "20px",
                  marginTop: "5px",
                }}
              >
                Create Task Note
                <button
                  onClick={handleToggleTaskNotesForm}
                  style={styles.closeBtn}
                >
                  ×
                </button>
              </h2>
              <form onSubmit={handleCreateTaskNote}>
                <div style={styles.inputGroup}>
                  <label htmlFor="taskNoteContent">Task Note Content: </label>
                  <textarea
                    name="taskNoteContent"
                    value={taskNoteContent}
                    onChange={(e) => setTaskNoteContent(e.target.value)}
                    required
                    style={styles.textarea}
                    rows={6}
                    placeholder="Write your task note here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={taskNotesLoading || !taskNoteContent.trim()}
                  style={
                    taskNotesLoading || !taskNoteContent.trim()
                      ? styles.btnDisabled
                      : styles.btnSubmit
                  }
                >
                  {taskNotesLoading ? "Creating..." : "Create Task Note"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Task Notes List */}
        {taskNotesList.length > 0 && (
          <div style={styles.taskNotesListBox}>
            <h3 style={styles.taskNotesHeading}>Task Notes</h3>
            <div style={styles.taskNotesWrapper}>
              {taskNotesList.map((note, index) => (
                <div key={note._id || index} style={styles.taskNoteCard}>
                  <div style={styles.taskNoteHeader}>
                    <span style={styles.taskNoteIndex}>
                      Task Note #{index + 1}
                    </span>
                    <span style={styles.taskNoteDate}>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={styles.taskNoteContent}>{note.content}</div>
                  <div style={styles.taskNoteFooter}>
                    <small style={styles.taskNoteTime}>
                      Created: {new Date(note.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {taskNotesList.length === 0 && (
          <div style={styles.emptyTaskNotes}>
            <p>No task notes created yet.</p>
          </div>
        )}
      </div>

      {/*  Alerts */}
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

// Helper function for status button styling
const getStatusButtonStyle = (buttonStatus, currentStatus) => ({
  padding: "6px 8px", // Smaller padding
  backgroundColor: currentStatus === buttonStatus ? "#007bff" : "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px", // Smaller font
  flex: 1, // Equal width distribution
  textAlign: "center",
});

export default Task;

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
  BackBtn: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(228, 211, 211, 0.2)",
    color: "rgba(16, 5, 5, 0.9)",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "35px",
    fontWeight: "5000",
    transition: "all 0.3s ease",
  },
  profileBtn: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(228, 211, 211, 0.2)",
    color: "rgba(16, 5, 5, 0.9)",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "5000",
    transition: "all 0.3s ease",
  },
  FileUploadcontainer: {
    width: "25%",
    height: "100px",
    backgroundColor: "#fff",
    color: "#1e1e1e",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    position: "fixed",
    top: "450px",
    left: "30px",
    borderRadius: "10px",
    margin: "50px 0px",
  },
  TaskDetailcontainer: {
    width: "25%",
    height: "350px",
    backgroundColor: "#fff",
    color: "#1e1e1e",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: "100px",
    left: "30px",
    borderRadius: "10px",
    margin: "5px 0px",
  },
  Headcontainer: {
    width: "98%",
    height: "60px",
    backgroundColor: "#fff",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    left: 0,
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "black",
  },
  attachedFilesSection: {
    position: "fixed",
    top: "80px",
    right: "20px",
    width: "400px",
    height: "calc(100vh - 150px)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    overflowY: "auto",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
  },
  statusButtonsContainer: {
    display: "flex",
    flexDirection: "row", // Horizontal line
    gap: "5px", // Small space between buttons
    marginBottom: "10px", // Space before Create Task Notes button
    width: "100%",
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

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    width: "1000px",
    height: "500px",
    color: "white",
    zIndex: 1000,
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
    outline: "none",
    padding: "5px 15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },

  textarea: {
    width: "100%",
    padding: "8px", // Changed back to 8px for better spacing
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "none", // This removes the resize handle
    height: "350px",
    outline: "none", // Optional: removes focus outline
    boxSizing: "border-box", // Ensures padding doesn't affect width
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

  // UPDATED Task Notes specific styles - MAIN CHANGES HERE
  taskNotesContainer: {
    position: "fixed", // Changed to fixed positioning
    top: "80px", // Start below header
    left: "550px", // Position in center area
    width: "600px", // Fixed width
    height: "calc(100vh - 100px)", // Full height minus margins
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "0", // Remove padding from container
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
    zIndex: 998,
    display: "flex",
    flexDirection: "column", // Stack children vertically
  },
  createTaskNotesBtn: {
    padding: "8px 16px", // Smaller padding
    backgroundColor: "#17a2b8",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%", // Full width
    marginTop: "5px", // Small top margin
  },
  taskNotesListBox: {
    flex: 1, // Take remaining space
    backgroundColor: "transparent", // Remove background since container has it
    padding: "10px 20px 20px 20px", // Padding for content
    borderRadius: "0", // Remove border radius
    margin: "0", // Remove margin
    height: "auto", // Remove fixed height
    overflow: "hidden", // Hide overflow on container
    display: "flex",
    flexDirection: "column",
  },
  taskNotesHeading: {
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    flexShrink: 0, // Don't shrink the heading
  },
  taskNotesWrapper: {
    flex: 1, // Take remaining space
    overflowY: "auto", // Enable scrolling here
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    paddingRight: "10px", // Space for scrollbar
  },
  taskNoteCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "1px solid #dee2e6",
    flexShrink: 0, // Don't shrink individual cards
  },
  taskNoteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: "1px solid #eee",
  },
  taskNoteIndex: {
    fontWeight: "bold",
    color: "#17a2b8",
    fontSize: "14px",
  },
  taskNoteDate: {
    fontSize: "12px",
    color: "#6c757d",
  },
  taskNoteContent: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#333",
    marginBottom: "10px",
    whiteSpace: "pre-wrap",
  },
  taskNoteFooter: {
    borderTop: "1px solid #eee",
    paddingTop: "8px",
  },
  taskNoteTime: {
    color: "#6c757d",
    fontSize: "11px",
  },
  emptyTaskNotes: {
    textAlign: "center",
    padding: "40px",
    color: "#6c757d",
    backgroundColor: "transparent", // Remove background
    borderRadius: "8px",
    margin: "0", // Remove margin
    flex: 1, // Take available space
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Alert styles
  overlayBlocker: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  customBoxSuccess: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 1000,
    border: "1px solid #c3e6cb",
    minWidth: "280px",
    maxWidth: "90vw",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  customBoxError: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 1000,
    border: "1px solid #f5c6cb",
    minWidth: "280px",
    maxWidth: "90vw",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  closeBtnSmall: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "none",
    border: "none",
    color: "#000",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
