import { useEffect, useState } from "react";
import { useLazyGetDepartmentInfoQuery } from "../../features/department/departmentApiSlice";
import { useGetDoctorQuery } from "../../features/doctor/doctorApiSlice";
import { Link, useParams } from "react-router-dom";
import member4 from '../../assets/doctor4.jpg';

import './DoctorDetails.css'
function DoctorDetails() {
  const id = useParams()
  const [getDepartmentInfo, { isLoading: loadingDept }] = useLazyGetDepartmentInfoQuery()
  const { data: doctor, isLoading } = useGetDoctorQuery(id)

  const [dept, setDept] = useState()
  useEffect(() => {
    let deptInfo = async (id) => {
      let response = await getDepartmentInfo(id).unwrap();
      setDept(response)
    }
    console.log(doctor);
    !isLoading && deptInfo(doctor?.department)
  }, [isLoading])
  return (isLoading) ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) :
    (
      <div className="container">
        <div className="doctor">
          <div className="doctor-img">
            <img src={member4} />
          </div>
          <div className="doctor-info">
            <div className="doctor-info-comntent">
              <h4 className="title">{doctor?.user?.name}</h4>
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <h4 className="text-secondary">{dept?.name}</h4>
              )}
              <span className="text-secondary">{doctor?.specialization}</span>
            </div>
          </div>
        </div>
        <p>
          {doctor?.info ? doctor.info : "No Info Available"}
        </p>
        <div className="nav-link nav-link-buttons-margin">
          <Link to={"/login"}>
            <button type="button">
              Login{" "}
              <span>
                {" "}
                <IoIosArrowForward />{" "}
              </span>
            </button>
          </Link>
        </div>
      </div>
    );
}
export default DoctorDetails;