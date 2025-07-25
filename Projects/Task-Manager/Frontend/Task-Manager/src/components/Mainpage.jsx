import { useEffect, useState } from "react";
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
  const [showallprojectList, setShowAllProjectList] = useState(false);
  const [allprojectList, setallProjectList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [selectProject, setSelectProject] = useState(null);
  const [showRequesModal, setShowRequestModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [MemberList, setMemberList] = useState([]);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showallprojectList) {
        setShowAllProjectList(false);
      }
    };

    const handleUpDown = (event) => {
      if (event.key === "Up" && "Down" && showallprojectList) {
        setShowAllProjectList();
      }
    };
    if (showallprojectList) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showallprojectList]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showList) {
        setShowList(false);
      }
    };

    if (showList) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showList]);

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

  const handleBackToLogin = () => {
    navigate("/Login");
    window.location.reload();
  };

  const handleToProjectPage = async () => {
    navigate("/Project");
  };

  const handleToProfile = () => {
    navigate("/Profile");
    window.location.reload();
  };

  const handleBackToHomePage = async () => {
    navigate("/");
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
          setMessage(false);
          setError(false);
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
    setShowForm(false); // close other modals
    setShowAllProjectList(false); // close other modals
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
        console.error("Error in fetching my projects: ", error);
        const msg = error.response?.data?.message || "Could not load projects";
        console.log(msg);
        setError(msg);
      }
    }
  };

  const handleAllProjects = async (e) => {
    e.preventDefault();
    setShowForm(false); // close other modals
    setShowList(false); // close other modals
    setShowAllProjectList(!showallprojectList);
    setError("");
    setLoading(false);

    if (!showallprojectList) {
      try {
        const res = await apiClient.allProjects();
        console.log("Response data on show all list: ", res);

        // Check if the data exists...
        if (res && res.data && res.data.length > 0) {
          setallProjectList(res.data);
        } else {
          setallProjectList([]);
        }
      } catch (error) {
        console.error("Error in fetching all projects: ", error);
        const msg = error.response?.data?.message || "Could not load projects";
        console.log(msg);
        setError(msg);
      }
    }
  };

  const handleToRequest = async (Name) => {
    // e.preventDefaulkt();
    setLoading(false);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.requestToJoinProject(Name);
      console.log("respose send by the requestToJoinProject:", res);
      setMessage(res.message || "Request sent successfully!");
      // alert(res.message || "Request sent successfully!");

      setTimeout(() => {
        setMessage(false);
        setError(false);
      }, 3000);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send request";
      // alert(msg);
      setError(msg);
    }
  };

  const handleDeleteProject = async (Name) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.deleteProject(Name);
      console.log("Delete Response is:", res);
      setMessage(res.message || "Project Deleted !");

      //Remove the project from the present state...
      setProjectList((prevList) => prevList.filter((p) => p.Name !== Name));

      setTimeout(() => {
        setError(false);
        setMessage(false);
      }, 3000);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete project";
      setError(msg);
    }
  };

  const handleGetRequestList = async (Name) => {
    setError("");
    setMessage("");
    setLoading(true);
    setSelectProject(Name);

    try {
      const res = await apiClient.getRequestList(Name);
      console.log("Request List :", res);

      setRequestList(res.data || []);
      setShowRequestModal(res); //Opens the modal
      setLoading(false);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to get request List.";
      setError(msg);
      setLoading(false);
    }
  };

  const handleAddMemeber = async (Name, username) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.addMemeber(Name, username);
      console.log("Add Member :", res);
      setMessage(`${username} added to ${Name}` || res.message);

      setTimeout(() => {
        setError(false);
        setMessage(false);
      }, 3000);
    } catch (error) {
      const msg = error.response?.data?.message || `Failed to add ${username}`;
      setError(msg);
    }
  };

  const handleProjectMemebersList = async (Name) => {
    setLoading(true);
    setError("");
    setMessage("");
    setSelectProject(Name);

    try {
      const res = await apiClient.getProjectMembers(Name);
      console.log("Get project Members :", res);

      const members = res.data?.members || [];
      setMemberList(members);
      setShowMembersModal(true);
    } catch (error) {
      const msg =
        error.response?.data?.message || `Failed to get Project members`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const hendleDeleteMembers = async (Name, username) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.deleteMember(Name, username);
      console.log("Delete Member response : ", res);

      // If backend still returns 200 statusCode even with an error
      if (res?.statusCode !== 200) {
        throw new Error(res.message);
      }

      setMessage(`${username} removed from ${Name}`);

      //REfresh the member List after deleting that member
      const refreshedList = await apiClient.getProjectMembers(Name);
      const members = refreshedList.data?.message || [];

      setMemberList(members);

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete member";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberRole = async (Name, username, role) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiClient.MemeberRole(Name, username, role);
      console.log("Member role :", res);

      setMemberList((prev) =>
        prev.map((member) =>
          member.username === username ? { ...member, role } : member,
        ),
      );

      setTimeout(() => {
        setMessage(`Role of ${username} updated to ${role}`);
      }, 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to change the member role";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectStatus = async (Name, status) => {
    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const res = await apiClient.UpdateProjectStatus(Name, status);
      console.log("Update Role: ", res);

      setMessage(`Your Project ${Name} status is updated to ${status}`);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to update the project status";
      setTimeout(() => {
        setError(msg);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiClient
      .profile()
      .then((res) => setProfile(res.user)) // if needed use data instead of user to retrive the data from the database

      .catch((err) => setError(err.message || "unauthorized"));
  }, []);

  return (
    <div style={styles.MainBox}>
      <div>
        <nav style={styles.nav}>
          <div style={styles.navContent}>
            {/* LEFT: Back Button */}
            <div style={styles.leftNavSection}>
              <button
                style={styles.navBtnSecondary}
                onClick={handleBackToHomePage}
              >
                Back
              </button>
            </div>

            {/* CENTER: Welcome text */}
            <div style={styles.centerNavSection}>
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

            {/* RIGHT: Profile + Logout */}
            <div style={styles.rightNavSection}>
              <button onClick={handleToProfile} style={styles.navBtn}>
                👤 Profile
              </button>
              <button
                onClick={handleBackToLogin}
                style={styles.navBtnSecondary}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      <br />
      {/* Hero section... */}

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
              {showForm ? "Cancel Creation" : "Create New Project"}
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
      </main>

      {showForm && (
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

      {showList && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2
              style={{
                margin: 0,
                flex: 1,
                textAlign: "center",
                marginBottom: "25px",
                marginTop: "5px",
              }}
            >
              My Projects
              <button
                onClick={() => setShowList(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </h2>
            <div>
              {projectList.length > 0 ? (
                projectList.map((project, index) => (
                  <div key={project._id || index} style={styles.projectCard}>
                    <button
                      onClick={() => handleDeleteProject(project.Name)}
                      style={styles.deleteBtn}
                    >
                      Delete Project
                    </button>
                    <h4 style={{ marginTop: "0px", marginBottom: "10px" }}>
                      {project.Name}
                    </h4>
                    <p>{project.description}</p>
                    <p>
                      <strong>Admin:</strong> {project.admin}
                    </p>
                    <button onClick={() => handleGetRequestList(project.Name)}>
                      Request List
                    </button>
                    <button
                      onClick={() => handleProjectMemebersList(project.Name)}
                      style={{ marginLeft: "10px" }}
                    >
                      View Members
                    </button>

                    {/* Change Project Status */}
                    <select
                      defaultValue={selectProject?.status || "Pending"}
                      onChange={(e) =>
                        handleProjectStatus(project.Name, e.target.value)
                      }
                      style={{
                        marginRight: "10px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                      name=""
                      id=""
                    >
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showMembersModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>
              Members in project {""}
              <span style={{ color: "lightgreen" }}>{selectProject} </span>
              <button
                onClick={() => setShowMembersModal(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </h3>

            {MemberList.length === 0 ? (
              <p>No Members found.</p>
            ) : (
              <ol>
                {MemberList.map((member, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    <span style={{ marginRight: "10px" }}>
                      {member.username} - {member.role}
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        // Role Section
                      </span>
                    </span>

                    {/* Custom Role Input */}
                    <input
                      type="text"
                      defaultValue={member.role}
                      placeholder="Enter New Role"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleMemberRole(
                            selectProject,
                            member.username,
                            e.target.value,
                          );
                          e.target.blur();
                        }
                      }}
                      style={{
                        marginLeft: "10px",
                        padding: "4px",
                        borderRadius: "4px",
                        border: "1px solid gray",
                      }}
                    />

                    <button
                      onClick={() =>
                        hendleDeleteMembers(selectProject, member.username)
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      title="Remove Member"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      {showRequesModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>
              Join Request For:{" "}
              <span style={{ color: "orange" }}>{selectProject}</span>
              <button
                onClick={() => setShowRequestModal(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </h3>

            {requestList.length === 0 ? (
              <p>No Join requests.</p>
            ) : (
              <ol>
                {requestList.map((user, idx) => (
                  <li key={idx}>
                    {user.username}
                    <button
                      style={styles.acceptBtn}
                      onClick={() =>
                        handleAddMemeber(selectProject, user.username)
                      }
                    >
                      ✓
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      {showallprojectList && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContentTall}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, flex: 1, textAlign: "center" }}>
                All Projects
              </h2>
              <button
                onClick={() => setShowAllProjectList(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              {allprojectList.length > 0 ? (
                allprojectList.map((project, index) => (
                  <div key={project._id || index} style={styles.projectCard}>
                    <h4>{project.Name}</h4>
                    <p>{project.description}</p>
                    <p>
                      <strong>Admin:</strong> {project.admin}
                    </p>
                    <button
                      style={styles.requestBtn}
                      onClick={() => handleToRequest(project.Name)}
                    >
                      Request to Join Team
                    </button>
                  </div>
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          </div>
        </div>
      )}

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

  leftNavSection: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
  },

  centerNavSection: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  rightNavSection: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    gap: "12px",
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

  // Buttons to cards
  joinproject: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },

  cardButton: {
    background: "linear-gradient(135deg, #2f3542, #1e272e)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "100px 24px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    fontSize: "16px",
    fontWeight: "600",
    minWidth: "180px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
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

  // Already added from the beginging...
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
    position: "relative",
    background: "linear-gradient(135deg, #2a2a2a, #1e1e1e)",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    color: "#fff",
    maxWidth: "500px",
    margin: "0 auto 25px",
  },

  requestBtn: {
    padding: "10px 16px",
    backgroundColor: "#00b894", // teal
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
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
  // added...
  joinproject: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    alignItems: "center",
  },

  heroCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  },

  heroCardHover: {
    transform: "translateY(-5px)",
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  // Individual card colors for better distinction
  heroCardPrimary: {
    background:
      "linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(56, 142, 60, 0.2))",
    border: "1px solid rgba(76, 175, 80, 0.3)",
  },

  heroCardSecondary: {
    background:
      "linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(25, 118, 210, 0.2))",
    border: "1px solid rgba(33, 150, 243, 0.3)",
  },

  heroCardAccent: {
    background:
      "linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(245, 124, 0, 0.2))",
    border: "1px solid rgba(255, 152, 0, 0.3)",
  },

  heroCardSpecial: {
    background:
      "linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(123, 31, 162, 0.2))",
    border: "1px solid rgba(156, 39, 176, 0.3)",
  },
};

export default Mainpage;
