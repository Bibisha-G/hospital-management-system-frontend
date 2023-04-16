import React from "react";
import { useGetDoctorApointmentsQuery } from "../../features/appointment/appointmentApiSlice";
import { selectProfile } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import "./DoctorAppointments.css";
import { Col, Container, Row } from "react-bootstrap";
function DoctorAppointments() {
  const profile = useSelector(selectProfile);
  const { data, isLoading } = useGetDoctorApointmentsQuery(profile?.id, {
    refetchOnMountOrArgChange: true,
  });

  return isLoading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : data ? (
    <Container className="p-5 mt-5">
      <Row>
        <Col className="text-center">
          <h4 className="text-dark">Your Appointments</h4>
        </Col>
      </Row>
      <Row
        className="pt-5 mt-5 gap-5 d-flex justify-content-center p-5 rounded-4"
        lg={3}
        xl={3}
        xxl={4}
        md={2}
        sm={1}
        xs={1}
      >
        {data.map((appointment) => (
          <Col key={appointment.id} className="appointment-card p-5 ">
            <h3>{appointment.patient_name}</h3>
            <hr />
            <p>When: {appointment.date}</p>
            <span>Time: {appointment?.time_slot?.start_time}</span>
            <span> - {appointment?.time_slot?.end_time}</span>
            <p>
              Charges:{" "}
              <span className="text-success">
                {appointment?.appointment_charge}$
              </span>
            </p>
          </Col>
        ))}
        <hr />
      </Row>
    </Container>
  ) : (
    <></>
  );
}

export default DoctorAppointments;
