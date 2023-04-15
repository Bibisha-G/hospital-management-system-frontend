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
          <img src={member4} alt="Doctor" />
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
        <SelectSlot availability={mock} doctor={doctor} />
      </div>
      {/* <Link
        className="appointment"
        to={"/dashboard/booking"}
        state={{ doctor_id: doctor?.user.id, dept_id: dept?.id }}
      >
        Book Appointment
      </Link> */}
      <div className="reviews mt-5 shadow rounded-4 border p-5">
        <h4 className="text-center text-dark">Reviews</h4>
        <div className="review-list">
          {doctor?.reviews?.map((review) => (
            <div className="review" key={review.id}>
              <p>{review.comment}</p>
              <div className="review-info">
                <span>{review.user.name}</span>
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {doctor?.reviews?.length === 0 && (
            <p className="text-center">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;

var mock = [
  {
    id: 1,
    doctor: 1,
    day: 0,
    time_slots: [
      {
        id: 7,
        start_time: "07:50:00",
        end_time: "11:48:00",
        online_appointment_charge: 100,
        physical_appointment_charge: 100,
      },
      {
        id: 8,
        start_time: "08:48:00",
        end_time: "07:52:00",
        online_appointment_charge: 56,
        physical_appointment_charge: 74,
      },
      {
        id: 9,
        start_time: "10:48:00",
        end_time: "00:58:00",
        online_appointment_charge: 120,
        physical_appointment_charge: 160,
      },
    ],
  },
  {
    id: 2,
    doctor: 1,
    day: 3,
    time_slots: [
      {
        id: 10,
        start_time: "10:48:00",
        end_time: "11:48:00",
        online_appointment_charge: 0,
        physical_appointment_charge: 0,
      },
    ],
  },
  {
    id: 3,
    doctor: 1,
    day: 5,
    time_slots: [
      {
        id: 11,
        start_time: "08:48:00",
        end_time: "07:49:00",
        online_appointment_charge: 0,
        physical_appointment_charge: 0,
      },
      {
        id: 12,
        start_time: "07:50:00",
        end_time: "07:52:00",
        online_appointment_charge: 0,
        physical_appointment_charge: 0,
      },
    ],
  },
];
