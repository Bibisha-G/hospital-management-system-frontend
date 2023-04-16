import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
const PatientUser = () => {
  const user = useSelector(selectUser);

  return <>{user?.is_patient ? <PatientDashboard /> : <DoctorDashboard />}</>;
};

export default PatientUser;
