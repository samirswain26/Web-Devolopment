import { Link } from "react-router";

function Mainpage() {
  return (
    <div>
      <h1>
        After login/signup this page was the main landing page of the website
      </h1>
      <p>
        <Link to={"/Profile"}> Profile Page</Link>
      </p>
      <p>
        <Link to={"/Login"}> Back to Login Page </Link>
      </p>
    </div>
  );
}

export default Mainpage;
