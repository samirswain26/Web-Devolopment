import { body } from "express-validator";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../service/apiclient";

function DashBoard() {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [Name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showTaskList, setShowTaskList] = useState([]);

  const handleToggleForm = () => {
    setShowForm((prev) => {
      const next = !prev;
      if (next) {
        // Reset only when opening the form
        setName("");
        setTitle("");
        setDescription("");
        setUsername("");
        setMessage("");
        setError("");
      }
      return next;
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.CreateTask(
        Name,
        title,
        description,
        username,
      );
      console.log("Creating Task For the the Member:", res);
      setMessage(res.message || "Task created Successfully!");

      setName("");
      setTitle("");
      setDescription("");
      setUsername("");

      // ✅ Refresh task list without page reload
      await Getalltasks(project.Name);

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    } catch (error) {
      console.log("Delete Error response", error.response?.data);
      const msg = error.response?.data?.message || "Failed to create task!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const Getalltasks = async (Name) => {
    try {
      const res = await apiClient.getTasklist(Name);
      console.log("Get task List response is:", res);

      // Ensure it's an array of task names
      setShowTaskList(res?.data || []);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to get the task list.";
      setError(msg);
    }
  };

  const handleDeletetask = async (title) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.DeleteTask(title);
      console.log("Delete Task Resopnse :", res);

      setMessage(`${title} Task was removed from `);

      // Refresh List
      // const refreshedList = await apiClient.getTasklist(Name);
      // const TaskList = refreshedList.data?.message || [];

      // setShowTaskList(TaskList);

      await Getalltasks(project.Name);

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Failed to delete Task";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const project = location.state?.project; // Access passed project data

  // console.log("Dashboard project data:", project);

  if (!project) {
    return <p>No project data provided.</p>;
  }

  useEffect(() => {
    if (project?.Name) {
      Getalltasks(project.Name);
    }
  }, [project?.Name]);

  return (
    <>
      <div style={styles.body}>
        <p style={styles.Heading}>{project.Name}</p>
        <p>
          <strong>Description:</strong> {project.description}
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Admin:</strong> {project.admin}
        </p>
        <p>
          <strong>Total Members:</strong> {project.totalMembers}
        </p>
        <p>
          <strong>Your Role:</strong> {project.userRole}
        </p>
      </div>

      {/* Only Admin can create Task...*/}

      {project.userRole === "Admin" && (
        <button onClick={handleToggleForm}>
          {showForm ? "Close Form" : "Create Task"}
        </button>
      )}

      {project.userRole === "Admin" && showForm && (
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
              Create Task
              <button onClick={handleToggleForm} style={styles.closeBtn}>
                ×
              </button>
            </h2>
            <form onSubmit={handleCreateTask}>
              <div style={styles.inputGroup}>
                <label htmlFor="Name">Project Name: </label>
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
                <label htmlFor="title">Task Title: </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                disabled={
                  Loading || !Name || !title || !description || !username
                }
                style={Loading ? styles.btnDisabled : styles.btnSubmit}
              >
                {Loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* {showForm && (
        
      )} */}

      {showTaskList.length > 0 && (
        <div style={styles.taskListBox}>
          <h3 style={styles.taskHeading}>Task Lists</h3>
          <ol>
            {showTaskList.map((taskName, index) => (
              <li key={index}>
                <button
                  style={styles.linkBtn}
                  onClick={() => console.log("Clicked task:", taskName)}
                >
                  {taskName}
                </button>
                <br />
                <br />
                {project.userRole === "Admin" && (
                  <button onClick={() => handleDeletetask(taskName)}>
                    Delete Task
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ✅ Foreground Alert Feature Below */}
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

export default DashBoard;

const styles = {
  taskListBox: {
    marginTop: "100px",
    padding: "200px",
    backgroundColor: "#f4f4f4",
    color: "Black",
    borderRadius: "8px",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  taskHeading: {
    margin: "40px 40px",
    fontSize: "50px",
    marginBottom: "10px",
    textAlign: "center",
  },

  body: {
    backgroundColor: "White",
    color: "Black",
    marginTop: "0px",
    marginButtom: "0px",
  },
  Heading: {
    margin: "20px 20px",
    backgroundColor: "Red",
    color: "White",
    textAlign: "center",
    fontSize: "20px",
  },

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
    width: "300px",
    color: "white",
  },
  closeBtn: {
    float: "right",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },
  overlayBlocker: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent overlay
    zIndex: 1500, // must be less than message box but more than rest of UI
  },

  customBoxSuccess: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  customBoxError: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  closeBtnSmall: {
    background: "none",
    border: "none",
    color: "#000",
    fontSize: "18px",
    fontWeight: "bold",
    marginLeft: "10px",
    cursor: "pointer",
  },

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
    outline: "none",
    padding: "5px 15px",
  },
  acceptBtn: {
    backgroundColor: "#28a745", // LinkedIn-style green
    color: "white",
    border: "none",
    borderRadius: "50%", // circular shape
    width: "32px",
    height: "32px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
  },
  deleteBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 4px",
    background: "red",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    borderRadius: "4px",
    zIndex: 2,
    border: "none",
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
  modalContentTall: {
    background: "#111",
    color: "#fff",
    padding: "0",
    borderRadius: "10px",
    width: "600px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 10px #000",
    position: "relative",
  },

  projectCard: {
    backgroundColor: "#222",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)",
    position: "relative",
    paddingTop: "40px",
  },

  requestBtn: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  modalHeader: {
    position: "sticky",
    top: 0,
    background: "#111",
    padding: "20px 20px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #444",
    zIndex: 1,
  },

  modalBody: {
    padding: "20px",
    overflowY: "auto",
  },
};
