import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { ErrorToast, InfoToast } from "../../components/Toasts/Toasts";
import { useGetPatientApointmentsQuery } from "../../features/appointment/appointmentApiSlice";
import { selectProfile } from "../../features/auth/authSlice";

const PatientDashboard = () => {
  const profile = useSelector(selectProfile);
  const { data: appointments } = useGetPatientApointmentsQuery(profile?.id);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profile?.avatar_slug} />
            <Card.Body>
              <Card.Title>{profile?.user?.name}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Age: {profile?.age}</ListGroupItem>
                <ListGroupItem>Height: {profile?.height}</ListGroupItem>
                <ListGroupItem>Weight: {profile?.weight}</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Your Appointments</h2>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card key={appointment.id} className="my-3">
                <Card.Body>
                  <Card.Title>{appointment?.doctor_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {appointment?.date}
                  </Card.Subtitle>
                  <Card.Text>
                    {appointment?.time_slot?.start_time} -{" "}
                    {appointment?.time_slot?.end_time}
                  </Card.Text>
                  <Card.Text>
                    Charge: {appointment?.appointment_charge}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;
