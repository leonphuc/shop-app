import { Navigate } from "react-router-dom";
import config from "../../router/config";

function PrivateRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  if (!isLoggedIn) {
    return <Navigate to={config.routes.login} />;
  }

  return children;
}

export default PrivateRoute;
