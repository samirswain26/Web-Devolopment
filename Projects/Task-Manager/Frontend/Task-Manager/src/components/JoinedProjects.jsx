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
      console.log("Project I am In is: ", res);
      setProject(res?.data?.projects || []);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete member";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlebackTomainpage = async () => {
    navigate("/Mainpage");
  };

  useEffect(() => {
    GetProjectsIamin();
  }, []);

  return (
    <>
      <h2>Project that i had joied...</h2>
      {project.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ol>
          {project.map((proj) => (
            <li key={proj._id}>
              <h3>{proj.Name}</h3>
              <p>
                <strong>Description:</strong> {proj.description}
              </p>
              <p>
                <strong>Status:</strong> {proj.status}
              </p>
              <p>
                <strong>Admin:</strong> {proj.admin}
              </p>
              <p>
                <strong>Total Members:</strong> {proj.totalMembers}
              </p>
              <p>
                <strong>Your Role:</strong> {proj.userRole}
              </p>
              <hr />
            </li>
          ))}
        </ol>
      )}
      <button onClick={handlebackTomainpage}>Back</button>
    </>
  );
}

export default Project;
