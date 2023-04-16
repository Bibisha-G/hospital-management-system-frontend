import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorToast, InfoToast } from "../../components/Toasts/Toasts";
import { useGetDoctorApointmentsQuery } from "../../features/appointment/appointmentApiSlice";
import { selectProfile } from "../../features/auth/authSlice";

const PatientDashboard = () => {
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();
  const { data: appointments } = useGetDoctorApointmentsQuery(profile?.id);
  return (
    <Container>
      <Row className="p-5">
        <Col className="d-flex justify-content-end gap-2">
          <Button
            onClick={() => navigate("update")}
            className="mt-5 rounded-4 text-black-50 shadow"
            style={{
              backgroundColor: "#1e81b0",
              border: "solid 1px #1e81b0",
            }}
          >
            <span className="text-light">Update profile</span>
          </Button>
        </Col>
      </Row>
      <Row className="gap-5 d-flex justify-content-center">
        <Col md={4} className="border rounded-4 p-5">
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
        <Col
          md={7}
          style={{ maxHeight: 800, overflow: "auto" }}
          className=" border rounded-4 p-5"
        >
          <h4 className="text-center">Your Appointments</h4>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card key={appointment.id} className="my-3">
                <Card.Body className="px-5">
                  <Card.Title className="d-flex justify-content-between">
                    Doctor Name:{" "}
                    <strong className="">{appointment?.doctor_name}</strong>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                    When: <span>{appointment?.date}</span>
                  </Card.Subtitle>
                  <Card.Text className="d-flex justify-content-between">
                    Time:
                    <span>
                      {appointment?.time_slot?.start_time} -{" "}
                      {appointment?.time_slot?.end_time}
                    </span>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between">
                    Charge:{" "}
                    <span className="text-success">
                      {appointment?.appointment_charge}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No appointments found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;
