import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Task() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const project = location.state?.project;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      try {
        // Debug: Log all available cookies
        console.log("All cookies:", document.cookie);
        console.log("Available cookies:");
        const allCookies = Cookies.get();
        console.log(allCookies);

        // Try different possible cookie names
        const userCookie = Cookies.get("user");
        const usernameCookie = Cookies.get("username-localhost");
        const accessToken = Cookies.get("accessToken");

        console.log("User cookie:", userCookie);
        console.log("Username cookie:", usernameCookie);
        console.log("Access token:", accessToken);

        let user = null;

        // Try to get user data from different sources
        if (userCookie) {
          try {
            user = JSON.parse(userCookie);
            console.log("User from 'user' cookie:", user);
          } catch (e) {
            console.error("Error parsing user cookie:", e);
          }
        }

        // If no user cookie, try to construct user from other cookies
        if (!user && usernameCookie) {
          try {
            user = JSON.parse(usernameCookie);
            console.log("User from username cookie:", user);
          } catch (e) {
            console.error("Error parsing username cookie:", e);
            // If it's not JSON, treat as plain username
            user = { username: usernameCookie };
          }
        }

        // If still no user and we have access token, user might be logged in
        if (!user && accessToken) {
          alert(
            "User data not found in cookies, but access token exists. Please refresh the page or login again.",
          );
          navigate("/login");
          return;
        }

        if (!user) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        console.log("Final user object:", user);

        // Check if required data is present
        if (!task || !project) {
          alert("Invalid task data. Redirecting back.");
          navigate(-1);
          return;
        }

        console.log("Task data:", task);
        console.log("Project data:", project);

        // Check access permissions
        const isAssignedUser =
          (typeof task.assignedTo === "object" &&
            (task.assignedTo._id === user._id ||
              task.assignedTo.username === user.username)) ||
          task.assignedTo === user._id ||
          task.assignedTo === user.username;

        const isAdmin =
          project.admin === user._id || project.admin === user.username;

        console.log("Access check:", {
          taskAssignedTo: task.assignedTo,
          userId: user._id,
          username: user.username,
          projectAdmin: project.admin,
          isAssignedUser,
          isAdmin,
        });

        if (isAssignedUser || isAdmin) {
          setIsAuthorized(true);
        } else {
          alert("Access denied. You don't have permission to view this task.");
          navigate(-1);
          return;
        }
      } catch (error) {
        console.error("Error checking access:", error);
        alert("Error checking permissions. Please try again.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
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
        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export default Task;

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    marginTop: "50px",
    color: "#111",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "black",
  },
};
