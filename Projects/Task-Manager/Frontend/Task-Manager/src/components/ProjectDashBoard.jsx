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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showNotesForm) {
        setShowNotesForm(false);
      }
    };

    if (showNotesForm) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotesForm]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showForm) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showForm]);

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

  const handleBackBtn = async () => {
    navigate(-1);
  };

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
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <h2>⚠️ No Project Data</h2>
          <p>
            No project data was provided. Please navigate from the projects
            page.
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (project?.Name) {
      Getalltasks(project.Name);
      getProjectNotes(project.Name); // Fetch notes on component load
    }
  }, [project?.Name]);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={handleBackBtn} style={styles.BackBtn}>
            ←
          </button>
          <h1 style={styles.projectTitle}>{project.Name}</h1>
          <div style={styles.statusBadge}>
            <span style={styles.statusText}>{project.status}</span>
          </div>
        </div>
      </div>

      {/* Project Info Cards */}
      <div style={styles.infoSection}>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>📝</div>
            <div>
              <h3 style={styles.cardTitle}>Description</h3>
              <p style={styles.cardContent}>{project.description}</p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>👤</div>
            <div>
              <h3 style={styles.cardTitle}>Admin</h3>
              <p style={styles.cardContent}>{project.admin}</p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>👥</div>
            <div>
              <h3 style={styles.cardTitle}>Total Members</h3>
              <p style={styles.cardContent}>{project.totalMembers}</p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>🎭</div>
            <div>
              <h3 style={styles.cardTitle}>Your Role</h3>
              <p style={styles.cardContent}>{project.userRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionSection}>
        {project.userRole === "Admin" && (
          <button onClick={handleToggleForm} style={styles.primaryButton}>
            <span style={styles.buttonIcon}>✚</span>
            {showForm ? "Close Form" : "Create Task"}
          </button>
        )}

        <button onClick={handleToggleNotesForm} style={styles.secondaryButton}>
          <span style={styles.buttonIcon}>📝</span>
          {showNotesForm ? "Close Notes Form" : "Create Notes"}
        </button>
      </div>

      {/* Create Task Modal */}
      {project.userRole === "Admin" && showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Task</h2>
              <button onClick={handleToggleForm} style={styles.closeBtn}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTask} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Project Name</label>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter project name"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter task title"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Assign To</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter username"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={styles.textarea}
                  rows={4}
                  placeholder="Enter task description"
                />
              </div>
              <button
                type="submit"
                disabled={
                  Loading || !Name || !title || !description || !username
                }
                style={Loading ? styles.btnDisabled : styles.submitButton}
              >
                {Loading ? "Creating..." : "Create Task"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Notes Modal */}
      {showNotesForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Note</h2>
              <button onClick={handleToggleNotesForm} style={styles.closeBtn}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateNote} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Note Content</label>
                <textarea
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
                    : styles.submitButton
                }
              >
                {notesLoading ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tasks Section */}
      {showTaskList.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📋</span>
            Task List
          </h2>
          <div style={styles.taskGrid}>
            {showTaskList.map((task, index) => (
              <div key={index} style={styles.taskCard}>
                <div style={styles.taskHeader}>
                  <h3 style={styles.taskTitle}>{task.title}</h3>
                  <span style={styles.taskNumber}>#{index + 1}</span>
                </div>
                <div style={styles.taskContent}>
                  <div style={styles.assignedTo}>
                    <span style={styles.assignedLabel}>Assigned to:</span>
                    <span style={styles.assignedName}>
                      {task.assignedTo?.username ||
                        task.assignedTo?.email ||
                        task.assignedTo ||
                        "Unknown"}
                    </span>
                  </div>
                </div>
                <div style={styles.taskActions}>
                  <button
                    style={styles.viewButton}
                    onClick={() =>
                      navigate("/Task", {
                        state: { task, project },
                      })
                    }
                  >
                    View Details
                  </button>
                  {project.userRole === "Admin" && (
                    <button
                      onClick={() => handleDeletetask(task.title)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>📝</span>
          Project Notes
        </h2>

        {notesList.length > 0 ? (
          <div style={styles.notesGrid}>
            {notesList.map((note, index) => (
              <div key={note._id || index} style={styles.noteCard}>
                <div style={styles.noteHeader}>
                  <span style={styles.noteNumber}>Note #{index + 1}</span>
                  <span style={styles.noteDate}>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.noteContent}>{note.content}</div>
                <div style={styles.noteFooter}>
                  <small style={styles.noteTime}>
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📝</div>
            <h3 style={styles.emptyTitle}>No Notes Yet</h3>
            <p style={styles.emptyText}>
              Create your first note to get started!
            </p>
          </div>
        )}
      </div>

      {/* Notifications */}
      {(error || message) && <div style={styles.overlayBlocker}></div>}

      {message && (
        <div style={styles.successNotification}>
          <div style={styles.notificationIcon}>✅</div>
          <p style={styles.notificationText}>{message}</p>
          <button
            onClick={() => setMessage("")}
            style={styles.notificationClose}
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div style={styles.errorNotification}>
          <div style={styles.notificationIcon}>❌</div>
          <p style={styles.notificationText}>{error}</p>
          <button onClick={() => setError("")} style={styles.notificationClose}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default DashBoard;

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  errorContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },

  errorCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },

  // Header Styles
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "40px 0",
    marginBottom: "30px",
  },
  BackBtn: {
    background: "none",
    border: "none",
    color: "rgba(16, 5, 5, 0.9)",
    padding: "0px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "35px",
    fontWeight: "5000",
    transition: "all 0.3s ease",
    margin: "0px 0px",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 0 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  projectTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },

  statusBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.3)",
  },

  statusText: {
    fontSize: "0.9rem",
    fontWeight: "500",
  },

  // Info Section
  infoSection: {
    maxWidth: "1200px",
    margin: "0 auto 40px auto",
    padding: "0 20px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  infoCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  cardIcon: {
    fontSize: "2rem",
    backgroundColor: "#f1f5f9",
    padding: "12px",
    borderRadius: "8px",
    minWidth: "48px",
    textAlign: "center",
  },

  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#334155",
  },

  cardContent: {
    margin: 0,
    color: "#64748b",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },

  // Action Section
  actionSection: {
    maxWidth: "1200px",
    margin: "0 auto 40px auto",
    padding: "0 20px",
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },

  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
  },

  secondaryButton: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
  },

  buttonIcon: {
    fontSize: "1.1rem",
  },

  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },

  modalContent: {
    background: "white",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  modalHeader: {
    padding: "24px 24px 0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "16px",
    marginBottom: "24px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e293b",
  },

  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#64748b",
    padding: "4px",
    borderRadius: "4px",
    transition: "color 0.2s ease",
  },

  // Form Styles
  form: {
    padding: "0 24px 24px 24px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "100px",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  },

  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },

  btnDisabled: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "not-allowed",
  },

  // Section Styles
  section: {
    maxWidth: "1200px",
    margin: "0 auto 40px auto",
    padding: "0 20px",
  },

  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  sectionIcon: {
    fontSize: "1.5rem",
  },

  // Task Styles
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px",
  },

  taskCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },

  taskTitle: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },

  taskNumber: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },

  taskContent: {
    marginBottom: "16px",
  },

  assignedTo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  assignedLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: "500",
  },

  assignedName: {
    fontSize: "0.95rem",
    color: "#374151",
    fontWeight: "500",
  },

  taskActions: {
    display: "flex",
    gap: "8px",
  },

  viewButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },

  // Notes Styles
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  noteCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    paddingBottom: "8px",
    borderBottom: "1px solid #f1f5f9",
  },

  noteNumber: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#3b82f6",
  },

  noteDate: {
    fontSize: "0.8rem",
    color: "#64748b",
  },

  noteContent: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#374151",
    marginBottom: "12px",
    whiteSpace: "pre-wrap",
  },

  noteFooter: {
    paddingTop: "8px",
    borderTop: "1px solid #f1f5f9",
  },

  noteTime: {
    fontSize: "0.75rem",
    color: "#9ca3af",
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "2px dashed #e2e8f0",
  },

  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "16px",
  },

  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },

  emptyText: {
    color: "#64748b",
    fontSize: "1rem",
  },

  // Notification Styles
  overlayBlocker: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1500,
  },

  successNotification: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    color: "#059669",
    padding: "20px 24px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "2px solid #10b981",
    minWidth: "300px",
  },

  errorNotification: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    color: "#dc2626",
    padding: "20px 24px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "2px solid #ef4444",
    minWidth: "300px",
  },

  notificationIcon: {
    fontSize: "1.5rem",
  },

  notificationText: {
    margin: 0,
    flex: 1,
    fontSize: "1rem",
    fontWeight: "500",
  },

  notificationClose: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "inherit",
    padding: "4px",
    borderRadius: "4px",
    transition: "opacity 0.2s ease",
    opacity: 0.7,
  },
};
