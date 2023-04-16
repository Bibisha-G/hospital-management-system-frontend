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
    <Container className="p-5 mt-5">
      <h4 className="text-center">Your Appointments</h4>
      <Table striped bordered hover className="mt-5 p-5">
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
