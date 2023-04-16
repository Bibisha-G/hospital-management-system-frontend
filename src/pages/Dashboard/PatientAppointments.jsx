import React, { useState, useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetPatientApointmentsQuery } from "../../features/appointment/appointmentApiSlice";
import { selectProfile } from "../../features/auth/authSlice";

function PatientAppointments(props) {
  const profile = useSelector(selectProfile);
  const { data: appointments, isLoading } = useGetPatientApointmentsQuery(
    profile?.id
  );

  if (isLoading) {
    return <Spinner />;
  }

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
          {appointments &&
            appointments.length > 0 &&
            appointments.map((appointment) => (
              <tr key={appointment?.id}>
                <td>{appointment?.doctor.name}</td>
                <td>{appointment?.date}</td>
                <td>{appointment?.time_slot.name}</td>
                <td>{appointment?.appointment_charge}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PatientAppointments;
