import { useEffect } from "react";
import { useNavigate } from "react-router";
function VerifyEmail() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/Login");
    }, 3000);
  }, []);
  return (
    <div>
      <h2>Email verified Successfully!</h2>
    </div>
  );
}

export default VerifyEmail;
