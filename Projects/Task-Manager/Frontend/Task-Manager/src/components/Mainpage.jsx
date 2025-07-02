import { useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../../service/apiclient";

function Mainpage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  // const [formData, setFormData] = useState({
  //   Name: "",
  //   description: "",
  // });
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/Login");
    window.location.reload();
  };

  const handleToProfile = () => {
    navigate("/Profile");
    window.location.reload();
  };

  const handleToggleForm = (e) => {
    setShowForm(!showForm);
    setMessage("");
    setError("");
    setLoading(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("In the handle for SubmitEvent..");
      const res = await apiClient.createProject(Name, description);
      // setMessage("Data Submitted successfully");
      if (res.status === 200 || res.status === 201) {
        setMessage(res.data.message || "Project Created Successfully");
        setError("");
        // Clear the field on success
        setName("");
        setDescription("");
      } else if (res.status === 400 || res.status === 401) {
        setError(res.data.message || "Project name Already Exists");
        setMessage("");
      } else {
        setError(res.data.message || "Project creation failed");
        setMessage("");
      }

      setName("");
      setDescription("");
      console.log(res);

      // setTimeout(() => {
      //   setShowForm(false);
      //   setMessage("");
      // }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Request failed";
      setError(errorMessage);
      setMessage("");
      setTimeout(() => setError("", 3000));
    } finally {
      setLoading(false);
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  //   setMessage("");

  //   try {
  //     console.log("In the handle for SubmitEvent..");
  //     const res = await apiClient.createProject(Name, description);

  //     console.log("Response:", res);

  //     // Success case (201)
  //     if (res.status === 201) {
  //       setMessage(res.data?.message || "Project Created Successfully");
  //       setError("");

  //       // Clear form fields only on success
  //       setName("");
  //       setDescription("");
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);

  //     // Handle different types of errors
  //     if (error.response) {
  //       // Server responded with error status (like 400)
  //       console.log("Error response:", error.response.data);
  //       const errorMessage = error.response.data?.message || "Request failed";
  //       setError(errorMessage);
  //       setMessage("");
  //     } else if (error.request) {
  //       // Network error
  //       setError("Network error. Please check your connection.");
  //       setMessage("");
  //     } else {
  //       // Other error
  //       setError("An unexpected error occurred");
  //       setMessage("");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <h1>This is the main page</h1>
      <p>
        Back to login Page{" "}
        <button
          onClick={handleBackToLogin}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </p>
      <p>
        Profile Page{" "}
        <button
          onClick={handleToProfile}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Profile
        </button>
      </p>

      <br />

      <button onClick={handleToggleForm}>
        {showForm ? "Create Project" : "Create Project"}
      </button>
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
              Create Project
              <button onClick={handleToggleForm} style={styles.closeBtn}>
                ×
              </button>
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="Name">Title: </label>
                <input
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description: </label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading || !Name || !description}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
            {message && typeof message === "string" && (
              <p style={{ color: "green" }}>{message}</p>
            )}
            {error && typeof error === "string" && (
              <p style={{ color: "red" }}>{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // dim background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // stays on top
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
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default Mainpage;

{
  /* <button onClick={handleToggleForm}>
        {showForm ? "Close Form" : "Create Project"}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
          <h2>Create Project</h2>
          <div>
            <label htmlFor="Name">Title: </label>
            <input
              type="Name"
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading || !Name || !description}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )} */
}

// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import apiClient from "../../service/apiclient";

// function Mainpage() {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [Name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const navigate = useNavigate();

//   const handleBackToLogin = () => {
//     navigate("/Login");
//     window.location.reload();
//   };

//   const handleToProfile = () => {
//     navigate("/Profile");
//     window.location.reload();
//   };

//   const handleToggleForm = (e) => {
//     setShowForm(!showForm);
//     setMessage("");
//     setError("");
//     setLoading(false);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       console.log("In the handle for SubmitEvent..");
//       const res = await apiClient.createProject(Name, description);

//       console.log("Response:", res);

//       // Success case (201)
//       if (res.status === 201) {
//         setMessage(res.message || "Project Created Successfully");
//         setError("");

//         // Clear form fields only on success
//         setName("");
//         setDescription("");
//       }
//     } catch (error) {
//       console.error("API Error:", error);

//       // Handle different types of errors
//       if (error.response) {
//         // Server responded with error status (like 400)
//         console.log("Error response:", error.response.data);
//         const errorMessage = error.response.data?.message || "Request failed";
//         setError(errorMessage);
//         setMessage("");
//       } else if (error.request) {
//         // Network error
//         setError("Network error. Please check your connection.");
//         setMessage("");
//       } else {
//         // Other error
//         setError("An unexpected error occurred");
//         setMessage("");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>This is the main page</h1>
//       <p>
//         Back to login Page{" "}
//         <button
//           onClick={handleBackToLogin}
//           style={{
//             color: "blue",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Login
//         </button>
//       </p>
//       <p>
//         Profile Page{" "}
//         <button
//           onClick={handleToProfile}
//           style={{
//             color: "blue",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Profile
//         </button>
//       </p>

//       <br />

//       <button onClick={handleToggleForm}>
//         {showForm ? "Close Form" : "Create Project"}
//       </button>

//       {showForm && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h2 style={{ display: "flex", justifyContent: "space-between" }}>
//               Create Project
//               <button onClick={handleToggleForm} style={styles.closeBtn}>
//                 ×
//               </button>
//             </h2>
//             <form onSubmit={handleFormSubmit}>
//               <div style={{ marginBottom: "15px" }}>
//                 <label htmlFor="Name">Title: </label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={Name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label htmlFor="description">Description: </label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                   style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading || !Name || !description}
//                 style={{
//                   padding: "10px 20px",
//                   backgroundColor: loading ? "#ccc" : "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: loading ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </form>

//             {/* Success Message */}
//             {message && (
//               <div
//                 style={{
//                   marginTop: "15px",
//                   padding: "10px",
//                   backgroundColor: "#d4edda",
//                   color: "#155724",
//                   border: "1px solid #c3e6cb",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {message}
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div
//                 style={{
//                   marginTop: "15px",
//                   padding: "10px",
//                   backgroundColor: "#f8d7da",
//                   color: "#721c24",
//                   border: "1px solid #f5c6cb",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {error}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modalContent: {
//     background: "#111",
//     color: "#fff",
//     padding: "30px",
//     borderRadius: "10px",
//     width: "400px",
//     boxShadow: "0 0 10px #000",
//     position: "relative",
//   },
//   closeBtn: {
//     background: "none",
//     border: "none",
//     color: "#fff",
//     fontSize: "24px",
//     cursor: "pointer",
//   },
// };

// export default Mainpage;
