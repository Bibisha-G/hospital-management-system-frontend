import React from "react";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/auth/authSlice";
import DoctorProfileCompletion from "./DoctorProfileCompletion";
import PatientProfileCompletion from "./PatientProfileCompletion";

const ProfileCompletion = () => {
  const userType = useSelector(selectUserType);

  console.log(userType);
  return userType === "Patient" ? (
    <PatientProfileCompletion />
  ) : (
    <DoctorProfileCompletion />
  );
};

export default ProfileCompletion;
