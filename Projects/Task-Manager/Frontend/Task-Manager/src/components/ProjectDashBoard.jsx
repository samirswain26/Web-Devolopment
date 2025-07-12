import { body } from "express-validator";
import { useLocation } from "react-router-dom";

function DashBoard() {
  const location = useLocation();
  const project = location.state?.project; // Access passed project data

  console.log("Dashboard project data:", project);

  if (!project) {
    return <p>No project data provided.</p>;
  }

  return (
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
  );
}

export default DashBoard;

const styles = {
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
};
