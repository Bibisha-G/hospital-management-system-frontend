import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../constants/constants";
import { useGetUserMutation } from "../features/auth/authApiSlice";
import { selectUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { selectUser } from "../features/auth/authSlice";
const RequireAuth = () => {
  const token = localStorage.getItem(auth.accessToken);
  const dispatch = useDispatch();
  const id = useSelector(selectUserId);
  const user = useSelector(selectUser);
  const [getuser, { isLoading }] = useGetUserMutation();

  useEffect(() => {
    (async()=>{
      let data = await getuser(id).unwrap();
      dispatch(setUser(data));
    })();
  }, [])

  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
export default RequireAuth;
