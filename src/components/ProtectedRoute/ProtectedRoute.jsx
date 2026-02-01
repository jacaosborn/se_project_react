import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  // If user is not logged in, redirect them to main page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in, let them see the protected content
  return children;
}

export default ProtectedRoute;
