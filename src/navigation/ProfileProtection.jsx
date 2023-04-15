import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectProfile } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
const ProfileProtection = () => {
  const profile = useSelector(selectProfile)
  return profile && profile.is_complete ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default ProfileProtection;
