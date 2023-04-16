import { useEffect, useState } from "react";
import { useLazyGetDepartmentInfoQuery } from "../../features/department/departmentApiSlice";
import { useGetDoctorQuery } from "../../features/doctor/doctorApiSlice";
import { Link, useParams } from "react-router-dom";
import member4 from "../../assets/doctor4.jpg";
import "./DoctorDetails.css";
import SelectSlot from "../Profiles/SelectSlot";

function DoctorDetails() {
  const { id } = useParams();
  const [getDepartmentInfo, { isLoading: loadingDept }] =
    useLazyGetDepartmentInfoQuery();
  const { data: doctor, isLoading } = useGetDoctorQuery(id);
  const [dept, setDept] = useState();
  console.log(doctor);
  useEffect(() => {
    let deptInfo = async (id) => {
      let response = await getDepartmentInfo(id).unwrap();
      setDept(response);
    };
    !isLoading && deptInfo(doctor?.department);
  }, [isLoading]);

  return isLoading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="container">
      <div className="doctor rounded-4 p-5">
        <div className="doctor-img">
          <img
            src={doctor?.avatar_slug === "" ? member4 : doctor?.avatar_slug}
            alt="Doctor"
          />
        </div>
        <div className="doctor-info">
          <div className="doctor-info-comntent">
            <h4 className="title">{doctor?.user?.name}</h4>
            {loadingDept ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>
                <h4 className="text-secondary">{dept?.name}</h4>
                <span className="text-secondary">{doctor?.specialization}</span>
              </div>
            )}
            <div className="doctor-details">
              <p>Experience: {doctor?.experience} years</p>
              <p>Qualifications: {doctor?.qualifications}</p>
              <p>Treatments: {doctor?.treatments}</p>
              <p>Rating: {doctor?.rating}/5</p>
            </div>
          </div>
        </div>
        <p className="doctor-intro">
          {doctor?.info ? doctor.info : "No Info Available"}
        </p>
      </div>

      <div
        className="shadow p-5 rounded-4"
        style={{ border: "solid 1px #1e81b0" }}
      >
        <div>
          <h4 className="text-center text-dark">Make an Appointment</h4>
        </div>
        <SelectSlot doctor={doctor} />
      </div>
      <div className="reviews mt-5 shadow rounded-4 border p-5">
        <h4 className="text-center text-dark">Reviews</h4>
        ww
      </div>
    </div>
  );
}

export default DoctorDetails;
