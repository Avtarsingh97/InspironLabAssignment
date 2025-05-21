import { Navigate, useLocation } from "react-router-dom";
import { removeToken } from "../helper";
import useUserStore from "../stores/user";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { user } = useUserStore();
  const location = useLocation();

  // If the user is not logged in
  if (!user) {
    removeToken();
    // Redirect to signin page and preserve current path for redirect after login
    return <Navigate to={`/signin?redirect=${location.pathname}`} />;
  }

  // If user is authenticated, allow access to the requested route
  return <div>{children}</div>;
};

export default ProtectedRoute;
