import { Col, Container, Row } from "react-bootstrap";
import SignupPatient from "./SignupPatient";

const RegisterContainerPatient = () => {
  return (
    <Container fluid className="h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={8} className="pt-5 primary-col">
          <Row className="justify-content-center align-items-center">
            <Col className="text-center text-md-start">
              <h1 className="display-6">
                Join our community and take control of your health today.
              </h1>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum molestias facilis perferendis quae ipsum cupiditate quia
                illum et dolore? Rem, impedit quia officiis earum eum sapiente
                cupiditate vel reprehenderit delectus.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center py-lg-5 py-2">
            <Col>
              <SignupPatient />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterContainerPatient;
