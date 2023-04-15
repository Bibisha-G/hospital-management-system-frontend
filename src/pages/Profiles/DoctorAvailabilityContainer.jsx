import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DoctorAvailability from "./DoctorAvailibility";

const DoctorAvailabilityContainer = () => {
  return (
    <Container className="d-flex justify-content-center p-5">
      <Row>
        <Col>
          <DoctorAvailability />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorAvailabilityContainer;
