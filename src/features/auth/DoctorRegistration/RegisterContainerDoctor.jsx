import { Col, Container, Row } from "react-bootstrap";
import SignupDoctor from "./SignupDoctor";

const RegisterContainerDoctor = () => {
  return (
    <Container fluid className="h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={8} className="pt-5 primary-col">
          <Row className="justify-content-center align-items-center">
            <Col className="text-center text-md-start">
              <h1 className="display-6">
                Take your practice digital and grow with us.
              </h1>
              <p className="text-muted">
                Join a community of healthcare innovators and improve patient
                outcomes.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center py-lg-5 py-2">
            <Col>
              <SignupDoctor />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterContainerDoctor;
