import { useEffect, useState } from "react";

function Mainpage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showList, setShowList] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [showallprojectList, setShowAllProjectList] = useState(false);
  const [allprojectList, setallProjectList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [selectProject, setSelectProject] = useState(null);
  const [showRequesModal, setShowRequestModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [MemberList, setMemberList] = useState([]);
  const [profile, setProfile] = useState({ fullname: "Samir Kumar Swain" }); // Mock data for demo

  // Mock handlers for demo
  const handleBackToLogin = () => console.log("Navigate to login");
  const handleToProjectPage = () => console.log("Navigate to projects");
  const handleToProfile = () => console.log("Navigate to profile");
  const handleToggleForm = () => setShowForm(!showForm);
  const handleAllProjects = () => setShowAllProjectList(!showallprojectList);
  const handleToggleProjects = () => setShowList(!showList);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage("Project Created Successfully!");
      setLoading(false);
      setShowForm(false);
      setName("");
      setDescription("");
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  return (
    <div style={styles.MainBox}>
      {/* Enhanced Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.mainTitle}>Welcome to Taskyst</h1>
            {profile ? (
              <h2 style={styles.welcomeText}>Hi {profile.fullname}!</h2>
            ) : (
              <h2 style={styles.welcomeText}>Loading...</h2>
            )}
            <p style={styles.subtitle}>
              Your all-in-one project management solution
            </p>
          </div>
          <div style={styles.navButtons}>
            <button onClick={handleToProfile} style={styles.navBtn}>
              👤 Profile
            </button>
            <button onClick={handleBackToLogin} style={styles.navBtnSecondary}>
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h2 style={styles.sectionTitle}>What would you like to do today?</h2>
          <p style={styles.sectionSubtitle}>
            Choose from the options below to manage your projects effectively
          </p>
        </div>

        {/* Card Grid */}
        <div style={styles.cardGrid}>
          <div style={styles.card} onClick={handleToProjectPage}>
            <div style={styles.cardIcon}>🏠</div>
            <h3 style={styles.cardTitle}>Joined Projects</h3>
            <p style={styles.cardDescription}>
              View and collaborate on projects you're part of. Access your
              team's work and stay updated.
            </p>
            <div style={styles.cardFooter}>
              <span style={styles.cardAction}>Enter Dashboard →</span>
            </div>
          </div>

          <div style={styles.card} onClick={handleAllProjects}>
            <div style={styles.cardIcon}>🌐</div>
            <h3 style={styles.cardTitle}>
              {showallprojectList ? "Close Gallery" : "Browse Projects"}
            </h3>
            <p style={styles.cardDescription}>
              Discover exciting projects from the community. Find opportunities
              to contribute and collaborate.
            </p>
            <div style={styles.cardFooter}>
              <span style={styles.cardAction}>
                {showallprojectList ? "Close View" : "Explore Gallery"} →
              </span>
            </div>
          </div>

          <div style={styles.card} onClick={handleToggleProjects}>
            <div style={styles.cardIcon}>📋</div>
            <h3 style={styles.cardTitle}>
              {showList ? "Close Manager" : "My Projects"}
            </h3>
            <p style={styles.cardDescription}>
              Manage projects you've created. Track progress, handle requests,
              and organize your team.
            </p>
            <div style={styles.cardFooter}>
              <span style={styles.cardAction}>
                {showList ? "Close Manager" : "Open Manager"} →
              </span>
            </div>
          </div>

          <div style={styles.card} onClick={handleToggleForm}>
            <div style={styles.cardIcon}>✨</div>
            <h3 style={styles.cardTitle}>
              {showForm ? "Cancel Creation" : "New Project"}
            </h3>
            <p style={styles.cardDescription}>
              Start something amazing! Create a new project and invite
              collaborators to join your vision.
            </p>
            <div style={styles.cardFooter}>
              <span style={styles.cardAction}>
                {showForm ? "Cancel" : "Create Project"} →
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div style={styles.statsSection}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>Active Projects</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>48</div>
            <div style={styles.statLabel}>Team Members</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>156</div>
            <div style={styles.statLabel}>Tasks Completed</div>
          </div>
        </div>
      </main>

      {/* Create Project Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>✨ Create New Project</h2>
              <button onClick={handleToggleForm} style={styles.closeBtn}>
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Project Title</label>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your project title..."
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project goals and vision..."
                  required
                  style={styles.textarea}
                  rows="4"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !Name || !description}
                style={loading ? styles.btnDisabled : styles.btnSubmit}
              >
                {loading ? "Creating..." : "🚀 Launch Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {message && (
        <div style={styles.successToast}>
          <span>✅ {message}</span>
          <button onClick={() => setMessage("")} style={styles.toastClose}>
            ×
          </button>
        </div>
      )}

      {error && (
        <div style={styles.errorToast}>
          <span>❌ {error}</span>
          <button onClick={() => setError("")} style={styles.toastClose}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  MainBox: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#ffffff",
  },

  nav: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },

  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeSection: {
    flex: 1,
  },

  mainTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 8px 0",
    background: "linear-gradient(45deg, #fff, #f0f0f0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  welcomeText: {
    fontSize: "1.2rem",
    fontWeight: "400",
    margin: "0 0 8px 0",
    color: "#f0f0f0",
  },

  subtitle: {
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0",
  },

  navButtons: {
    display: "flex",
    gap: "12px",
  },

  navBtn: {
    background: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },

  navBtnSecondary: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.9)",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },

  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  heroSection: {
    textAlign: "center",
    marginBottom: "40px",
  },

  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#ffffff",
  },

  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },

  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "12px",
  },

  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#ffffff",
  },

  cardDescription: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: "1.5",
    margin: "0",
    flex: 1,
  },

  cardFooter: {
    marginTop: "16px",
  },

  cardAction: {
    fontSize: "0.9rem",
    color: "#ffffff",
    fontWeight: "500",
  },

  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    maxWidth: "600px",
    margin: "0 auto",
  },

  statCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
  },

  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },

  statLabel: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },

  modalContent: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    width: "500px",
    maxWidth: "90vw",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  modalHeader: {
    padding: "24px 24px 0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "0",
    color: "#333",
  },

  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    padding: "4px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },

  form: {
    padding: "24px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#333",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  btnSubmit: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  btnDisabled: {
    width: "100%",
    padding: "14px",
    background: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "not-allowed",
  },

  successToast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#4caf50",
    color: "white",
    padding: "12px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 2000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },

  errorToast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#f44336",
    color: "white",
    padding: "12px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 2000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },

  toastClose: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    padding: "0",
    marginLeft: "8px",
  },
};

export default Mainpage;
