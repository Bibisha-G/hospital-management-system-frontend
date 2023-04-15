import React from "react";
import { useSelector } from "react-redux";
import { selectProfile, selectUserType } from "../../features/auth/authSlice";
import PatientProfileUpdation from "./PatientProfileUpdation";
import DoctorProfileUpdationContainer from "./DoctorProfileUpdationContainer";
const ProfileUpdation = () => {
  const userType = useSelector(selectUserType);
  return (userType === "Patient") ? (
      <PatientProfileUpdation />
    ) : (
      <DoctorProfileUpdationContainer />
    )
};

export default ProfileUpdation;
