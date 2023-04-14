import RegisterContainerPatient from "./RegisterContainerPatient";
import { Col, Container, Row } from "react-bootstrap";
import doctorRegister from "../../../assets/Auth/online-doctor-animate.svg";

function RegisterPagePatient() {
  return (
    <Container
      fluid
      className="main-wrapper p-0"
      style={{ overflowX: "hidden" }}
    >
      <Row className="h-100">
        <Col lg={5}>
          <RegisterContainerPatient />
        </Col>
        <Col
          lg={7}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={doctorRegister}
            className="img-fluid"
            alt="image"
            style={{
              maxHeight: 600,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPagePatient;
