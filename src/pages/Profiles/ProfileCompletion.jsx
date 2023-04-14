import React from "react";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/auth/authSlice";
import PatientProfileCompletion from "./PatientProfileCompletion";
import DoctorProfileContainer from "./DoctorProfileContainer";

const ProfileCompletion = () => {
  const userType = useSelector(selectUserType);

  console.log(userType);
  return userType === "Patient" ? (
    <PatientProfileCompletion />
  ) : (
    <DoctorProfileContainer />
  );
};

export default ProfileCompletion;
