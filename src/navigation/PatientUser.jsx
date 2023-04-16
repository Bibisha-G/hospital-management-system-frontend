import { Outlet } from "react-router-dom";
import ToTop from "../components/ToTop/ToTop";
import UserNavBar from "../components/UserNavBar/UserNavBar";
const PatientUser = () => {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <ToTop />
    </>
  );
};

export default PatientUser;
