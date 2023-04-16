import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ToTop from "../components/ToTop/ToTop";
import UserNavBar from "../components/UserNavBar/UserNavBar";
import { selectUser } from "../features/auth/authSlice";
const DoctorUser = () => {
  const user = useSelector(selectUser);

  return (
    <>
      {user?.is_doctor ? (
        <>
          <UserNavBar />
          <Outlet />
          <ToTop />
        </>
      ) : (
        <div className="text-center">
          <h4 className="text-dark">
            Only Patients are allowed to view this page
          </h4>
        </div>
      )}
    </>
  );
};

export default DoctorUser;
