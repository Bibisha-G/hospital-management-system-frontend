import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { InfoToast } from "../components/Toasts/Toasts";
import { auth } from "../constants/constants";

const AuthNav = () => {
  const token = localStorage.getItem(auth.accessToken);
  const location = useLocation();
  if (token) InfoToast("You are already logged in.");
  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default AuthNav;
