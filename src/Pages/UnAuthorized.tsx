import { Link } from "react-router";

function UnAuthorized() {
  return (
    <div className="p-4 items-center text-center">
      <h1>You Are Not Authorized to Access This Route!</h1>
      <p>Please contact your administrator if you believe this is an error.</p>
      <p>You can also try logging in with a different account.</p>
      <p>If you think you should have access, please reach out to support.</p>
      <p>Support Email: support@example.com</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}

export default UnAuthorized;
