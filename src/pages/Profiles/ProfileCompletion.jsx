import React from "react";
import { useSelector } from "react-redux";
import { selectProfile, selectUserType } from "../../features/auth/authSlice";
import PatientProfileCompletion from "./PatientProfileCompletion";
import DoctorProfileContainer from "./DoctorProfileContainer";

const ProfileCompletion = () => {
  const userType = useSelector(selectUserType);
  const profile = useSelector(selectProfile)
  console.log(profile);
  return profile && profile.is_complete ? (
    <Navigate to="/dashboard" replace />
  ) : (
    (userType === "Patient") ? (
      <PatientProfileCompletion />
    ) : (
      <DoctorProfileContainer />
    )
  )
};

export default ProfileCompletion;
