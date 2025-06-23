import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/profile", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          if (data?.user)
            setAuth(true); // only if user is returned
          else setAuth(false);
        } else {
          setAuth(false);
        }
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/Login" replace />;
}
