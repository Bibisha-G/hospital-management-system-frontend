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
import { useGetPatientApointmentsQuery } from "../../features/appointment/appointmentApiSlice";
import { selectProfile } from "../../features/auth/authSlice";

const PatientDashboard = () => {
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();
  const { data: appointments } = useGetPatientApointmentsQuery(profile?.id);
  return (
    <Container>
      <Row className="pb-5">
        <Col className="d-flex justify-content-end gap-2">
          <Button
            onClick={() => navigate(`doctors/${profile?.id}`)}
            className="mt-5 rounded-4 text-black-50 shadow btn-success"
          >
            <span className="text-light">View Public Profile</span>
          </Button>
          <Button
            onClick={() => navigate("/dashboard/setup_availability")}
            className="mt-5 rounded-4 text-black-50 shadow"
            style={{
              backgroundColor: "#1e81b0",
              border: "solid 1px #1e81b0",
            }}
          >
            <span className="text-light">Edit Availability</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profile?.avatar_slug} />
            <Card.Body>
              <Card.Title>{profile?.user?.name}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Age: {profile?.age}</ListGroupItem>
                <ListGroupItem>Experience: {profile?.experience}</ListGroupItem>
                <ListGroupItem>
                  Specialiation: {profile?.specialization}
                </ListGroupItem>
                <ListGroupItem>
                  Qualifications: {profile?.qualifications}
                </ListGroupItem>
                <ListGroupItem>
                  Treatments offered: {profile?.treatments}
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h4 className="text-center">Your Appointments</h4>
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
            <p className="text-center">No appointments found.</p>
          )}
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="text-center">
          <hr />
          <h4>Your Reviews</h4>
          <div className="review-list">
            {profile?.reviews && profile.reviews.length > 0 ? (
              profile.reviews.map((review) => (
                <div className="review" key={review.id}>
                  <p>{review.text}</p>
                  <div className="review-info">
                    <div>
                      <span>{review.user?.name}</span>
                      <span>Rated: {review.rating}/5</span>
                    </div>
                    <span>
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className=""> No reviews yet!</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;
