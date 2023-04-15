import { useEffect, useState } from "react";
import { useLazyGetDepartmentInfoQuery } from "../../features/department/departmentApiSlice";
import { useGetDoctorQuery } from "../../features/doctor/doctorApiSlice";
import { Link, useParams } from "react-router-dom";
import member4 from '../../assets/doctor4.jpg';
import './DoctorDetails.css'

function DoctorDetails() {
  const { id } = useParams()
  const [getDepartmentInfo, { isLoading: loadingDept }] = useLazyGetDepartmentInfoQuery()
  const { data: doctor, isLoading } = useGetDoctorQuery(id)
  const [dept, setDept] = useState()

  useEffect(() => {
    let deptInfo = async (id) => {
      let response = await getDepartmentInfo(id).unwrap();
      setDept(response)
    }
    !isLoading && deptInfo(doctor?.department)
  }, [isLoading])

  return (isLoading) ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="container">
      <div className="doctor">
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
      </div>
      <p className="doctor-intro">
        {doctor?.info ? doctor.info : "No Info Available"}
      </p>
      <div className="reviews">
        <h2>Reviews</h2>
        <div className="review-list">
          {doctor?.reviews?.map(review => (
            <div className="review" key={review.id}>
              <p>{review.comment}</p>
              <div className="review-info">
                <span>{review.user.name}</span>
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {doctor?.reviews?.length === 0 && (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
      <Link className="appointment" to={"/dashboard/booking"} state={{ doctor_id: doctor?.user.id, dept_id: dept?.id }}>
        Book Appointment
      </Link>
    </div>
  );
}

export default DoctorDetails;