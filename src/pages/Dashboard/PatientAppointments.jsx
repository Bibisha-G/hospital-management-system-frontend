import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

function PatientAppointments(props) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // make API call to retrieve appointments for current patient
    // and update the state with the results
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments/");
      const data = await response.json();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <Container>
      <h2>Your Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Appointment Charge</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctor.name}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time_slot.name}</td>
              <td>{appointment.appointment_charge}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PatientAppointments;
