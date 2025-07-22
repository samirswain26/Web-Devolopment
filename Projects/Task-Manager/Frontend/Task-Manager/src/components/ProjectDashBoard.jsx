import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  //  Notes related state
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);

  const navigate = useNavigate();

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

  //  Handle toggle notes form
  const handleToggleNotesForm = () => {
    setShowNotesForm((prev) => {
      const next = !prev;
      if (next) {
        // Reset when opening
        setNoteContent("");
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

      // Refresh task list without page reload
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

  //  Handle create note
  const handleCreateNote = async (e) => {
    e.preventDefault();
    setNotesLoading(true);
    setError("");

    try {
      const res = await apiClient.createNote(project.Name, noteContent);
      console.log("Creating Note response:", res);
      setMessage(res.message || "Note created successfully!");

      setNoteContent("");

      //  Refresh notes list
      await getProjectNotes(project.Name);

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    } catch (error) {
      console.log("Create Note Error:", error.response?.data);
      const msg = error.response?.data?.message || "Failed to create note!";
      setError(msg);
    } finally {
      setNotesLoading(false);
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

  // Get project notes
  const getProjectNotes = async (Name) => {
    try {
      const res = await apiClient.getProjectNotes(Name);
      console.log("Get Project Notes response:", res);
      setNotesList(res?.data || []);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to get project notes.";
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

  if (!project) {
    return <p>No project data provided.</p>;
  }

  useEffect(() => {
    if (project?.Name) {
      Getalltasks(project.Name);
      getProjectNotes(project.Name); // Fetch notes on component load
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
                <label htmlFor="username">Asign To: </label>
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

      {showTaskList.length > 0 && (
        <div style={styles.taskListBox}>
          <h3 style={styles.taskHeading}>Task Lists</h3>
          <ol>
            <div style={styles.div}>
              {showTaskList.map((task, index) => (
                <li key={index}>
                  <button
                    style={styles.linkBtn}
                    onClick={() =>
                      navigate("/Task", {
                        state: { task, project }, // Correct: pass the actual task from map
                      })
                    }
                  >
                    {task.title}
                  </button>
                  <br />
                  <br />
                  <strong>Assigned To:</strong>{" "}
                  {task.assignedTo?.username ||
                    task.assignedTo?.email ||
                    task.assignedTo ||
                    "Unknown"}
                  <br />
                  <br />
                  {project.userRole === "Admin" && (
                    <button onClick={() => handleDeletetask(task.title)}>
                      Delete Task
                    </button>
                  )}
                </li>
              ))}
            </div>
          </ol>
        </div>
      )}

      {/* Notes Section */}
      <div style={styles.notesContainer}>
        <button onClick={handleToggleNotesForm} style={styles.createNotesBtn}>
          {showNotesForm ? "Close Notes Form" : "Create Notes"}
        </button>

        {/* Create Notes Form Modal */}
        {showNotesForm && (
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
                Create Note
                <button onClick={handleToggleNotesForm} style={styles.closeBtn}>
                  ×
                </button>
              </h2>
              <form onSubmit={handleCreateNote}>
                <div style={styles.inputGroup}>
                  <label htmlFor="noteContent">Note Content: </label>
                  <textarea
                    name="noteContent"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    required
                    style={styles.textarea}
                    rows={6}
                    placeholder="Write your note here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={notesLoading || !noteContent.trim()}
                  style={
                    notesLoading || !noteContent.trim()
                      ? styles.btnDisabled
                      : styles.btnSubmit
                  }
                >
                  {notesLoading ? "Creating..." : "Create Note"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Notes List */}
        {notesList.length > 0 && (
          <div style={styles.notesListBox}>
            <h3 style={styles.notesHeading}>Project Notes</h3>
            <div style={styles.notesWrapper}>
              {notesList.map((note, index) => (
                <div key={note._id || index} style={styles.noteCard}>
                  <div style={styles.noteHeader}>
                    <span style={styles.noteIndex}>Note #{index + 1}</span>
                    <span style={styles.noteDate}>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={styles.noteContent}>{note.content}</div>
                  <div style={styles.noteFooter}>
                    <small style={styles.noteTime}>
                      Created: {new Date(note.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notesList.length === 0 && (
          <div style={styles.emptyNotes}>
            <p>No notes created yet for this project.</p>
          </div>
        )}
      </div>

      {/* Foreground Alert Feature Below */}
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
  div: {
    backgroundColor: "pink",
  },
  taskListBox: {
    marginTop: "10px",
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
    width: "400px",
    color: "white",
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

  linkBtn: {
    color: "blue",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
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

  // ✅ Notes specific styles
  notesContainer: {
    marginTop: "30px",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 20px",
  },
  createNotesBtn: {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
    display: "block",
    margin: "0 auto 20px auto",
  },
  notesListBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  notesHeading: {
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  notesWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  noteCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "1px solid #dee2e6",
  },
  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: "1px solid #eee",
  },
  noteIndex: {
    fontWeight: "bold",
    color: "#007bff",
    fontSize: "14px",
  },
  noteDate: {
    fontSize: "12px",
    color: "#6c757d",
  },
  noteContent: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#333",
    marginBottom: "10px",
    whiteSpace: "pre-wrap", // Preserves line breaks
  },
  noteFooter: {
    borderTop: "1px solid #eee",
    paddingTop: "8px",
  },
  noteTime: {
    color: "#6c757d",
    fontSize: "11px",
  },
  emptyNotes: {
    textAlign: "center",
    padding: "40px",
    color: "#6c757d",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    marginTop: "20px",
  },
};
