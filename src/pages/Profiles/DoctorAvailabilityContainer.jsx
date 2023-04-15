import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DoctorAvailability from "./DoctorAvailibility";

const DoctorAvailabilityContainer = () => {
  return (
    <Container className="d-flex justify-content-center p-5">
      <Row>
        <div className="text-center">
          <h1 className="text-dark ">
            <span>Availability</span> and{" "}
            <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-muted ">
            Divide your day's availability into timeslots and controlled pricing
            (Max: 5 slots per day)
          </p>
        </div>
        <Col>
          <DoctorAvailability />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorAvailabilityContainer;
