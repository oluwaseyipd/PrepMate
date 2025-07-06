import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // If user is logged in, optionally redirect them after a few seconds:
    // Or, just change the default "Go Back Home" button dynamically
    // Uncomment below line to auto-redirect:
    // if (role === "user") navigate("/dashboard/overview");
    // else if (role === "admin") navigate("/admin/dashboard");
    // else if (role === "superadmin") navigate("/superadmin/dashboard");
  }, []);

  // Determine where to send them based on their role
  const role = localStorage.getItem("role");
  let homePath = "/";

  if (role === "user") homePath = "/dashboard/overview";
  else if (role === "admin") homePath = "/admin/dashboard";
  else if (role === "superadmin") homePath = "/superadmin/dashboard";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-blue-50">
      <h1 className="text-7xl font-bold text-blue-600 mb-6">404</h1>
      <h2 className="text-2xl text-gray-700 mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to={homePath}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
