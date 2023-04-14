import { Navigate, Outlet, useLocation } from "react-router-dom";
import { roles, auth } from "../constants/constants";

const RequireAdmin = () => {
  const userInfo = JSON.parse(localStorage.getItem(auth.currentUser));
  const location = useLocation();

  return userInfo.role === roles.admin ? (
    <Outlet />
  ) : (
    <Navigate to={Index} state={{ from: location }} replace />
  );
};

export default RequireAdmin;
