import { useSelector } from "react-redux";
import { selectProfile } from "../../features/auth/authSlice";
import DoctorProfileCompletion from "./DoctorProfileCompletion";

import { AiOutlineLock } from "react-icons/ai";
import { useGetDepartmentsQuery } from "../../features/department/departmentApiSlice";

const DoctorProfileContainer = () => {
  const profile = useSelector(selectProfile);
  const { data } = useGetDepartmentsQuery();
  return (
    <div>
      <div className="text-center mt-5 p-5 mx-5">
        {!profile?.is_approved && (
          <div>
            <h1 className="text-danger">
              <AiOutlineLock />
            </h1>
            <h6 className="fw-light text-dark">
              Your Profile is not yet Approved
            </h6>
            <span className="text-muted">
              Complete your profile to qualify for approval
            </span>
            <hr />
          </div>
        )}
      </div>
      <DoctorProfileCompletion departments={data} />
    </div>
  );
};

export default DoctorProfileContainer;
