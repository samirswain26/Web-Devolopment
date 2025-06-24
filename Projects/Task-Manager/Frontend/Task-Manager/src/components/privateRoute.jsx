import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/profile", {
          credentials: "include",
        });

        console.log("Profile response status:", response.status);

        if (response.status === 200) {
          setAuth(true);
        } else if (response.status === 401 && retryCount < 2) {
          // Retry after a short delay (cookies might still be setting)
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 300);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (retryCount < 2) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 300);
        } else {
          setAuth(false);
        }
      }
    };

    checkAuth();
  }, [retryCount]);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/Login" replace />;
}
